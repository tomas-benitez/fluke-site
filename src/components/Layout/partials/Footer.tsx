import Button from "@/components/elements/Button";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "src/context";
import WhatsappWidget from "@/components/elements/WhatsappWidget";
import clsx from "clsx";
import { GlobalData } from "@/lib/cms";
import { breakpoints, useMatchMedia } from "src/utils/responsive";
import * as Collapsible from "@radix-ui/react-collapsible";
import ChevronIcon from "@/components/svg/ChevronIcon";

type FooterProps = {
  categoriesTree: GlobalData["categoriesTree"];
  whatsappText?: string;
};

export default function Footer({ categoriesTree, whatsappText }: FooterProps) {
  const [isDesktop] = useMatchMedia(breakpoints["lg"]);

  return (
    <footer>
      <div className="lg:mx-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <GridSlot className="lg:items-start">
              <Image
                src={"/logo/viditec-white.svg"}
                width={145.6}
                height={45.6}
                alt="logo de viditec"
                className="opacity-80"
              />
              <h6 className="mb-4 mt-5 text-base text-zinc-400 lg:text-zinc-300 xl:font-bold">
                Importa, Garantiza y Distribuye para todo el territorio
                argentino productos Fluke y sus marcas asociadas.
              </h6>
              <Link href={"/terminos-y-condiciones"}>
                <a className="text-decoration-underline text-lg text-zinc-400">
                  Términos y condiciones de uso
                </a>
              </Link>
              {isDesktop && <DesktopButtons />}
            </GridSlot>
            <GridSlot className="mt-4 lg:mt-0 lg:items-end">
              <CategoriesLinks categoriesTree={categoriesTree} />
              <div className="mt-4 w-full">
                {!isDesktop && <MobileButtons />}
              </div>
            </GridSlot>
            <GridSlot className="mt-4 lg:mt-0 lg:items-end">
              <div className="mx-auto lg:mx-0">
                <SocialLinks />
              </div>
            </GridSlot>
          </div>
        </div>
      </div>
      <hr className="mt-8" />
      <div className="container mt-8">
        <Disclaimer />
      </div>
      <div className="pt-16 lg:pt-8">
        <div className="container pointer-events-none fixed bottom-0 right-0 left-0 flex justify-end p-4">
          <WhatsappWidget whatsappText={whatsappText} />
        </div>
      </div>
    </footer>
  );
}

const GridSlot = (props: React.ComponentPropsWithoutRef<"div">) => (
  <div
    {...props}
    className={clsx(
      props.className,
      "mx-auto flex w-full max-w-md flex-col items-start lg:mx-0 lg:max-w-none"
    )}
  />
);

const DesktopButtons = () => {
  const { setContactPopupState, setNewsletterPopupVisible } = useAppContext();
  return (
    <>
      <Button
        variant="light"
        className="mt-4 w-64 border-none bg-neutral-500 py-4 text-white"
        onClick={() => setContactPopupState({ visible: true })}
      >
        Contacto
      </Button>
      <Button
        variant="light"
        className="mt-4 w-64 border-none bg-neutral-500 py-4 text-white"
        onClick={() => setNewsletterPopupVisible(true)}
      >
        Newsletter
      </Button>
    </>
  );
};

const MobileButtons = () => {
  const { setContactPopupState, setNewsletterPopupVisible } = useAppContext();
  return (
    <>
      <Button
        variant="light"
        size="lg"
        className="w-100 mt-4 border-none bg-neutral-500 py-3 text-white"
        onClick={() => setContactPopupState({ visible: true })}
      >
        Contacto
      </Button>
      <Button
        variant="light"
        size="lg"
        className="w-100 mt-4 border-none bg-neutral-500 py-3 text-white"
        onClick={() => setNewsletterPopupVisible(true)}
      >
        Newsletter
      </Button>
    </>
  );
};

const CategoriesLinks = ({
  categoriesTree,
}: Pick<FooterProps, "categoriesTree">) => (
  <div>
    <h6 className="mb-3 text-lg font-bold tracking-wide text-zinc-200 lg:text-xl 2xl:text-2xl">
      Categorías principales
    </h6>
    <ul className="list-unstyled">
      {categoriesTree.children_categories.map(
        (category, i) =>
          category.is_active && (
            <li className="leading-normal text-zinc-400" key={i}>
              <Link href={`/categoria/${category.slug}`}>
                <a className="text-sm lg:text-base 2xl:text-lg">
                  {category.name}
                </a>
              </Link>
            </li>
          )
      )}
    </ul>
  </div>
);

