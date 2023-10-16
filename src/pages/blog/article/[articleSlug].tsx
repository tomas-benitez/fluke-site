import RelatedArticles from "@/components/Blog/RelatedArticles";
import Breadcrumbs from "@/components/Breadcrumbs";
import Layout from "@/components/Layout";
import Relevant from "@/components/sections/Relevant";
import Seo from "@/components/Seo";
import { getGlobalData, GlobalData } from "@/lib/cms";
import strapi from "@/lib/strapi";
import { BlogArticle } from "@/lib/strapi/types";
import { useRelatedArticlesQuery } from "@/lib/strapi/utils/blog-articles";
import { getMediaUrl } from "@/lib/strapi/utils/media";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import StrapiCTA from "@/components/elements/Button/StrapiCTA";

type BlogArticlePageProps = {
  article: BlogArticle;
  globalData: GlobalData;
};

const BlogArticlePage: NextPage<BlogArticlePageProps> = ({
  globalData,
  article,
}) => {
  const relatedArticlesQuery = useRelatedArticlesQuery(article);

  if (!article.CTAs || article.CTAs.length === 0) {
    article.CTAs = [
      {
        id: 1,
        text: "Productos relacionados",
        type: "primary",
        url: "#productos-relacionados",
        newTab: false,
      },
      {
        id: 2,
        text: "Consulte con un especialista",
        type: "secondary",
        url: ":open-contact-form",
        newTab: false,
      },
    ];
  }

  return (
    <Layout
      bg="bg-white"
      data={globalData}
      whatsappText={`Hola, quiero saber más sobre '${article.title}'`}
    >
      <Seo
        seo={{
          ...article.seo,
          metaTitle:
            article.seo?.metaTitle ||
            `Fluke Argentina | Artículo: ${article.title}`,
          metaImage: article.seo?.metaImage || article.featured_image,
          metaDescription:
            article.seo?.metaDescription || article.short_description,
        }}
      />
      <div className="bg-white lg:px-4 xl:px-8 2xl:px-20">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Blog", url: "/blog" },
            { label: `${article.title.slice(0, 28)}...` },
          ]}
          prependHome
        />
      </div>

      <section className="bg-white py-10 lg:px-4 xl:px-8 xl:pb-24 2xl:px-24">
        <div className="card mx-2 mb-10 flex min-h-[300px] overflow-hidden md:hidden md:aspect-square md:min-h-0 md:w-[70%] md:justify-center xl:ml-44">
          <Image
            src={getMediaUrl(article.featured_image)}
            alt={article.featured_image?.alternativeText}
            width={article.featured_image?.width}
            height={article.featured_image?.height}
            objectFit={"cover"}
            objectPosition={"center"}
            layout="fill"
          />
        </div>
        <div className="mx-2 max-w-[1600px] rounded-xl md:mb-16 md:overflow-hidden md:bg-[#F4F4F4] lg:mx-auto xl:mb-20 2xl:mb-24">
          <div className="md:flex md:items-stretch">
            <div className="px-4 md:flex md:max-w-[53%] md:basis-1/2 md:flex-col md:justify-center md:p-12">
              <h1 className="text-base font-bold text-[#333333] lg:pb-2 xl:text-2xl">
                {article.title}
              </h1>
              <p className="text-sm font-light text-[#707070] lg:text-base xl:text-xl">
                {article.short_description}
              </p>
              {/*botones-desktop */}
              {article.CTAs && article.CTAs.length > 0 && (
                <div className="md:flex-wra p hidden gap-2 md:mt-8 md:flex md:flex-wrap md:items-center">
                  {article.CTAs.map((CTA) => (
                    <StrapiCTA
                      CTA={CTA}
                      className={`shrink-0 grow md:min-w-max md:basis-0 md:py-4 md:text-xs lg:text-base xl:py-6 xl:text-lg ${
                        CTA.type === "primary"
                          ? "text-white"
                          : "border border-[#717171] text-[#717171]"
                      }`}
                      key={CTA.id}
                    >
                      {CTA.text}
                    </StrapiCTA>
                  ))}
                </div>
              )}
            </div>

            <div className="relative hidden min-h-[300px] overflow-hidden md:block md:aspect-[4/3] md:min-h-0 md:basis-1/2">
              <Image
                src={getMediaUrl(article.featured_image)}
                alt={article.featured_image?.alternativeText}
                width={article.featured_image?.width}
                height={article.featured_image?.height}
                objectFit={"cover"}
                objectPosition={"center"}
                layout="fill"
              />
            </div>
          </div>
        </div>
        {/*botones-mobile */}
        {article.CTAs && article.CTAs.length > 0 && (
          <div className="mx-3 mt-10 flex flex-col md:hidden">
            {article.CTAs.map((CTA) => (
              <StrapiCTA
                CTA={CTA}
                className={`mb-3 py-4 ${
                  CTA.type === "primary"
                    ? "text-white"
                    : "border border-[#717171] text-[#717171]"
                }`}
                key={CTA.id}
              >
                {CTA.text}
              </StrapiCTA>
            ))}
          </div>
        )}
        <div className="articulo-body markup mx-3 mt-6 max-w-[1600px] bg-[#FFFFFF] px-1 pt-5 text-sm text-[#212121] md:mx-6 md:flex md:justify-center md:rounded-lg md:border md:bg-[#F4F4F4]  md:px-4 md:py-4 md:shadow-lg lg:mx-auto lg:text-base xl:py-20">
          <div
            className="md:max-w-3xl xl:max-w-6xl  "
            dangerouslySetInnerHTML={{
              __html: article.body,
            }}
          ></div>
        </div>
      </section>
      {article.products && article.products.length > 0 && (
        <div
          className=" mt-16 xl:px-8 xl:py-2 2xl:px-20"
          id="productos-relacionados"
        >
          <Relevant items={article.products} title="Productos relacionados" />
        </div>
      )}
      {relatedArticlesQuery.data && (
        <div className="mt-16 pb-16 xl:px-8 xl:pt-2 2xl:px-20">
          <RelatedArticles articles={relatedArticlesQuery.data} />
        </div>
      )}
    </Layout>
  );
};

export default BlogArticlePage;

export const getServerSideProps: GetServerSideProps<
  BlogArticlePageProps,
  { articleSlug: string }
> = async (ctx) => {
  try {
    const globalDataPromise = getGlobalData();

    const articlePromise = strapi
      .find<BlogArticle>(
        `slugify/slugs/blog-article/${ctx.params.articleSlug}`,
        {
          populate: [
            "featured_image",
            "products",
            "blog_category",
            "seo.metaImage",
            "CTAs",
          ],
        }
      )
      .then((res) => res.data);

    return {
      props: {
        globalData: await globalDataPromise,
        article: await articlePromise,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};
