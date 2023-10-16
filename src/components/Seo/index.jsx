import { getMediaUrl } from "@/lib/strapi/utils/media";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const Seo = ({ seo }) => {
  const { asPath } = useRouter();

  const openGraph = {
    title: seo.metaTitle || undefined,
    description: seo.metaDescription || undefined,
    images: [],
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${asPath}`,
  };

  if (seo.metaImage) {
    openGraph.images = seo.metaImage.formats
      ? Object.values(seo.metaImage.formats).map((image) => ({
          url: getMediaUrl(image),
          width: image.width,
          height: image.height,
        }))
      : [
          {
            url: getMediaUrl(seo.metaImage),
            width: seo.metaImage.width,
            height: seo.metaImage.height,
          },
        ];
  }

  return (
    <NextSeo
      title={seo.metaTitle || undefined}
      description={seo.metaDescription || undefined}
      openGraph={openGraph}
    />
  );
};

export default Seo;
