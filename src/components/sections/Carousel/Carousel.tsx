import Image from "next/image";
import Button from "@/components/elements/Button";
import RBSCarousel from "react-bootstrap/Carousel";
import { Children } from "react";
import Link from "next/link";

let CarouselRoot = ({ children }) => {
  const arrayChildren = Children.toArray(children);

  return (
    <RBSCarousel controls={false}>
      {Children.map(arrayChildren, (child, i) => (
        <RBSCarousel.Item
          key={i}
          className="h-[50vh] md:h-[90vh] lg:h-[40vh] 2xl:h-[50vh]"
        >
          {child}
        </RBSCarousel.Item>
      ))}
    </RBSCarousel>
  );
};

type CarouselItemProps = {
  bgImage?: string;
  responsiveBgImages?: {
    className: string;
    src: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  }[];
  overlay?: boolean;
  link?: string;
  linkTitle?: string;
  children: React.ReactNode;
};

const CarouselItem = ({
  children,
  bgImage,
  responsiveBgImages = [],
  //Lo pase a false para quitar el overlay
  overlay = false,
  link,
  linkTitle,
}: CarouselItemProps) => {
  return (
    <>
      {Boolean(responsiveBgImages.length) ? (
        responsiveBgImages.map((bgImage) => (
          <div
            key={bgImage.className}
            className={`absolute inset-0 ${bgImage.className} bg-black`}
            // style={{
            //   backgroundImage: bgImage.backgroundImage
            //     ? bgImage.backgroundImage
            //     : "",
            // }}
          >
            <Image
              layout="fill"
              className="d-block w-100"
              src={bgImage.src}
              alt="First slide"
              objectFit={bgImage.objectFit || "cover"}
              loading="eager"
              priority={true}
            />
          </div>
        ))
      ) : (
        <div className="absolute inset-0">
          <Image
            layout="fill"
            className="d-block w-100"
            src={bgImage || "/imgs/image-1.jpg"}
            alt="First slide"
            objectFit="cover"
            loading="eager"
            priority={true}
          />
        </div>
      )}
      {overlay && <div className="absolute inset-0 bg-black/60" />}
      {link && (
        <Link href={link}>
          <a
            className="absolute inset-0 isolate z-[5] block h-full w-full"
            title={linkTitle}
          ></a>
        </Link>
      )}
      <div className="container relative h-full text-white xl:px-12">
        <div className="flex h-full max-w-4xl flex-col items-start justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

const CarouselButton = ({ children, className = "px-4 py-3", ...props }) => {
  return (
    <Button
      {...props}
      variant="light"
      size="lg"
      className={`mt-6 w-full py-6 lg:w-auto lg:px-32 ${className}`}
    >
      Ver más
    </Button>
  );
};

type CarouselHeadingProps<T extends React.ElementType> = {
  as?: T;
};

const CarouselHeading = <T extends React.ElementType = "h1">({
  children,
  as,
  className,
  ...props
}: CarouselHeadingProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof CarouselHeadingProps<T>>) => {
  let Component = as || "h1";

  return (
    <Component
      {...props}
      className={`display-5 lh-1 mb-3 font-black ${className}`}
    >
      {children}
    </Component>
  );
};

let Carousel = Object.assign(CarouselRoot, {
  Button: CarouselButton,
  Heading: CarouselHeading,
  Item: CarouselItem,
});

export default Carousel;
