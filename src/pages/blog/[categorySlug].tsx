import ArticlesList from "@/components/Blog/ArticlesList";
import { useBlogCategoryBreadcrumbs } from "@/components/Blog/hooks";
import Breadcrumbs from "@/components/Breadcrumbs";
import Layout from "@/components/Layout";
import Hero from "@/components/sections/Hero";
import Seo from "@/components/Seo";
import LoadingIcon from "@/components/svg/LoadingIcon";
import { getGlobalData, GlobalData } from "@/lib/cms";
import { getPaginatedArticles } from "@/lib/strapi/blog-articles";
import { getCategoriesTree } from "@/lib/strapi/blog-categories";
import { BlogArticleHit, BlogCategoryTreeNode } from "@/lib/strapi/types";
import { getMediaUrl } from "@/lib/strapi/utils/media";
import { GetServerSideProps, NextPage } from "next";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import ChevronIcon from "@/components/svg/ChevronIcon";

type BlogCategoryPageProps = {
  initialPaginatedArticles: { articles: BlogArticleHit[]; nextPage: number };
  categoriesTree: BlogCategoryTreeNode;
  globalData: GlobalData;
};

const BlogCategoryPage: NextPage<BlogCategoryPageProps> = ({
  globalData,
  categoriesTree,
  initialPaginatedArticles,
}) => {
  const query = useInfiniteQuery(["blogArticles", categoriesTree.id], {
    queryFn: async ({ pageParam = 1 }) => {
      let response = await getPaginatedArticles({
        categoryId: categoriesTree.id,
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
  const breadcrumbs = useBlogCategoryBreadcrumbs(categoriesTree);

  return (
    <Layout
      data={globalData}
      whatsappText={`Hola, quisiera saber más sobre '${categoriesTree.name}'`}
    >
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
        <Hero.Heading>{categoriesTree.name}</Hero.Heading>
        <p className="text-1xl 2xl:text-2xl">{categoriesTree.description}</p>
      </Hero>
      <Breadcrumbs breadcrumbs={breadcrumbs} prependHome={true} />
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

export default BlogCategoryPage;

export const getServerSideProps: GetServerSideProps<
  BlogCategoryPageProps,
  { categorySlug: string }
> = async (ctx) => {
  try {
    const globalDataPromise = getGlobalData();
    const categoriesTree = await getCategoriesTree(ctx.params.categorySlug);
    const articlesPromise = getPaginatedArticles({
      categoryId: categoriesTree.id,
      page: 1,
    });

    return {
      props: {
        globalData: await globalDataPromise,
        categoriesTree,
        initialPaginatedArticles: await articlesPromise,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};
