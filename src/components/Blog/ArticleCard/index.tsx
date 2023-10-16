import Button from "@/components/elements/Button";
import { BlogArticleHit } from "@/lib/strapi/types";
import { getMediaUrl } from "@/lib/strapi/utils/media";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const textAlignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

type ArticleCardProps = {
  article: BlogArticleHit;
  textAlign?: "left" | "center" | "right";
} & React.ComponentPropsWithoutRef<"div">;

const ArticleCard = ({
  article,
  textAlign = "left",
  className = "",
  ...props
}: ArticleCardProps) => {
  return (
    <div className={`card card-hover overflow-hidden ${className}`} {...props}>
      <Link href={`/blog/article/${article.slug}`}>
        <a className="block">
          <Image
            src={getMediaUrl(article.featured_image)}
            className="card-img-top px-2 pt-4"
            width={600}
            height={350}
            objectFit="cover"
            alt={`imagen principal del artículo ${article.title}`}
          />
        </a>
      </Link>
      <div
        className={clsx(
          "card-body d-flex flex-column",
          textAlignments[textAlign]
        )}
      >
        <Link href={`/blog/article/${article.slug}`}>
          <a>
            <h4 className="text-lg font-bold !leading-tight tracking-tighter lg:text-xl">
              {article.title}
            </h4>
          </a>
        </Link>
        <p className="lh-sm mb-12">{article.short_description}</p>
        <div className="mt-auto px-8 pb-6">
          <Link href={`/blog/article/${article.slug}`} passHref>
            <Button variant="dark-gray" className="w-100 py-3" size="lg">
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
