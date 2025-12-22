import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api, Product } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X } from "lucide-react";

interface ProductUpdateProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductUpdate({ product, open, onOpenChange }: ProductUpdateProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productUrl: "",
    category: "",
    targetBuyers: "",
    painPoints: "",
    pinsPerDay: 1,
    imagesPerDay: 1,
    videosPerDay: 0,
    automationMode: "automatic" as "automatic" | "manual",
    status: "active" as "active" | "paused",
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Populate form when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        productUrl: product.productUrl || "",
        category: product.category || "",
        targetBuyers: product.targetBuyers || "",
        painPoints: product.painPoints || "",
        pinsPerDay: product.pinsPerDay || 1,
        imagesPerDay: product.imagesPerDay || 1,
        videosPerDay: product.videosPerDay || 0,
        automationMode: product.automationMode || "automatic",
        status: product.status || "active",
      });
      setImagePreviews(product.images || []);
      setNewImages([]);
    }
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      api.products.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      onOpenChange(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);

    // Create previews for new images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    
    // If it's a newly added image (not from existing product)
    if (index >= (product?.images.length || 0)) {
      const newIndex = index - (product?.images.length || 0);
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    const data = new FormData();
    
    // Append text fields
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("productUrl", formData.productUrl);
    data.append("category", formData.category);
    data.append("targetBuyers", formData.targetBuyers);
    data.append("painPoints", formData.painPoints);
    data.append("pinsPerDay", formData.pinsPerDay.toString());
    data.append("imagesPerDay", formData.imagesPerDay.toString());
    data.append("videosPerDay", formData.videosPerDay.toString());
    data.append("automationMode", formData.automationMode);
    data.append("status", formData.status);

    // Append new images
    newImages.forEach((image) => {
      data.append("images", image);
      console.log("Appending new image:", image.name);
    });

    updateMutation.mutate({ id: product._id, data });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      productUrl: "",
      category: "",
      targetBuyers: "",
      painPoints: "",
      pinsPerDay: 1,
      imagesPerDay: 1,
      videosPerDay: 0,
      automationMode: "automatic",
      status: "active",
    });
    setNewImages([]);
    setImagePreviews([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Make changes to your product. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Product Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* Category and Product URL */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productUrl">Product URL</Label>
              <Input
                id="productUrl"
                type="url"
                value={formData.productUrl}
                onChange={(e) =>
                  setFormData({ ...formData, productUrl: e.target.value })
                }
              />
            </div>
          </div>

          {/* Target Buyers */}
          <div className="space-y-2">
            <Label htmlFor="targetBuyers">Target Buyers</Label>
            <Input
              id="targetBuyers"
              value={formData.targetBuyers}
              onChange={(e) =>
                setFormData({ ...formData, targetBuyers: e.target.value })
              }
              placeholder="e.g., Young professionals, Pet owners"
            />
          </div>

          {/* Pain Points */}
          <div className="space-y-2">
            <Label htmlFor="painPoints">Pain Points</Label>
            <Textarea
              id="painPoints"
              value={formData.painPoints}
              onChange={(e) =>
                setFormData({ ...formData, painPoints: e.target.value })
              }
              rows={2}
              placeholder="What problems does this product solve?"
            />
          </div>

          {/* Automation Settings */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pinsPerDay">Pins/Day</Label>
              <Input
                id="pinsPerDay"
                type="number"
                min="1"
                max="50"
                value={formData.pinsPerDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pinsPerDay: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagesPerDay">Images/Day</Label>
              <Input
                id="imagesPerDay"
                type="number"
                min="1"
                max="50"
                value={formData.imagesPerDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imagesPerDay: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videosPerDay">Videos/Day</Label>
              <Input
                id="videosPerDay"
                type="number"
                min="0"
                max="20"
                value={formData.videosPerDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    videosPerDay: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>

          {/* Mode and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="automationMode">Automation Mode</Label>
              <Select
                value={formData.automationMode}
                onValueChange={(value: "automatic" | "manual") =>
                  setFormData({ ...formData, automationMode: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "paused") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Product Images</Label>
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Label
              htmlFor="images"
              className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Images</span>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}