import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { sendEvent } from "src/utils/gtag";

const gaEvent = () => {
  sendEvent({
    category: "whatsapp",
    action: "interno",
    label: window.location.pathname,
  });
};

type FormProps = {
  onSubmit?: (data: unknown) => void;
  defaultMessage?: string;
};

const Form = ({ onSubmit, defaultMessage }: FormProps) => {
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      company: "",
      activity: "",
      message:
        defaultMessage ||
        "Hola, quería consultar sobre sus productos y servicios",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const { name, ...dataRest } = data;
    fetch("/api/save-contact", {
      method: "POST",
      body: JSON.stringify({
        ...dataRest,
        first_name: name.split(" ")[0],
        last_name: name.split(" ").slice(1).join(" "),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    window
      .open(
        `https://wa.me/${
          process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
        }?text=${encodeURI(
          data.message || "Hola, tengo una consulta respecto a:"
        )}`
      )
      .focus();

    gaEvent();

    onSubmit && onSubmit(data);
  });

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div>
        <div className="relative mb-2 rounded-lg bg-[white] px-6 py-[0.4rem] before:absolute before:right-full before:bottom-2 before:h-5 before:w-[25px] before:translate-x-2.5 before:bg-[linear-gradient(_to_bottom_right,transparent_50%,white_50%_)] before:content-['']">
          <input
            placeholder="Correo Electrónico*"
            type="email"
            className="m-0 w-full border-none bg-transparent p-0 text-base  placeholder:text-[#adadad] lg:text-sm xl:text-base"
            required
            {...form.register("email")}
          />
        </div>
        <div className="mb-2 rounded-lg bg-[white] px-6 py-[0.4rem]">
          <input
            placeholder="Nombre Completo*"
            type="text"
            className="m-0 w-full border-none bg-transparent p-0 text-base  placeholder:text-[#adadad] lg:text-sm xl:text-base"
            required
            {...form.register("name")}
          />
        </div>
        <div className="mb-2 rounded-lg bg-[white] px-6 py-[0.4rem]">
          <input
            placeholder="Número de teléfono"
            type="text"
            className="m-0 w-full border-none bg-transparent p-0 text-base  placeholder:text-[#adadad] lg:text-sm xl:text-base"
            {...form.register("phone")}
          />
        </div>
        <div className="mb-2 rounded-lg bg-[white] px-6 py-[0.4rem]">
          <input
            placeholder="Empresa"
            type="text"
            className="m-0 w-full border-none bg-transparent p-0  text-base placeholder:text-[#adadad] lg:text-sm xl:text-base"
            {...form.register("company")}
          />
        </div>
        <div className="mb-2 rounded-lg bg-[white] px-6 py-[0.4rem]">
          <input
            placeholder="Actividad"
            type="text"
            className="m-0 w-full border-none bg-transparent p-0  text-base placeholder:text-[#adadad] lg:text-sm xl:text-base"
            {...form.register("activity")}
          />
        </div>
        <span className="mb-1 inline-block pl-7 text-xs text-[#848484]">
          Mensaje inicial a enviar*
        </span>
        <div className="mb-2 rounded-lg bg-[white] px-6 py-[0.4rem]">
          <textarea
            placeholder="Hola, me gustaría..."
            className="xl :text-base w-full resize-y border-none text-base placeholder:text-[#adadad] lg:text-sm"
            required
            {...form.register("message")}
          />
        </div>
        <div className="mt-8 flex justify-end lg:mt-4">
          <button className="flex w-auto items-center rounded-[1.25rem] border-none bg-[#4cc55c] px-6 py-4 text-lg text-[white] hover:opacity-80 lg:rounded-xl lg:py-[0.7rem]">
            Comenzar{" "}
            <span className="ml-4 flex">
              <Image
                src="/imgs/whatsapp-send-icon.svg"
                alt=""
                width={20}
                height={20}
              />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
