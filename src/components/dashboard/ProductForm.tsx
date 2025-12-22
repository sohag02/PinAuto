import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { api, Product } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  productUrl: z.string().optional(),
  etsyListingId: z.string().optional(),
  source: z.enum(["manual", "etsy"]),
  category: z.string().optional(),
  targetBuyers: z.string().optional(),
  painPoints: z.string().optional(),
  videoUrl: z.string().optional(),
  pinsPerDay: z.number(),
  imagesPerDay: z.number(),
  automationMode: z.enum(["automatic", "manual"]),
  status: z.enum(["active", "paused"]),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ImagePreview {
  file: File;
  preview: string;
}

export function ProductForm({ product, open, onClose, onSuccess }: ProductFormProps) {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isGeneratingPainPoints, setIsGeneratingPainPoints] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      title: product.title,
      description: product.description || "",
      productUrl: product.productUrl || "",
      etsyListingId: product.etsyListingId || "",
      source: product.source,
      category: product.category || "",
      targetBuyers: product.targetBuyers || "",
      painPoints: product.painPoints || "",
      videoUrl: product.videoUrl || "",
      pinsPerDay: product.pinsPerDay,
      imagesPerDay: product.imagesPerDay,
      automationMode: product.automationMode,
      status: product.status,
    } : {
      title: "",
      description: "",
      productUrl: "",
      etsyListingId: "",
      source: "manual",
      category: "",
      targetBuyers: "",
      painPoints: "",
      videoUrl: "",
      pinsPerDay: 1,
      imagesPerDay: 1,
      automationMode: "automatic",
      status: "active",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(product ? {
        title: product.title,
        description: product.description || "",
        productUrl: product.productUrl || "",
        etsyListingId: product.etsyListingId || "",
        source: product.source,
        category: product.category || "",
        targetBuyers: product.targetBuyers || "",
        painPoints: product.painPoints || "",
        videoUrl: product.videoUrl || "",
        pinsPerDay: product.pinsPerDay,
        imagesPerDay: product.imagesPerDay,
        automationMode: product.automationMode,
        status: product.status,
      } : {
        title: "",
        description: "",
        productUrl: "",
        etsyListingId: "",
        source: "manual",
        category: "",
        targetBuyers: "",
        painPoints: "",
        videoUrl: "",
        pinsPerDay: 1,
        imagesPerDay: 1,
        automationMode: "automatic",
        status: "active",
      });
      setImagePreviews([]);
    }
  }, [open, product, form]);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [imagePreviews]);

  const createMutation = useMutation({
    mutationFn: (data: FormData) => api.products.create(data),
    onSuccess: () => {
      toast({
        title: "Product created",
        description: "The product has been successfully created.",
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create product: " + error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => api.products.update(id, data),
    onSuccess: () => {
      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update product: " + error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("productUrl", data.productUrl || "");
    formData.append("etsyListingId", data.etsyListingId || "");
    formData.append("source", data.source);
    formData.append("category", data.category || "");
    formData.append("targetBuyers", data.targetBuyers || "");
    formData.append("painPoints", data.painPoints || "");
    formData.append("videoUrl", data.videoUrl || "");
    formData.append("automationMode", data.automationMode);
    formData.append("status", data.status);
    formData.append("pinsPerDay", data.pinsPerDay.toString());
    formData.append("imagesPerDay", data.imagesPerDay.toString());

    // Add images to FormData
    imagePreviews.forEach((imagePreview) => {
      formData.append("images", imagePreview.file);
    });

    if (product) {
      updateMutation.mutate({ id: product._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews: ImagePreview[] = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      setImagePreviews(prev => [...prev, ...newPreviews]);

      // Reset the input so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => {
      // Revoke the URL to free up memory
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleGeneratePainPoints = async () => {
    const title = form.getValues("title");
    const description = form.getValues("description");

    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter a product title to generate pain points.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingPainPoints(true);
    try {
      const result = await api.products.generatePainPoints({ title, description });
      form.setValue("painPoints", result.painPoints, { shouldDirty: true });
      toast({
        title: "Generated",
        description: "Pain points generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Could not generate pain points. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPainPoints(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="etsyListingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etsy Listing ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="etsy">Etsy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetBuyers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Buyers</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="painPoints"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Pain Points</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleGeneratePainPoints}
                      disabled={isGeneratingPainPoints}
                      className="h-6 text-xs text-blue-500 hover:text-blue-600"
                    >
                      {isGeneratingPainPoints ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1" />
                      ) : (
                        <Sparkles className="w-3 h-3 mr-1" />
                      )}
                      Generate with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea {...field} placeholder="Focus on customer problems this product solves..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pinsPerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pins per Day</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value || 1} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imagesPerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images per Day</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value || 1} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="automationMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Automation Mode</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Enhanced Image Upload Section */}
            <div className="space-y-3">
              <FormLabel>Product Images</FormLabel>

              {/* Upload Button */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {imagePreviews.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {imagePreviews.length > 0 && (
                <p className="text-sm text-gray-500">
                  {imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {product ? "Update" : "Create"} Product
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}