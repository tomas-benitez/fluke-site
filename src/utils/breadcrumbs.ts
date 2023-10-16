import { RemoveIndex } from "./typescript";

export type Breadcrumb = {
  url?: string;
  label: string;
};

type CreateListFromTreeNodeOptions<T extends Record<string, unknown>> = {
  direction: "default" | "inverse";
  propertyName: keyof RemoveIndex<T>;
  urlCreator: (node: T) => string;
  labelCreator: (node: T) => string;
};

export const createListFromTreeNode = <T extends Record<string, unknown>>(
  treeNode: T,
  opt: CreateListFromTreeNodeOptions<T>
): Breadcrumb[] => {
  let breadcrumbs: Breadcrumb[] = [];

  breadcrumbs.push({
    label: opt.labelCreator(treeNode),
    url: opt.urlCreator(treeNode),
  });

  if (treeNode[opt.propertyName]) {
    switch (opt.direction) {
      case "inverse":
        breadcrumbs = [
          ...createListFromTreeNode(treeNode[opt.propertyName] as T, opt),
          ...breadcrumbs,
        ];
        break;

      default:
        breadcrumbs = [
          ...breadcrumbs,
          ...createListFromTreeNode(treeNode[opt.propertyName] as T, opt),
        ];
        break;
    }
  }

  return breadcrumbs;
};
