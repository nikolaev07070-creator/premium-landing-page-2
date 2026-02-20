import Image from "next/image";

type GalleryImage = string | { src: string; rotate?: number };

type CaseGalleryProps = {
  images: GalleryImage[];
  layout?: "default" | "landscape";
};

function getSrcAndRotate(item: GalleryImage): { src: string; rotate: number } {
  if (typeof item === "string") {
    return { src: item, rotate: 0 };
  }
  return { src: item.src, rotate: item.rotate ?? 0 };
}

export function CaseGallery({ images, layout = "default" }: CaseGalleryProps) {
  const items = images.map((image, index) => {
    const { src, rotate } = getSrcAndRotate(image);

    return (
      <div
        key={src}
        className="group relative overflow-hidden rounded-xl glass-card p-3 md:p-4 bg-black/35"
      >
        <div className="relative aspect-[4/5] w-full bg-black/20 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={src}
              alt={`Фото ${index + 1}`}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              style={{
                transform: rotate ? `rotate(${rotate}deg)` : "none",
                transformOrigin: "center",
                objectFit: "contain",
                width: "100%",
                height: "100%"
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={index <= 3 ? "eager" : "lazy"}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {items}
    </div>
  );
}
