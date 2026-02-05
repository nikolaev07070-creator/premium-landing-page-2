import Image from "next/image";

type CaseGalleryProps = {
  images: string[];
};

export function CaseGallery({ images }: CaseGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {images.map((image, index) => (
        <div
          key={image}
          className="group relative overflow-hidden rounded-xl glass-card"
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={image}
              alt={`Фото ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={index <= 3 ? "eager" : "lazy"}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
