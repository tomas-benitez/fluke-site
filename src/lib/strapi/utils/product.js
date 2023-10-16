import ResourcesList from "@/components/Product/ResourcesList";
import { useQuery } from "react-query";

export const getProductManuals = (product) => {
  return product.product_resources.filter(
    (resource) => resource.type.identifier === "manual"
  );
};

export const getFilterAttributes = (products) =>
  products.reduce((acc, product) => {
    for (const attributeKey in product.filter_attributes) {
      if (attributeKey.startsWith("#")) continue;
      if (acc[attributeKey] === undefined) acc[attributeKey] = [];

      if (!acc[attributeKey].includes(product.filter_attributes[attributeKey]))
        acc[attributeKey].push(product.filter_attributes[attributeKey]);
    }
    return acc;
  }, {});

export const filterProducts = (products, filterAttributes) => {
  let attributes = Object.keys(filterAttributes).reduce(
    (acc, attrName) =>
      filterAttributes[attrName].length === 0
        ? acc
        : { ...acc, [attrName]: filterAttributes[attrName] },
    {}
  );

  if (Object.keys(attributes).length === 0) {
    return products;
  }

  return products.filter((product) =>
    productHasAttributes(product, attributes)
  );
};

export const productHasAttributes = (product, attributes) => {
  return Object.keys(attributes).every((attrName) =>
    attributes[attrName].includes(product.filter_attributes[attrName])
  );
};

export const getInfoPieces = (product) => {
  const infoPieces = [];

  if (product.general_characteristics) {
    infoPieces.push({
      key: "description",
      label: "Descripción",
      content: product.general_characteristics,
    });
  }
  if (product.specifications) {
    infoPieces.push({
      key: "specifications",
      label: "Especificaciones",
      content: product.specifications,
    });
  }
  if (product.product_resources?.length > 0) {
    infoPieces.push({
      key: "product_resources",
      label: "Recursos",
      content: <ResourcesList resources={product.product_resources} />,
    });
  }

  return infoPieces;
};

/**
 *
 * @param {string} queryString a query string for the fetch request. Should include "?" at the beginning.
 * @returns {Array} an array of randomly selected products
 */
export const useRandomProductsQuery = (queryString = "") => {
  return useQuery(
    ["random_products", queryString],
    () =>
      fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/random${queryString}`
      )
        .then((res) => res.json())
        .then((res) => res.data),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
