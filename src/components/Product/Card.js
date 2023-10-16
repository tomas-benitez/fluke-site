import Image from "next/image";
import Button from "@/components/elements/Button";
import Link from "next/link";

const Card = ({ product, className, ...props }) => {
  return (
    <div className={`card card-hover overflow-hidden ${className}`} {...props}>
      <Link href={`/producto/${product.slug}`} passHref>
        <a className="block p-2">
          <Image
            src={
              product.crm_images[0]
                ? product.crm_images[0]
                : "/imgs/default_product_image-600x400.jpg"
            }
            className="card-img-top px-2 pt-4"
            width={600}
            height={450}
            objectFit="contain"
            alt={`imagen principal de producto ${product.title} ${product.model_name}`}
          />
        </a>
      </Link>
      <div className="card-body d-flex flex-column text-left">
        <Link href={`/producto/${product.slug}`}>
          <a>
            <h4 className="h6 fw-bold mb-3 leading-relaxed">
              <span className="text-gray-500">{product.model_name}</span>
              <br />
              {product.title}
            </h4>
          </a>
        </Link>
        <p className="lh-sm mb-4">{product.short_description}</p>
        <Link href={`/producto/${product.slug}`} passHref>
          <Button variant="dark-gray" className="w-100 mt-auto" size="lg">
            Ver más
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
