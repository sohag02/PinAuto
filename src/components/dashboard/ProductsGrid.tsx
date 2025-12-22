import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2, Pin, TrendingUp, Share2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Product } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProductUpdate } from "./ProductUpdate";
import { getImageUrl } from '@/lib/utils';
import { useNavigate } from "react-router-dom";

export function ProductsGrid() {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: api.products.getAll,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // State for update dialog
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

  // Check Pinterest connection status
  const [pinterestConnected, setPinterestConnected] = useState(false);
  const [isCheckingPinterest, setIsCheckingPinterest] = useState(true);

  const deleteMutation = useMutation({
    mutationFn: api.products.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete product: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setProductToUpdate(product);
    setUpdateDialogOpen(true);
  };

  // Check Pinterest status on mount
  useEffect(() => {
    const checkPinterestStatus = async () => {
      try {
        setIsCheckingPinterest(true);
        const status = await api.pinterest.getStatus();
        setPinterestConnected(status.authenticated);
      } catch (error) {
        console.error("Failed to check Pinterest status:", error);
        setPinterestConnected(false);
      } finally {
        setIsCheckingPinterest(false);
      }
    };
    checkPinterestStatus();
  }, []);

  // Create pin mutation (NOW TRIGGERS AI GENERATION)
  const generatePinMutation = useMutation({
    mutationFn: (productId: string) => api.products.generatePin(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Invalidate pins query to update scheduled pins list
      queryClient.invalidateQueries({ queryKey: ['scheduled-pins'] });

      toast({
        title: data.success ? "Success" : "Warning",
        description: data.message,
        variant: data.success ? "default" : "destructive",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to generate pin",
        variant: "destructive",
      });
    },
  });

  const handleCreatePin = async (product: Product) => {
    if (!pinterestConnected) {
      toast({
        title: "Pinterest not connected",
        description: "Please connect your Pinterest account first.",
        variant: "destructive",
      });
      return;
    }

    generatePinMutation.mutate(product._id);
  };

  if (products) {
    console.log('Fetched products in frontend:', products);
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-destructive">Error loading products</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No products found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="glass-card overflow-hidden group animate-slide-in opacity-0"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={getImageUrl(product.defaultImage || product.images[0])}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge variant={product.status === "active" ? "success" : "secondary"}>
                  {product.status}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-foreground truncate mb-1">{product.title}</h4>
              <Badge variant="outline" className="text-xs mb-3">{product.category || 'No Category'}</Badge>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Pin className="w-3.5 h-3.5" />
                  <span>{product.pinsPerDay || 1} pins/day</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{product.imagesPerDay || 1} images/day</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handleCreatePin(product)}
                  disabled={!pinterestConnected || generatePinMutation.isPending || isCheckingPinterest}
                  title={pinterestConnected ? "Generate Pin with AI" : "Connect Pinterest first"}
                >
                  {generatePinMutation.isPending && productToUpdate?._id === product._id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handleEdit(product)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(product._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => productToDelete && deleteMutation.mutate(productToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update Dialog */}
      <ProductUpdate
        product={productToUpdate}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
    </>
  );
}