export const getBreadcrumbs = (category) => {
  let breadCrumbs = [];
  let currentCategory = category;
  while (currentCategory) {
    if (currentCategory.parent_category) {
      breadCrumbs = [
        {
          url: `/categoria/${currentCategory.slug}`,
          label: currentCategory.name,
        },
      ].concat(breadCrumbs);
      currentCategory = currentCategory.parent_category;
    } else {
      breadCrumbs = [
        {
          url: `/`,
          label: "Inicio",
        },
      ].concat(breadCrumbs);
      currentCategory = null;
    }
  }

  return breadCrumbs;
};
