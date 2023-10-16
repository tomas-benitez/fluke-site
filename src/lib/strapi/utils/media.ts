import { Media } from "../types";

export const getMediaUrl = (
  media?: Pick<Media, "url"> & { source?: string }
) => {
  if (!media) throw new Error("Media is not defined");

  if (media.url.startsWith("http")) return media.url;
  if (media.source === "local") return media.url;
  else return `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`;
};

export const getProductCardImage = (p: { crm_images: string[] }) => {
  return p.crm_images[0]
    ? p.crm_images[0]
    : "/imgs/default_product_image-600x400.jpg";
};

export const getProductMediaList = (product) => {
  let crmImages = product.crm_images;
  let crmVideos = product.crm_videos;
  let mediaList = [].concat(
    crmImages
      .filter((url) => url !== "")
      .map((url) => ({ url, type: "image" })),
    crmVideos
      .filter((url) => url !== "")
      .map((url) => {
        if (checkIsYoutubeUrl(url)) {
          const videoId = getYoutubeVideoId(url);
          if (!videoId) return null;
          return {
            url: `https://www.youtube.com/embed/${videoId}?autoplay=false&amp;loop=true&amp;title=false&amp;enablejsapi=1&amp;iv_load_policy=3&amp;modestbranding=1`,
            type: "embed",
          };
        }
        return { url, type: "video" };
      })
  );

  return mediaList.filter((media) => Boolean(media));
};

export const getYoutubeVideoId = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const checkIsYoutubeUrl = (url) => {
  return url.match(/https?:\/\/(youtu.be|youtube.com)/i);
};

export const addMediaListFallback = (mediaList) => {
  if (mediaList?.length > 0) return mediaList;

  return [
    {
      url: "/imgs/default_product_image-600x400.jpg",
      type: "image",
      source: "local",
    },
  ];
};
