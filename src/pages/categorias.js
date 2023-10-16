import Button from "@/components/elements/Button";
import Hero from "@/components/sections/Hero";
import HScroller from "@/components/elements/HScroller";
import Image from "next/image";
import Link from "next/link";
import { getGlobalData } from "@/lib/cms";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";

const CategoriesPage = ({ globalData }) => {
  return (
    <Layout data={globalData}>
      <Seo
        seo={{
          metaTitle: `Categorias | Fluke Argentina`,
          metaDescription: `Categorias | Fluke Argentina`,
        }}
      />
      <Hero>
        <h1 className="display-5 fw-bold lh-1 mb-3">Lorem, ipsum.</h1>
        <p>
          Quickly design and customize responsive mobile-first sites with
          Bootstrap, the world’s most popular front-end open source toolkit,
          featuring Sass variables and mixins.
        </p>
        <div className="d-flex gap-2">
          <Button
            href="#"
            variant="light"
            size="lg"
            className="me-md-2 flex-grow-1 px-4"
          >
            Primary
          </Button>
        </div>
      </Hero>
      <section>
        <HScroller variant="list">
          {Array(10)
            .fill(0)
            .map((val, i) => (
              <HScroller.Slot key={i}>
                <div className="card">
                  <Image
                    src="https://via.placeholder.com/600x400/fff"
                    className="card-img-top"
                    width={600}
                    height={400}
                    objectFit="contain"
                    alt="..."
                    loader={({ src }) => src}
                  />
                  <div className="card-body">
                    <Link href="/">
                      <a className="stretched-link text-decoration-none text-reset">
                        <h5 className="fs-6 text-center">Card title</h5>
                      </a>
                    </Link>
                  </div>
                </div>
              </HScroller.Slot>
            ))}
        </HScroller>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    let globalDataPromise = getGlobalData();

    return {
      props: {
        globalData: await globalDataPromise,
      },
    };
  } catch (e) {
    console.error("ERROR", e);
    return { props: {} };
  }
}

export default CategoriesPage;
