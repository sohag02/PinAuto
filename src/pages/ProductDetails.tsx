import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";

export function ProductDetails() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.products.getById(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="p-10">Loading product...</div>;
  if (error || !product) return <div className="p-10">Product not found</div>;

  const images: string[] = product.images || [];

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1));

  const nextImage = () =>
    setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* ================= PAGE ================= */}
      <div className="min-h-screen bg-muted/30 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ================= LEFT: IMAGE SLIDER ================= */}
          <Card className="rounded-2xl overflow-hidden">
            <CardContent className="p-4 space-y-4">

              {/* Main Image */}
              <div className="relative cursor-zoom-in">
                <img
                  src={getImageUrl(images[activeImage])}
                  className="w-full h-[380px] object-cover rounded-xl"
                  onClick={() => setPreviewOpen(true)}
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                    >
                      <ChevronLeft />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center flex-wrap">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={getImageUrl(img)}
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition ${
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ================= RIGHT: PRODUCT INFO ================= */}
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-6">

              <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <Badge className="mt-2">{product.status}</Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description || "No description provided"}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Pins / Day</span>
                  <p className="font-medium">{product.pinsPerDay}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Images / Day</span>
                  <p className="font-medium">{product.imagesPerDay}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Automation</span>
                  <p className="font-medium capitalize">
                    {product.automationMode}
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground">Source</span>
                  <p className="font-medium capitalize">{product.source}</p>
                </div>
              </div>

              {product.productUrl && (
                <a
                  href={product.productUrl}
                  target="_blank"
                  className="inline-block text-primary underline text-sm"
                >
                  View Product Link
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ================= FULLSCREEN IMAGE PREVIEW ================= */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setPreviewOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setPreviewOpen(false)}
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 text-white"
              >
                <ChevronLeft size={36} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 text-white"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          <img
            src={getImageUrl(images[activeImage])}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
