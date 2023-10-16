import strapi from "..";
import { BlogArticleHit } from "../types";

type GetPaginatedArticlesParams = {
  page: number;
  pageSize?: number;
  categoryId: number;
};

export async function getPaginatedArticles({
  page,
  pageSize = 3,
  categoryId,
}: GetPaginatedArticlesParams) {
  return strapi
    .find<BlogArticleHit[]>(`blog-categories/${categoryId}/articles`, {
      pagination: {
        page,
        pageSize,
      },
      populate: ["featured_image"],
      sort: "publishedAt:desc",
      fields: [
        "id",
        "title",
        "slug",
        "tags",
        "short_description",
        "publishedAt",
      ],
    })
    .then((res) => {
      if (
        typeof res.meta.pagination !== "object" ||
        !("page" in res.meta.pagination) ||
        !("pageCount" in res.meta.pagination) ||
        typeof res.meta.pagination.page !== "number" ||
        typeof res.meta.pagination.pageCount !== "number"
      )
        throw new Error("Invalid response from Strapi");

      return {
        articles: res.data,
        nextPage:
          res.meta.pagination.page < res.meta.pagination.pageCount
            ? res.meta.pagination.page + 1
            : null,
      };
    });
}

export type NewsArticle = BlogArticleHit & {
  url?: string;
};

export const getNewsArticles = () => {
  const defaultNews: NewsArticle[] = [
    {
      createdAt: "2021-03-13T20:32:17.757Z",
      id: "default-1",
      publishedAt: "2021-03-13T20:32:17.757Z",
      featured_image: {
        alternativeText: "Hombre usando aparato de medición marca fluke",
        height: 0,
        width: 0,
        url: "/uploads/default_news_article_1_33482b8280.jpg?updated_at=2023-03-13T20:32:17.757Z",
        caption: "",
      },
      short_description:
        "Recursos de la cámara acústica industrial Fluke ii900",
      slug: "default-1",
      tags: "",
      title: "Detección de fugas de aire simplificada",
      url: "/categoria/camaras-acusticas",
    },
    {
      createdAt: "2021-03-13T20:32:17.757Z",
      id: "default-2",
      publishedAt: "2021-03-13T20:32:17.757Z",
      featured_image: {
        alternativeText: "Hombre usando aparato de medición marca fluke",
        height: 0,
        width: 0,
        url: "/uploads/default_news_article_2_7b355bad0e.jpg?updated_at=2023-03-13T20:33:46.827Z",
        caption: "",
      },
      short_description: "Encuentre el calibrador indicado",
      slug: "default-2",
      tags: "",
      title:
        "Los calibradores de lazo más populares, innovadores y precisos del mundo",
      url: "/categoria/calibradores-de-lazo-de-m-a",
    },
    {
      createdAt: "2021-03-13T20:32:17.757Z",
      id: "default-3",
      publishedAt: "2021-03-13T20:32:17.757Z",
      featured_image: {
        alternativeText: "Hombre usando aparato de medición marca fluke",
        height: 0,
        width: 0,
        url: "/uploads/default_news_article_3_63fa7aa6c9.jpg?updated_at=2023-03-13T20:33:46.453Z",
        caption: "",
      },
      short_description: "Conoce las soluciones Fluke",
      slug: "default-3",
      tags: "",
      title:
        "Calidad eléctrica: Analizadores, medidores, grabadores y registradores",
      url: "/categoria/calidad-de-energia",
    },
    {
      createdAt: "2021-03-13T20:32:17.757Z",
      id: "default-4",
      publishedAt: "2021-03-13T20:32:17.757Z",
      featured_image: {
        alternativeText: "Hombre usando aparato de medición marca fluke",
        height: 0,
        width: 0,
        url: "/uploads/default_news_article_4_ee550631d4.jpg?updated_at=2023-03-13T20:33:47.385Z",
        caption: "",
      },
      short_description: "Conoce todas las soluciones Fluke",
      slug: "default-4",
      tags: "",
      title: "Calibradores de procesos para todos los sectores de la industria",
      url: "/categoria/calibradores-multifuncion",
    },
  ];

  return strapi
    .find<NewsArticle[]>("blog-articles", {
      populate: ["featured_image"],
      sort: "publishedAt:desc",
      fields: [
        "id",
        "title",
        "slug",
        "tags",
        "short_description",
        "publishedAt",
      ],
      filters: {
        blog_category: {
          slug: "noticias",
        },
      },
      pagination: {
        limit: 4,
        start: 0,
      },
    })
    .then((res) => [...res.data, ...defaultNews].slice(0, 4));
};