const SocialLinks = () => (
  <div className="flex flex-wrap gap-4 lg:justify-end">
    <a
      href="https://www.facebook.com/fluke.corporation/"
      aria-label="Facebook"
      title="Facebook"
      className="flex h-10 max-h-[50px] w-10 max-w-[50px] rounded-sm bg-primary-650 p-1 2xl:h-16 2xl:max-h-[60px] 2xl:w-16 2xl:max-w-[60px]"
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src="/icons/facebook.svg"
        width={80}
        height={80}
        alt="Logo de Facebook"
      />
    </a>
    <a
      href="https://www.youtube.com/user/FlukeCorporation"
      aria-label="YouTube"
      title="YouTube"
      className="flex h-10 max-h-[50px] w-10 max-w-[50px] rounded-sm bg-primary-650 p-1 2xl:h-16 2xl:max-h-[60px] 2xl:w-16 2xl:max-w-[60px]"
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src="/icons/youtube.svg"
        width={80}
        height={80}
        alt="Logo de Youtube"
      />
    </a>
    <a
      href="https://twitter.com/FlukeCorp"
      aria-label="Twitter"
      title="Twitter"
      className="flex h-10 max-h-[50px] w-10 max-w-[50px] rounded-sm bg-primary-650 p-1 2xl:h-16 2xl:max-h-[60px] 2xl:w-16 2xl:max-w-[60px]"
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src="/icons/twitter.svg"
        width={80}
        height={80}
        alt="Logo de twitter"
      />
    </a>
    <div className="flex gap-4 lg:w-full lg:justify-end">
      <a
        href="https://www.linkedin.com/company/fluke-corporation/"
        aria-label="LinkedIn"
        title="LinkedIn"
        className="flex h-10 max-h-[50px] w-10 max-w-[50px] rounded-sm bg-primary-650 p-1 2xl:h-16 2xl:max-h-[60px] 2xl:w-16 2xl:max-w-[60px]"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/icons/linkedin.svg"
          width={80}
          height={80}
          alt="Logo de linkedin"
        />
      </a>
      <a
        href="https://www.instagram.com/flukecorp/"
        aria-label="Instagram"
        title="Instagram"
        className="flex h-10 max-h-[50px] w-10 max-w-[50px] rounded-sm bg-primary-650 p-1 2xl:h-16 2xl:max-h-[60px] 2xl:w-16 2xl:max-w-[60px]"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/icons/instagram.svg"
          width={80}
          height={80}
          alt="Logo de instagram"
        />
      </a>
    </div>
    <div className="hidden lg:mt-40 lg:block">
      <Image
        src="/imgs/icono-fluke-75.png"
        width={150}
        height={150}
        alt="Logo de fluke"
      />
    </div>
  </div>
);

const Disclaimer = () => (
  <div className="flex flex-col items-center">
    <Image src={"/icons/warning-yellow.svg"} width={28} height={24} alt="" />
    <p className="mt-4 mb-0 text-xs text-zinc-400">
      <strong>DISCLAIMER</strong>
    </p>
    <p className="mb-0 text-xs text-zinc-400">
      <strong>VIDITEC S.A. - Copyright © 2022</strong>
    </p>
    <div className="text-center text-xs text-zinc-400">
      <p className="mt-1">
        La utilización de este sitio web{" "}
        <Link href="/">
          <a>www.fluke.com.ar</a>
        </Link>{" "}
        y/o cualquier Plataforma Digital de VIDITEC S.A. implica la aceptación
        de los Términos y Condiciones y de las Políticas de Privacidad de
        VIDITEC.
      </p>
      <Collapsible.Root>
        <Collapsible.Trigger className="border-none bg-transparent">
          <ChevronIcon direction="down" className="h-8 w-8 text-white" />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <p>
            Esta Plataforma Digital no ofrece en venta ningún producto ni
            servicio, sino que brinda enlaces con precios de referencia a
            diferentes comercializadores quienes son los que tienen a su cargo
            la venta de los productos exhibidos en nuestra Plataforma Digital.
            <br />
            Los precios publicados así como el stock no son responsabilidad de
            VIDITEC S.A. por lo cual resultan meras referencias para que el
            usuario tenga una primera orientación y aproximación a los mismos.
            **
          </p>
        </Collapsible.Content>
      </Collapsible.Root>
      <div className="mt-8">
        <p className="text-base font-bold 2xl:text-lg">
          Fluke. Keeping Your World Up and Running
        </p>
      </div>
    </div>
  </div>
);
