import strapi from "..";
import { BlogCategoryTreeNode, InverseBlogCategoryTreeNode } from "../types";

export const getCategoriesTree = (
  slug?: string
): Promise<BlogCategoryTreeNode> => {
  return strapi
    .find<BlogCategoryTreeNode[]>("blog-categories", {
      filters: slug ? { slug } : { parent_category: { id: { $null: true } } },
      populate: {
        children_categories: {
          populate: {
            children_categories: {
              populate: {
                children_categories: {
                  populate: {
                    blog_articles: {
                      populate: { featured_image: true },
                      fields: [
                        "id",
                        "title",
                        "slug",
                        "tags",
                        "short_description",
                        "publishedAt",
                      ],
                    },
                  },
                },
                blog_articles: {
                  populate: { featured_image: true },
                  fields: [
                    "id",
                    "title",
                    "slug",
                    "tags",
                    "short_description",
                    "publishedAt",
                  ],
                },
              },
            },
            blog_articles: {
              populate: { featured_image: true },
              fields: [
                "id",
                "title",
                "slug",
                "tags",
                "short_description",
                "publishedAt",
              ],
            },
          },
        },
        cover: true,
        blog_articles: {
          populate: { featured_image: true },
          sort: ["createdAt:desc"],
          fields: [
            "id",
            "title",
            "slug",
            "tags",
            "short_description",
            "publishedAt",
          ],
        },
        seo: true,
      },
    })
    .then(({ data }) => ({ ...data[0], isRoot: !Boolean(slug) }));
};

export const getInverseCategoriesTree = (
  slug: string
): Promise<InverseBlogCategoryTreeNode | null> => {
  return strapi
    .find<InverseBlogCategoryTreeNode | null>("blog-categories", {
      filters: { slug },
      populate: {
        parent_category: {
          populate: {
            parent_category: {
              populate: {
                parent_category: true,
              },
            },
          },
        },
      },
    })
    .then(({ data }) =>
      data.length > 0 ? { ...data[0], isRoot: !Boolean(slug) } : null
    );
};
