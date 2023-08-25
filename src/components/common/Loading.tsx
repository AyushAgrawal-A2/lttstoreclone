interface LoadingParams {
  isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingParams) {
  return (
    <div className={`mx-auto w-fit ${!isLoading && "hidden"}`}>
      <div className="h-16 w-16 border-t-4 border-fgPrimary rounded-full animate-spin"></div>
    </div>
  );
}
