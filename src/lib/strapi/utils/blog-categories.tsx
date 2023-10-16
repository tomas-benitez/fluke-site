import { createListFromTreeNode } from "src/utils/breadcrumbs";
import { InverseBlogCategoryTreeNode } from "../types";

export const createBreadcrumbList = (
  inverseCategoriesTree: InverseBlogCategoryTreeNode
) => {
  return createListFromTreeNode(inverseCategoriesTree, {
    direction: "inverse",
    propertyName: "parent_category",
    urlCreator: (node) =>
      node.parent_category ? `/blog/${node.slug}` : "/blog",
    labelCreator: (node) => (node.parent_category ? node.name : "Blog"),
  });
};
