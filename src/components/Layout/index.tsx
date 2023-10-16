import Head from "next/head";
import { useEffect, useRef } from "react";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import ContactPopup from "../elements/ContactPopup";
import NewsletterPopup from "../elements/NewsletterPopup";
import { GlobalData } from "@/lib/cms";
import clsx from "clsx";

type LayoutProps = {
  children: React.ReactNode;
  data: GlobalData;
  whatsappText?: string;
  bg?: "bg-white" | "bg-black" | "bg-gray-100";
};

const Layout = ({ children, data, whatsappText = "", bg }: LayoutProps) => {
  const headerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerRef.current?.offsetHeight}px`
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [headerRef]);

  return (
    <>
      <div>
        <header ref={headerRef}>
          <Navbar categoriesTree={data.categoriesTree} brands={data.brands} />
        </header>
        <main className={clsx(bg)}>{children}</main>
        <Footer
          categoriesTree={data.categoriesTree}
          whatsappText={whatsappText}
        />
        <ContactPopup />
        <NewsletterPopup />
      </div>
    </>
  );
};

export default Layout;
