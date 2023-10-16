import strapi from "@/lib/strapi";
import cache from "../cache/mcache";
import { Brand, CategoryTreeNode } from "../strapi/types";

export type GlobalData = {
  categoriesTree?: CategoryTreeNode;
  brands?: Brand[];
  [k: string]: any;
};

export const getGlobalData = async (): Promise<GlobalData> => {
  let globalData = cache.get("globalData");
  if (globalData) return globalData;

  let defaultGlobalData = {};

  try {
    let categoriesPromise = strapi
      .find("categories", {
        filters: {
          parent_category: {
            id: {
              $null: true,
            },
          },
        },
        populate: {
          children_categories: {
            filters: {
              is_active: true,
              children_categories: {
                products: {
                  id: {
                    $notNull: true,
                  },
                },
              },
            },
            sort: "name",
            populate: {
              children_categories: {
                filters: {
                  products: {
                    id: {
                      $notNull: true,
                    },
                  },
                  is_active: true,
                },
                populate: {
                  thumbnail_image: "*",
                },
                sort: "name",
              },
              thumbnail_image: "*",
            },
          },
        },
      })
      .then((res) => res.data[0]);

    let strapiGlobalDataPromise = strapi
      .find<Record<any, any>>("global", {
        populate: {
          featuredProducts: {
            fields: [
              "title",
              "slug",
              "crm_images",
              "card_title",
              "id",
              "model_name",
              "short_description",
              "sku",
            ],
          },
          seo: {
            populate: {
              metaImage: "*",
            },
          },
        },
      })
      .then((res) => res.data);

    let brandsPromise = strapi
      .find("brands", {
        populate: ["logo"],
      })
      .then((res) => res.data);

    globalData = {
      categoriesTree: await categoriesPromise,
      brands: await brandsPromise,
      ...(await strapiGlobalDataPromise),
    };

    cache.set(
      "globalData",
      globalData,
      process.env.NODE_ENV === "development" ? 1 : undefined
    );

    return globalData;
  } catch (e) {
    console.log(e);
    return defaultGlobalData;
  }
};
