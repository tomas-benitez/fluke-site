import React from "react";

type ChevronIconProps = React.ComponentPropsWithRef<"svg"> & {
  direction?: "up" | "down" | "left" | "right";
};

const ChevronIcon = (props: ChevronIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{
        transform: `rotate(${
          props.direction === "up"
            ? 0
            : props.direction === "right"
            ? 90
            : props.direction === "down"
            ? 180
            : 270
        }deg)`,
      }}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

export default ChevronIcon;
