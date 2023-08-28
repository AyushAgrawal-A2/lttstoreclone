import Image from "next/image";

type ProductFeatureImagesProps = {
  featureImages: string[];
};

export default function ProductFeatureImages({
  featureImages,
}: ProductFeatureImagesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
      {featureImages.map((src) => (
        <Image
          key={src}
          alt={"product features images"}
          className="rounded-2xl"
          src={src}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ))}
    </div>
  );
}
