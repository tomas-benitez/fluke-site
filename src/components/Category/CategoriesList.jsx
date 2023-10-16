import { getMediaUrl } from "@/lib/strapi/utils/media";
import Image from "next/image";
import Link from "next/link";
import HScroller from "../elements/HScroller";
import styles from "@/styles/scss/modules/category/categories-list.module.scss";

const CategoriesList = ({ categories }) => {
  let filteredCategories = categories.filter((category) => category.is_active);

  return (
    <HScroller variant="list">
      {filteredCategories.map((category, i) => (
        <HScroller.Slot className={styles["h-scroller-slot"]} key={i}>
          <div className={`${styles["card"]} card card-hover pt-2`}>
            <Image
              src={
                getMediaUrl(category.thumbnail_image) ||
                "/imgs/default_product_image-600x400.jpg"
              }
              className="card-img-top"
              width={600}
              height={400}
              objectFit="contain"
              alt={`Miniatura de la categoría ${category.name}`}
            />
            <div className="card-body">
              <Link href={`/categoria/${category.slug}`}>
                <a className="stretched-link text-decoration-none text-reset">
                  <h5 className="fs-6 text-center font-medium">
                    {category.name}
                  </h5>
                </a>
              </Link>
            </div>
          </div>
        </HScroller.Slot>
      ))}
    </HScroller>
  );
};

export default CategoriesList;
