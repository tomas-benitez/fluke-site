import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";
import strapi from "@/lib/strapi";
import cache from "@/lib/cache/mcache";

const CACHE_KEY = "server_sitemap_fields";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let fields = cache.get<ISitemapField[]>(CACHE_KEY);

  if (fields) {
    return getServerSideSitemap(ctx, fields);
  }

  const products = await strapi
    .find<Record<string, any>[]>("products", {
      filters: {
        is_active: true,
      },
      fields: ["slug"],
      pagination: {
        limit: 5000,
        start: 0,
      },
    })
    .then((res) => res.data);

  const categories = await strapi
    .find<Record<string, any>[]>("categories", {
      filters: {
        parent_category: { id: { $notNull: true } },
        products: { id: { $notNull: true } },
      },
      fields: ["slug"],
      pagination: {
        limit: 5000,
        start: 0,
      },
    })
    .then((res) => res.data);

  const brands = await strapi
    .find<Record<string, any>[]>("brands", {
      fields: ["slug"],
      pagination: {
        limit: 5000,
        start: 0,
      },
    })
    .then((res) => res.data);

  fields = [
    ...categories.map<ISitemapField>((category) => ({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/categoria/${category.slug}`,
      lastmod: new Date().toISOString(),
    })),
    ...products.map<ISitemapField>((product) => ({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/producto/${product.slug}`,
      lastmod: new Date().toISOString(),
    })),
    ...brands.map<ISitemapField>((brand) => ({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/marca/${brand.slug}`,
      lastmod: new Date().toISOString(),
    })),
  ];

  cache.set(CACHE_KEY, fields, 60 * 60 * 24);

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
