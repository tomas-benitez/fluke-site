import { Product } from "@/lib/strapi/types";
import { useCallback } from "react";
import { sendEvent, sendOutboundLinkEvent } from "src/utils/gtag";

export const useRedirection = () => {
  const handleRedirection = useCallback(
    (offer: Product["offers"][number], product: Product) => {
      sendEvent({
        action: `${offer.store.name}`,
        category: "clic-distribuidor",
        label: `${product.title}-${product.model_name}`,
      });
      window.open(`/redirect?url=${offer.url}`, "_blank").focus();
    },
    []
  );

  return { handleRedirection };
};

export const sendWhatsappClickEvent = (
  phone: string,
  distributorName: string
) => {
  sendOutboundLinkEvent(`https://wa.me/${phone}`, "distribuidor");
  sendEvent({
    action: distributorName,
    category: "clic-distribuidor-whatsapp",
    label: window.location.pathname,
  });
};
