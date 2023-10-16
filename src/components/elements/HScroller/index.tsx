import styles from "@/styles/scss/modules/h-scroller.module.scss";
import { forwardRef } from "react";

type HScrollerProps = {
  children: React.ReactNode;
  variant?: string;
  hideScrollbar: boolean;
  classNameInner: string;
  className: string;
};

const HScrollerRoot = forwardRef<HTMLDivElement, HScrollerProps>(
  ({ children, variant, hideScrollbar, classNameInner, className }, ref) => {
    const variantClass = styles[`--${variant}`] || "";
    const hideScrollbarClass = hideScrollbar ? "no-scrollbar" : "";

    return (
      <div className={`${styles["container"]} ${variantClass} ${className}`}>
        <div
          ref={ref}
          className={`${styles["inner"]} ${hideScrollbarClass} ${classNameInner}`}
        >
          {children}
        </div>
      </div>
    );
  }
);

const HScrollerSlot = ({ children, className, ...props }) => {
  return (
    <div className={`${styles["slot"]} ${className}`} {...props}>
      {children}
    </div>
  );
};

HScrollerRoot.displayName = "HScroller";

let HScroller = Object.assign(HScrollerRoot, {
  Slot: HScrollerSlot,
});

export default HScroller;
