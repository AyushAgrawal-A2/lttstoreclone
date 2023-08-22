"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";

interface InfiniteScrollProps {
  page: number;
  totalPages: number;
  apiPath: string;
  DisplayGridComponent: React.ReactElement;
}

export default function InfiniteScroll({
  page,
  totalPages,
  apiPath,
  DisplayGridComponent,
}: InfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Object>();
  const loadNextPage = useCallback(async () => {
    setIsLoading(true);
    const url = new URL(apiPath, window.location.origin);
    url.searchParams.set("page", (page + 1).toString());
    const path = url.toString();
    const { data } = await axios.get(path);
    setData(data);
    setIsLoading(false);
  }, [page, apiPath]);

  useEffect(() => {
    if (data || page >= totalPages) return;
    function handleScroll() {
      if (isLoading) return;
      if (
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
        0.75 * document.documentElement.scrollHeight
      )
        loadNextPage();
      else document.addEventListener("scroll", handleScroll, { once: true });
    }
    document.addEventListener("scroll", handleScroll, { once: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [page, totalPages, isLoading, data, loadNextPage]);

  return (
    <>
      <Loading isLoading={isLoading} />
      {!!data && (
        <>
          <DisplayGridComponent.type {...data} />
          <InfiniteScroll
            page={page + 1}
            totalPages={totalPages}
            apiPath={apiPath}
            DisplayGridComponent={DisplayGridComponent}
          />
        </>
      )}
    </>
  );
}
