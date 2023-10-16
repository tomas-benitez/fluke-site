import { getFilterAttributes } from "@/lib/strapi/utils/product";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

export const useFiltersForm = (products) => {
  const { data: filterAttributes } = useQuery(
    ["filter_attributes", products.map((p) => p.id)],
    () => getFilterAttributes(products),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: getFilterAttributes(products),
    }
  );

  const defaultValues = useMemo(
    () =>
      Object.keys(filterAttributes).reduce(
        (acc, key) => ({
          [key]: filterAttributes[key].map((attr) => false),
          ...acc,
        }),
        {}
      ),
    [filterAttributes]
  );

  const form = useForm({
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: defaultValues,
  });

  return { filterAttributes, form, defaultValues };
};
