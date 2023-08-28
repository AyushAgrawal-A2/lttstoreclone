import LoadingSpinner from "@/src/components/common/Loading";

export default function Loading() {
  return (
    <div className="m-12">
      <LoadingSpinner isLoading={true} />
    </div>
  );
}
