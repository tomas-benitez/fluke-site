import { getMediaUrl } from "@/lib/strapi/utils/media";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const MegaMenu = ({ show, onHide, brands }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === "Escape" || e.keyCode === 27) {
        onHide();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onHide, show]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-10 transform bg-black/30 transition-all duration-300",
        show ? "visible top-0 opacity-100" : "invisible -top-16 opacity-0"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onHide();
        if (e.target instanceof HTMLElement && e.target.tagName === "A") {
          onHide();
        }
      }}
    >
      <div
        style={{
          top: "var(--header-height)",
          maxHeight: "calc(100vh - var(--header-height))",
        }}
        className="relative mx-24 flex w-max max-w-3xl flex-wrap overflow-auto bg-white py-8 pr-16 shadow-2xl"
      >
        {brands?.map((brand) => (
          <div key={brand.id}>
            <Link href={`/marca/${brand.slug}`} passHref>
              <a className="group inline-block px-8 py-6 hover:opacity-100">
                <div className="pointer-events-none flex h-20 justify-center">
                  <Image
                    src={getMediaUrl(brand.logo)}
                    className="pointer-events-none saturate-0 group-hover:saturate-100"
                    width={Math.min(brand.logo.width, 150)}
                    height={brand.logo.height}
                    alt={`Logo de la marca ${brand.name}`}
                    objectFit="contain"
                  />
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
