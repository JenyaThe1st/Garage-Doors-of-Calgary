import Image from "next/image";

type ServiceCategoryImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function ServiceCategoryImage({
  src,
  alt,
  width,
  height,
}: ServiceCategoryImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 1279px) 100vw, 50vw"
      quality={85}
      className="h-auto w-full"
    />
  );
}
