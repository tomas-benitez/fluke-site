import strapi from "@/lib/strapi";
import { getInverseCategoriesTree } from "@/lib/strapi/blog-categories";
import { BlogCategoryTreeNode } from "@/lib/strapi/types";
import { createBreadcrumbList } from "@/lib/strapi/utils/blog-categories";
import { useQuery } from "react-query";

export const useBlogCategoryBreadcrumbs = (
  categoriesTree: BlogCategoryTreeNode
) => {
  const { data: blogCategoryBreadcrumbs } = useQuery(
    ["blogCategoryBreadcrumbs", categoriesTree.id],
    async () => {
      return getInverseCategoriesTree(categoriesTree.slug).then(
        createBreadcrumbList
      );
    },
    {
      refetchOnWindowFocus: false,
      initialData: [],
    }
  );

  return blogCategoryBreadcrumbs;
};
