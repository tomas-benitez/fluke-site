import { useMatchMedia } from "src/utils/responsive";
import ProductInfoTabs from "./ProductInfoTabs";
import ProductInfoAccordion from "./ProductInfoAccordion";

const ProductInfo = ({ product, showResources, setShowResources }) => {
  const [isDesktop] = useMatchMedia("(min-width: 1024px)");

  const ProductInfoComponent = isDesktop
    ? ProductInfoTabs
    : ProductInfoAccordion;

  return (
    <ProductInfoComponent
      product={product}
      showResources={showResources}
      setShowResources={setShowResources}
    />
  );
};

export default ProductInfo;
