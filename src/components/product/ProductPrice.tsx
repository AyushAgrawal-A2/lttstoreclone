type ProductPriceProps = {
  price: number;
};

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <div className="mb-4 text-2xl font-semibold uppercase w-max max-w-full mx-auto md:mx-0">
      ${price} USD
    </div>
  );
}
