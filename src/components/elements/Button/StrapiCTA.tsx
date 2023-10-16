import { CTA } from "@/lib/strapi/types";
import Link from "next/link";
import React from "react";
import { useAppContext } from "src/context";
import Button from ".";

type StrapiCTAProps = {
  CTA: CTA;
} & React.ComponentPropsWithRef<typeof Button>;

const StrapiCTA = ({ CTA, ...props }: StrapiCTAProps) => {
  if (CTA.url.startsWith("/"))
    return (
      <Link href={CTA.url} passHref>
        <Button
          variant={CTA.type === "primary" ? "dark-gray" : "light"}
          {...props}
        >
          {props.children}
        </Button>
      </Link>
    );

  if (CTA.url.startsWith(":"))
    return (
      <ActionButton
        action={CTA.url}
        variant={CTA.type === "primary" ? "dark-gray" : "light"}
        {...props}
      >
        {props.children}
      </ActionButton>
    );

  return (
    <Button
      href={CTA.url}
      variant={CTA.type === "primary" ? "dark-gray" : "light"}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default StrapiCTA;

type ActionButtonProps = {
  action: string;
} & React.ComponentPropsWithRef<typeof Button>;

const ActionButton = ({ action, ...props }: ActionButtonProps) => {
  const ctx = useAppContext();
  const actionEventHandler = useActionEvent(action, ctx);

  return <Button onClick={actionEventHandler} {...props} />;
};

function useActionEvent(action: string, ctx: ReturnType<typeof useAppContext>) {
  switch (action) {
    case ":open-contact-form":
      return () => ctx.setContactPopupState({ visible: true });
    default:
      return () => {};
  }
}
