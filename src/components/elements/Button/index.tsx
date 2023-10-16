import RBSButton, { ButtonProps } from "react-bootstrap/Button";
import classNames from "classnames";
import styles from "@/styles/scss/modules/button.module.scss";
import React, { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    let { className, ...rest } = props;

    return (
      <RBSButton
        ref={ref}
        {...rest}
        className={classNames(className, styles["btn"])}
      >
        {children}
      </RBSButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
