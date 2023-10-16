import Image from "next/image";
import styles from "@/styles/scss/modules/hero.module.scss";
import Button from "@/components/elements/Button";

let HeroRoot = ({ children, bgImage }) => {
  return (
    <section className={styles["hero"]}>
      <div className="hero-background">
        <Image
          src={bgImage || "https://via.placeholder.com/1920x1080/000"}
          layout="fill"
          alt="Bootstrap Themes"
          loading="lazy"
          objectFit="cover"
          objectPosition={"66% center"}
          loader={bgImage ? null : ({ src }) => src}
        />
      </div>
      <div className="container hero-content grid text-white xl:px-12">
        <div className="g-col-12 g-col-lg-8 space-y-4">{children}</div>
      </div>
    </section>
  );
};

const HeroButton = ({ children, className = "px-4 py-3", ...props }) => {
  return (
    <Button
      {...props}
      href="#categories-section"
      variant="light"
      size="lg"
      className={`${styles["btn"]} ${className}`}
    >
      {children}
    </Button>
  );
};

const HeroHeading = ({ children, as = "h1", className = "" }) => {
  let Component = as;
  return (
    <Component
      className={`lh-1 mb-3 text-4xl font-black 2xl:text-5xl ${className}`}
    >
      {children}
    </Component>
  );
};

const Hero = Object.assign(HeroRoot, {
  Button: HeroButton,
  Heading: HeroHeading,
});

export default Hero;
