import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import WhatsappIcon from "@/components/svg/WhatsappIcon";
import Image from "next/image";
import Form from "./Form";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

type WhatsappWidgetProps = {
  whatsappText?: string;
};

const WhatsappWidget = ({ whatsappText }: WhatsappWidgetProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => setVisible(open)}>
      <Dialog.Trigger
        title="Abrir whatsapp"
        className={clsx(
          "border-none bg-transparent",
          visible ? "pointer-events-none" : "pointer-events-auto"
        )}
        disabled={visible}
      >
        <WhatsappIcon className="h-12 w-12" />
      </Dialog.Trigger>
      <AnimatePresence>
        {visible && (
          <Dialog.Portal forceMount>
            <Dialog.Content className="fixed bottom-4 right-4 z-[1000] xl:bottom-20 xl:right-24">
              <motion.div
                initial={{
                  y: "15%",
                  x: "15%",
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.4, ease: "anticipate" },
                }}
                exit={{
                  y: "50%",
                  x: "25%",
                  scale: 0.5,
                  opacity: 0,
                  transition: { duration: 0.6, ease: "anticipate" },
                }}
                className="max-w-[350px] overflow-hidden rounded-[2.5rem] bg-[#e8eceb] shadow-[3px_3px_16px_rgba(0,0,0,0.5)] sm:max-w-[450px] lg:max-w-[450px]"
              >
                <div className="flex items-center bg-[#4cc55c] px-[1.2rem] py-4 lg:py-[0.8rem]">
                  <div className="h-[2.3rem] w-[2.3rem] shrink-0 rounded-[100%] bg-[white] p-[0.4rem]">
                    <Image
                      src="/imgs/whatsapp-icon.png"
                      alt="whatsapp logo"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h6 className="m-0 ml-2 w-max text-lg font-bold text-white">
                    Fluke Argentina
                  </h6>
                  <Dialog.Close className="ml-auto w-10 border-none bg-transparent">
                    <Image
                      src="/imgs/whatsapp-close-icon.svg"
                      alt="close icon"
                      width={40}
                      height={40}
                    />
                  </Dialog.Close>
                </div>
                <div className="px-[1.8rem] py-4 text-[#646464] lg:py-2">
                  <p className="relative m-0 rounded-lg bg-[white] px-6 py-4 text-base font-medium leading-tight tracking-[-0.5px] before:absolute before:right-full before:bottom-2 before:h-5 before:w-[25px] before:translate-x-2.5 before:bg-[linear-gradient(_to_bottom_right,transparent_50%,white_50%_)] before:content-[''] lg:text-sm xl:text-base">
                    <b>Hola! Compartí tus datos</b> y se abrirá el Whatsapp para
                    empezar a conversar con un representante de Fluke Argentina.
                  </p>
                  <Form
                    defaultMessage={whatsappText}
                    onSubmit={() => setVisible(false)}
                  />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default WhatsappWidget;
