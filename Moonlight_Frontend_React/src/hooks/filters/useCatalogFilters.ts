import { useSearchParams } from "react-router-dom";

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateURLParam = (key: string, value: string | undefined) => {
    setSearchParams((prev) => {
      if (value) prev.set(key, value);
      else prev.delete(key);
      return prev;
    });
  };

  const updateURLParams = (
    paramsToUpdate: Record<string, string | undefined>,
  ) => {
    setSearchParams((prev) => {
      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (value) prev.set(key, value);
        else prev.delete(key);
      });
      return prev;
    });
  };

  const filters = {
    title: searchParams.get("title") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    launch_date_from: searchParams.get("launch_date_from") ?? undefined,
    launch_date_to: searchParams.get("launch_date_to") ?? undefined,
    price_min: searchParams.get("price_min")
      ? Number(searchParams.get("price_min"))
      : undefined,
    price_max: searchParams.get("price_max")
      ? Number(searchParams.get("price_max"))
      : undefined,
    onChangeCategory: (value: string) => updateURLParam("category", value),
    onPriceCleanUp: () =>
      updateURLParams({ price_min: undefined, price_max: undefined }),
    onConfirmPrice: (min: string, max: string) =>
      updateURLParams({ price_min: min, price_max: max }),
    onLaunchCleanUp: () =>
      updateURLParams({ launch_date_from: undefined, launch_date_to: undefined }),
    onConfirmLaunchDate: (from: string, to: string) =>
      updateURLParams({ launch_date_from: from, launch_date_to: to })
  };

  return {
    filters,
    updateURLParam,
    updateURLParams,
  };
}
