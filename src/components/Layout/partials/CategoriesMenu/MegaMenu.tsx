import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";

const MegaMenu = ({ show, onHide, categoriesTree }) => {
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
        if (e.target instanceof HTMLElement && e.target.tagName === "LI") {
          onHide();
        }
      }}
    >
      <div
        style={{
          top: "var(--header-height)",
          maxHeight: "calc(100vh - var(--header-height))",
        }}
        className="relative mx-12 flex justify-center bg-white pr-8 pt-4 shadow-2xl"
      >
        <div
          style={{
            maxHeight: "calc(100vh - var(--header-height))",
          }}
          className="inline-block columns-[4_auto] overflow-x-auto"
        >
          {categoriesTree.children_categories?.map(
            (category) =>
              category.is_active && (
                <div key={category.id}>
                  <ul className="inline-block list-none py-4">
                    <Link href={`/categoria/${category.slug}`} passHref>
                      <a>
                        <li className="pb-4 text-lg font-bold text-gray-700 2xl:text-2xl">
                          {category.name}
                        </li>
                      </a>
                    </Link>
                    {category.children_categories?.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categoria/${category.slug}`}
                        passHref
                      >
                        <a>
                          <li className="pb-1 leading-tight 2xl:text-base 2xl:leading-normal 2xl:text-gray-600">
                            {category.name}
                          </li>
                        </a>
                      </Link>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
