import Layout from "@/components/Layout";
import Hero from "@/components/sections/Hero";
import { getGlobalData, GlobalData } from "@/lib/cms";
import { getCategoriesTree } from "@/lib/strapi/blog-categories";
import { BlogArticleHit, BlogCategoryTreeNode } from "@/lib/strapi/types";
import { getMediaUrl } from "@/lib/strapi/utils/media";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import RightArrowIcon from "@/components/svg/RightArrowIcon";
import ArticlesList from "@/components/Blog/ArticlesList";
import Seo from "@/components/Seo";
import { getPaginatedArticles } from "@/lib/strapi/blog-articles";
import { useInfiniteQuery } from "react-query";
import LoadingIcon from "@/components/svg/LoadingIcon";
import { useInView } from "react-intersection-observer";
import ChevronIcon from "@/components/svg/ChevronIcon";

type BlogHomePageProps = {
  initialPaginatedArticles: { articles: BlogArticleHit[]; nextPage: number };
  categoriesTree: BlogCategoryTreeNode;
  globalData: GlobalData;
};

const BlogHomePage: NextPage<BlogHomePageProps> = ({
  globalData,
  categoriesTree,
  initialPaginatedArticles,
}) => {
  const query = useInfiniteQuery(["blogArticles", 1], {
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPaginatedArticles({
        categoryId: 1,
        page: pageParam,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response;
    },
    initialData: {
      pages: [
        {
          articles: initialPaginatedArticles.articles,
          nextPage: initialPaginatedArticles.nextPage,
        },
      ],
      pageParams: [1],
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined;
    },
  });
  const [inViewRef] = useInView({
    rootMargin: "-60% 0px -20% 0px",
    onChange: (inView) => {
      if (inView && query.data.pages.length < 3) {
        query.fetchNextPage();
      }
    },
  });

  return (
    <Layout data={globalData}>
      <Seo
        seo={{
          ...categoriesTree.seo,
          metaTitle:
            categoriesTree.seo?.metaTitle ||
            `Fluke Argentina | Blog: ${categoriesTree.name}`,
          metaImage: categoriesTree.seo?.metaImage,
        }}
      />
      <Hero bgImage={getMediaUrl(categoriesTree.cover)}>
        <Hero.Heading>Blog</Hero.Heading>
        <p className="text-1xl 2xl:text-2xl">{categoriesTree.description}</p>
      </Hero>
      <div className="container pt-6 xl:px-12">
        <Link href={"/"}>
          <a className="mr-2 text-gray-500">Inicio</a>
        </Link>
        <RightArrowIcon className="mr-2" />
        <span>Blog</span>
      </div>
      <ArticlesList
        articles={query.data.pages.flatMap((page) => page.articles)}
        categoriesTree={categoriesTree}
      />
      <div className="flex justify-center py-4" ref={inViewRef}>
        {query.data.pages.length >= 3 && query.hasNextPage && (
          <button
            className="flex h-24 items-center border-none bg-transparent"
            onClick={() => query.fetchNextPage()}
            disabled={query.isFetchingNextPage}
          >
            {query.isFetchingNextPage ? "Cargando..." : "Cargar más"}
            <ChevronIcon direction="down" className="ml-2 h-8 w-8" />
          </button>
        )}
        {query.isFetching && <LoadingIcon className="h-24 w-24" />}
      </div>
    </Layout>
  );
};

export default BlogHomePage;

export const getServerSideProps: GetServerSideProps<BlogHomePageProps> = async (
  ctx
) => {
  const globalDataPromise = getGlobalData();
  const categoriesTreePromise = getCategoriesTree();
  const articlesPromise = getPaginatedArticles({
    categoryId: 1,
    page: 1,
  });

  return {
    props: {
      globalData: await globalDataPromise,
      categoriesTree: await categoriesTreePromise,
      initialPaginatedArticles: await articlesPromise,
    },
  };
};
