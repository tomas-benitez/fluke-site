import { useQuery } from "react-query";
import strapi from "..";
import { BlogArticle, BlogCategoryTreeNode } from "../types";

export const getTags = (articles: { tags: string }[]) =>
  Array.from(
    new Set(
      articles.flatMap((a) =>
        a.tags ? a.tags.replaceAll(", ", ",").split(",") : []
      )
    )
  );

export const getFromCategoriesTree = (categoriesTree: BlogCategoryTreeNode) => {
  let articles = categoriesTree.blog_articles || [];
  let childrenArticles =
    categoriesTree.children_categories.length > 0
      ? categoriesTree.children_categories.flatMap((c) =>
          getFromCategoriesTree(c)
        )
      : [];

  articles = [...articles, ...childrenArticles];

  return articles;
};

export const useRelatedArticlesQuery = (article: BlogArticle) => {
  return useQuery(["relatedArticles", article.blog_category?.id], () =>
    strapi
      .find<BlogArticle[]>("blog-articles", {
        filters: { blog_category: { id: article.blog_category?.id } },
        populate: { featured_image: true },
      })
      .then((res) => res.data)
  );
};
