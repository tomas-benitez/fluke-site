import { getMediaUrl } from "@/lib/strapi/utils/media";
import Image from "next/image";
import Button from "../elements/Button";
import styles from "@/styles/scss/modules/product/offer-card.module.scss";
import { sendWhatsappClickEvent, useRedirection } from "./hooks";
import WhatsappIcon from "../svg/WhatsappIcon";
import LinkArrowIcon from "../svg/LinkArrowIcon";
import { Product } from "@/lib/strapi/types";

type OfferCardProps = {
  offer: Product["offers"][0];
  onClick?: () => void;
  className?: string;
  product: Product;
} & React.HTMLAttributes<HTMLDivElement>;

const OfferCard = ({
  offer,
  onClick,
  className,
  product,
  ...props
}: OfferCardProps) => {
  const { handleRedirection } = useRedirection();

  return (
    <div className={`card ${className}`} {...props}>
      <div className="card-body d-flex flex-column">
        {offer.store.logo ? (
          <div
            className={`${styles["logo"]} relative h-14 w-full cursor-pointer`}
            onClick={() => {
              handleRedirection(offer, product);
            }}
          >
            <Image
              src={
                getMediaUrl(offer.store.logo) ||
                "https://via.placeholder.com/600x400"
              }
              layout="fill"
              objectFit="contain"
              alt="..."
            />
          </div>
        ) : (
          <div>{offer.store.name}</div>
        )}
        <label>Dirección</label>
        <span className="mb-4">{offer.store.address}</span>
        {offer.url.toLowerCase() !== "whatsapp" && (
          <div className="mt-auto">
            <Button
              onClick={() => {
                handleRedirection(offer, product);
              }}
              variant="dark-gray"
              className="w-100 mt-2 py-3"
              size="lg"
            >
              Comprar
            </Button>
          </div>
        )}
        {offer.store.whatsapp_number && (
          <div className="mt-auto w-full pt-6">
            <a
              href={`https://wa.me/${
                offer.store.whatsapp_number
              }?text=${encodeURI(
                `https://fluke.com.ar/producto/${product.slug}`
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                sendWhatsappClickEvent(
                  offer.store.whatsapp_number,
                  offer.store.name
                );
              }}
              className="inline-flex w-full justify-between"
            >
              <span>
                Whatsapp <LinkArrowIcon className="h-3 w-4" />
              </span>{" "}
              <WhatsappIcon className="h-8 w-8" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
