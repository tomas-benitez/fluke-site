import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getInfoPieces } from "@/lib/strapi/utils/product";
import { useEffect } from "react";

const ProductInfoTabs = ({ product, showResources, setShowResources }) => {
  const infoPieces = getInfoPieces(product);

  return (
    infoPieces.length > 0 && (
      <Tabs
        defaultActiveKey={infoPieces[0].key}
        activeKey={showResources ? "product_resources" : undefined}
        className="bg-gray-100"
        style={{
          "--bs-nav-link-padding-x": "4rem",
          "--bs-nav-link-padding-y": "1.5rem",
          "--bs-nav-tabs-link-active-bg": "var(--bs-gray-300)",
          borderRadius: "var(--bs-nav-tabs-border-radius)",
        }}
        onSelect={() => setShowResources(false)}
      >
        {infoPieces.map((piece) => (
          <Tab
            eventKey={piece.key}
            title={piece.label}
            className="bg-gray-100 px-16 py-8"
            key={piece.key}
          >
            {typeof piece.content === "string" ? (
              <div
                className="markup"
                dangerouslySetInnerHTML={{
                  __html: piece.content,
                }}
              ></div>
            ) : (
              piece.content
            )}
          </Tab>
        ))}
      </Tabs>
    )
  );
};

export default ProductInfoTabs;
