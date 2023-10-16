import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { getGlobalData } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/elements/Button";

export default function Custom404({ globalData }) {
  return (
    <Layout data={globalData}>
      <Seo
        seo={{
          metaTitle: `Página no encontrado | Fluke Argentina`,
          metaDescription: `Página no encontrado | Fluke Argentina`,
        }}
      />
      <div className="px-4">
        <div className="mx-auto flex max-w-2xl flex-col items-center py-20 text-center">
          <div className="w-full">
            <Image
              src="/imgs/404.png"
              layout="responsive"
              width={731}
              height={439}
              alt="404 error"
            />
          </div>
          <h3 className="mt-6 font-bold text-slate-600">
            ¡Parece que esta página no existe!
          </h3>
          <p className="mt-4 text-slate-700">
            Lo sentimos, pero la página que estás buscando no está disponible
          </p>
          <Link href="/" passHref>
            <Button
              variant="dark-gray"
              className="mt-12 w-auto py-4 px-16 tracking-wider"
            >
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
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
