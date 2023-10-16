import Link from "next/link";
import { Fragment } from "react";
import { Breadcrumb } from "src/utils/breadcrumbs";
import RightArrowIcon from "../svg/RightArrowIcon";

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
  prependHome?: boolean;
};

const Breadcrumbs = ({
  breadcrumbs,
  prependHome = false,
}: BreadcrumbsProps) => {
  return (
    <div className="container pt-6 xl:px-12">
      {prependHome && (
        <Fragment>
          <Link href={"/"}>
            <a className="mr-2 text-gray-500">Inicio</a>
          </Link>
          <RightArrowIcon className="mr-2" />
        </Fragment>
      )}
      {breadcrumbs.map((breadcrumb, i) =>
        i !== breadcrumbs.length - 1 ? (
          <Fragment key={breadcrumb.label}>
            <Link href={breadcrumb.url}>
              <a className="mr-2 text-gray-500">{breadcrumb.label}</a>
            </Link>
            <RightArrowIcon className="mr-2" />
          </Fragment>
        ) : (
          <span key={breadcrumb.label}>{breadcrumb.label}</span>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
