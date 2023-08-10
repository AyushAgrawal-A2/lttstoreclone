import Image from 'next/image';

type ProductFeatureImagesProps = {
  featureImages: string[];
};

export default function ProductFeatureImages({
  featureImages,
}: ProductFeatureImagesProps) {
  return (
    <div className="flex flex-wrap">
      {featureImages.map((src) => (
        <div
          key={src}
          className="w-1/2 py-2 px-4 md:w-1/3">
          <Image
            alt={'product features images'}
            className="rounded-2xl"
            src={src}
            loading="eager"
            width={1000}
            height={1000}
          />
        </div>
      ))}
    </div>
  );
}
