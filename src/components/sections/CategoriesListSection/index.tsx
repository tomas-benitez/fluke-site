import CategoriesList from "@/components/Category/CategoriesList";

const CategoriesListSection = ({ categories, headingText }) => {
  return (
    <section id="categories-section" className="pb-6 pt-4">
      <h1 className="text-center text-2xl font-extrabold 2xl:text-3xl">
        {headingText}
      </h1>
      <CategoriesList categories={categories} />
    </section>
  );
};

export default CategoriesListSection;
