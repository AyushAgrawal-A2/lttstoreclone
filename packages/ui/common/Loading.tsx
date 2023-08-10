interface LoadingParams {
  loading: boolean;
}

export default function Loading({ loading }: LoadingParams) {
  return (
    <div className={`mx-auto w-fit ${!loading && 'hidden'}`}>
      <div className="h-16 w-16 border-t-4 rounded-full animate-spin"></div>
    </div>
  );
}
