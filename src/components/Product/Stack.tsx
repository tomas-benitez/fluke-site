import { Product } from "@/lib/strapi/types";
import { getProductCardImage } from "@/lib/strapi/utils/media";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  products: Product[];
};

const Stack = ({ products }: Props) => {
  return (
    <div className="w-full space-y-4">
      {products.map((p) => (
        <Link key={p.id} href={`/producto/${p.slug}`}>
          <a className="flex rounded-md bg-white px-2 py-6 shadow-sm transition-shadow duration-500 hover:shadow-lg xl:px-16">
            <div className="flex shrink-0 basis-20 items-center sm:basis-28 xl:w-28">
              <Image
                src={getProductCardImage(p)}
                width={100}
                height={100}
                objectFit="cover"
                alt=""
              />
            </div>
            <div className="ml-2 flex flex-col xl:ml-8">
              <h3 className="text-base font-bold text-slate-600 xl:text-xl">
                {p.model_name}
              </h3>
              <p className="font-bold xl:text-xl">{p.title}</p>
              {p.category && (
                <span className="self-start rounded-sm bg-slate-200 py-2 px-4 text-xs xl:text-base">
                  {p.category.name}
                </span>
              )}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Stack;
