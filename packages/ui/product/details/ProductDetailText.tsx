type ProductDetailTextProps = {
  data: string;
};

export default function ProductDetailText({ data }: ProductDetailTextProps) {
  return (
    <>
      {' '}
      {data.split('\n').map((line, idx) => (
        <p
          key={idx}
          className="py-2 text-fgTertiary">
          {line}
        </p>
      ))}
    </>
  );
}
