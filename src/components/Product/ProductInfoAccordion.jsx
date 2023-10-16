import { getInfoPieces } from "@/lib/strapi/utils/product";
import Accordion from "react-bootstrap/Accordion";

const ProductInfoAccordion = ({ product, showResources, setShowResources }) => {
  const infoPieces = getInfoPieces(product);

  return (
    infoPieces.length > 0 && (
      <Accordion
        defaultActiveKey={infoPieces[0].key}
        activeKey={showResources ? "product_resources" : undefined}
        onSelect={() => setShowResources(false)}
        flush
      >
        {infoPieces.map((piece) => (
          <Accordion.Item key={piece.key} eventKey={piece.key}>
            <Accordion.Header>{piece.label}</Accordion.Header>
            <Accordion.Body>
              {typeof piece.content === "string" ? (
                <div
                  className="markup overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: piece.content,
                  }}
                ></div>
              ) : (
                piece.content
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  );
};

export default ProductInfoAccordion;
