import React from "react";

type Props = {} & React.ComponentPropsWithoutRef<"svg">;

const LinkArrowIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M2.214 13.785l11.44-11.44"
      ></path>
      <path
        fill="currentColor"
        d="M15.12.881l-11.47.417.067 1.911 9.415-.344-.34 9.416 1.911.068L15.12.881z"
      ></path>
    </svg>
  );
};

export default LinkArrowIcon;
