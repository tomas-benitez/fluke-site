import Script from "next/script";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const ContactForm = ({ message = "" }) => {
  const [show, setShow] = useState(false);
  const formContainerRef = useRef();

  useEffect(() => {
    setShow(true);
  }, []);

  const submitCallback = useCallback((event) => {
    const data = new FormData(event.target);

    fetch("/api/send-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: data.get("inf_field_FirstName"),
        lastname: data.get("inf_field_LastName"),
        email_address: data.get("inf_field_Email"),
        company: data.get("inf_field_Company"),
        phone: data.get("inf_field_Phone1"),
        message: data.get("inf_misc_Mensaje"),
        current_url: document.location.href,
      }),
    });
  }, []);

  useEffect(() => {
    if (show && formContainerRef.current.querySelector("form")) {
      formContainerRef.current
        .querySelector("form")
        .addEventListener("submit", submitCallback);
    }
    let formEl = formContainerRef.current.querySelector("form");
    return () => {
      if (formEl) formEl.removeEventListener("submit", submitCallback);
    };
  }, [show, submitCallback]);

  return (
    <div ref={(el) => (formContainerRef.current = el)}>
      {show ? (
        <Fragment>
          <div
            dangerouslySetInnerHTML={{
              __html: `
            <form accept-charset="UTF-8" action="https://sn292.infusionsoft.com/app/form/process/dab25c35f4bb62195ef96c00bebca702" class="infusion-form pb-16" id="inf_form_dab25c35f4bb62195ef96c00bebca702" method="POST" target="_blank">
                <input name="inf_form_xid" type="hidden" value="dab25c35f4bb62195ef96c00bebca702" />
                <input name="inf_form_name" type="hidden" value="Form de Contacto WEB FLUKE" />
                <input name="infusionsoft_version" type="hidden" value="1.70.0.486844" />
                <div class="infusion-field mb-3">
                    <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_FirstName">Nombre *</label>
                    <input class="block form-control" id="inf_field_FirstName" name="inf_field_FirstName" placeholder="Nombre *" type="text" required />
                </div>
                <div class="infusion-field mb-3">
                    <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_LastName">Apellidos *</label>
                    <input class="block form-control" id="inf_field_LastName" name="inf_field_LastName" placeholder="Apellidos *" type="text" required />
                </div>
                <div class="infusion-field mb-3">
                    <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_Email">Email *</label>
                    <input class="block form-control" id="inf_field_Email" name="inf_field_Email" placeholder="Email *" type="text" required />
                </div>
                <div class="infusion-field mb-3">
                    <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_Phone1">Tel&eacute;fono</label>
                    <input class="block form-control" id="inf_field_Phone1" name="inf_field_Phone1" placeholder="Tel&eacute;fono" type="text" />
                </div>
                <div class="infusion-field mb-3">
                    <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_Company">Empresa *</label>
                    <input class="block form-control" id="inf_field_Company" name="inf_field_Company" placeholder="Empresa *" type="text" required />
                </div>
                <div>
                    <div>&nbsp;</div>
                </div>
                <div class="infusion-field mb-3">
                    <label for="inf_misc_Mensaje">Mensaje *</label>
                    <textarea class="block form-control" cols="24" id="inf_misc_Mensaje" name="inf_misc_Mensaje" placeholder="Mensaje *" required rows="5">${
                      message
                        ? message
                        : "Hola,\r\nQuería hacerles la siguiente consulta:\r\n"
                    }</textarea>
                </div>
                <div class="infusion-submit">
                    <button class="infusion-recaptcha btn btn-dark btn-lg" id="recaptcha_dab25c35f4bb62195ef96c00bebca702" type="submit">Enviar</button>
                </div>
            </form>
          `,
            }}
          />
          <Script
            type="text/javascript"
            src="https://sn292.infusionsoft.app/app/webTracking/getTrackingCode"
          />
          <Script
            type="text/javascript"
            src="https://sn292.infusionsoft.com/resources/external/recaptcha/production/recaptcha.js?b=1.70.0.483440"
          />
          <Script
            src="https://www.google.com/recaptcha/api.js?onload=onloadInfusionRecaptchaCallback&render=explicit"
            async="async"
            defer="defer"
          />
          <Script
            type="text/javascript"
            src="https://sn292.infusionsoft.com/app/timezone/timezoneInputJs?xid=dab25c35f4bb62195ef96c00bebca702"
          />
          <Script
            type="text/javascript"
            src="https://sn292.infusionsoft.com/js/jquery/jquery-3.3.1.js"
          />
          <Script
            type="text/javascript"
            src="https://sn292.infusionsoft.app/app/webform/overwriteRefererJs"
          />
        </Fragment>
      ) : null}
    </div>
  );
};

export default ContactForm;
