import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavourite = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favorites", fetcher, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return { data, error, isLoading, mutate };
};

export default useFavourite;
