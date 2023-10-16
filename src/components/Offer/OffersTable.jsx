import { getMediaUrl } from "@/lib/strapi/utils/media";
import clsx from "clsx";
import Image from "next/image";
import Button from "../elements/Button";
import LinkArrowIcon from "../svg/LinkArrowIcon";
import WhatsappIcon from "../svg/WhatsappIcon";
import { sendWhatsappClickEvent, useRedirection } from "./hooks";

const OffersTable = ({ offers, product }) => {
  const { handleRedirection } = useRedirection();

  return (
    <table className="table-striped table">
      <thead>
        <tr>
          <th className="text-xl font-normal"></th>
          <th className="text-xl font-semibold">Distribuidor</th>
          <th className="text-xl font-semibold">Dirección</th>
          <th className="text-xl font-semibold">Distribuidor</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((offer) => (
          <tr key={offer.id} className="h-24">
            <td className="w-[6%]"></td>
            <td className="align-middle">
              {offer.store.logo ? (
                <div
                  className="w-32 cursor-pointer"
                  onClick={() => {
                    handleRedirection(offer, product);
                  }}
                >
                  <Image
                    src={
                      getMediaUrl(offer.store.logo) ||
                      "https://via.placeholder.com/600x400"
                    }
                    width={offer.store.logo.width}
                    height={offer.store.logo.height}
                    objectFit="cover"
                    alt="..."
                  />
                </div>
              ) : (
                <div>{offer.store.name}</div>
              )}
            </td>
            <td className="align-middle">{offer.store.address}</td>
            <td className="w-[10%] align-middle">
              <div className="flex items-center space-x-3">
                {offer.url.toLowerCase() !== "whatsapp" && (
                  <Button
                    onClick={() => {
                      handleRedirection(offer, product);
                    }}
                    variant="dark-gray"
                    className="shrink-0 px-16 py-4"
                    size="lg"
                  >
                    Comprar
                  </Button>
                )}
                {offer.store.whatsapp_number && (
                  <a
                    href={`https://wa.me/${
                      offer.store.whatsapp_number
                    }?text=${encodeURI(
                      `https://fluke.com.ar/producto/${product.slug}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                      "inline-flex",
                      offer.url.toLowerCase() === "whatsapp" && "w-full"
                    )}
                    onClick={() => {
                      sendWhatsappClickEvent(offer.store.whatsapp_number);
                    }}
                  >
                    {offer.url.toLowerCase() === "whatsapp" && (
                      <span>
                        Whatsapp <LinkArrowIcon className="h-3 w-4" />
                      </span>
                    )}
                    <WhatsappIcon className="ml-2 h-8 w-8" />
                  </a>
                )}
              </div>
            </td>
            <td className="w-[6%]"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OffersTable;
