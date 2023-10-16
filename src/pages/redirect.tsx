import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect } from "react";
import styles from "@/styles/scss/modules/redirect-page.module.scss";
import Seo from "@/components/Seo";

export default function RedirectPage({ url }) {
  useEffect(() => {
    window.document.body.style.setProperty("--zoom", "100%");
  });
  useEffect(() => {
    setTimeout(() => {
      window.location = url;
    }, 3000);
  }, [url]);

  return (
    <div className="flex h-screen flex-col items-center bg-gray-900 pt-52 text-white">
      <Seo
        seo={{
          metaTitle: `Fluke Argentina`,
          metaDescription: `Fluke Argentina`,
        }}
      />
      <div>
        <Image src="/logo/fluke.jpg" width={200} height={58} alt="logo fluke" />
      </div>
      <div>
        <h5 className="mt-24 text-center">
          Usted está siendo redirigido a la web del distribuidor
        </h5>
        <div className={`${styles["loading"]} mt-16`} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      url: context.query.url,
    },
  };
};
