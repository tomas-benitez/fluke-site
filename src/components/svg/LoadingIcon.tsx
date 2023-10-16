import React from "react";

type LoadingIconProps = {} & React.ComponentPropsWithoutRef<"svg">;

const LoadingIcon = (props: LoadingIconProps) => {
  return (
    <svg
      width="50px"
      height="50px"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#fff"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        className="stroke-primary-600"
        strokeWidth={4}
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="2s"
          repeatCount="indefinite"
          from="0"
          to="502"
        />
        <animate
          attributeName="stroke-dasharray"
          dur="2s"
          repeatCount="indefinite"
          values="150.6 100.4;1 250;150.6 100.4"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoadingIcon;
