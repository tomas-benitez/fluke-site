import React from "react";

type Props = {} & React.ComponentPropsWithoutRef<"svg">;

const SearchIcon = ({ strokeWidth, stroke, ...props }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        strokeLinecap="round"
        d="M9.079 9.054l3.666 3.68"
        strokeWidth={strokeWidth || 1}
        stroke={stroke || "#353535"}
      ></path>
      <circle
        strokeWidth={strokeWidth || 1}
        stroke={stroke || "#353535"}
        cx="5.583"
        cy="5.565"
        r="4.829"
      ></circle>
    </svg>
  );
};

export default SearchIcon;
