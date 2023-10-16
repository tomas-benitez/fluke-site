import Image from "next/image";
import Script from "next/script";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "src/context";

const NewsletterForm = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return show ? (
    <Fragment>
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <form accept-charset="UTF-8" action=https://sn292.infusionsoft.com/app/form/process/d0859f0182dc5fefb122f789be11e582 class="infusion-form pb-16" id="inf_form_d0859f0182dc5fefb122f789be11e582" method="POST" target="_blank">
            <input name="inf_form_xid" type="hidden" value="d0859f0182dc5fefb122f789be11e582" />
            <input name="inf_form_name" type="hidden" value="Web Form submitted - Desde web FLUKE.com.ar" />
            <input name="infusionsoft_version" type="hidden" value="1.70.0.486160" />
            <div class="infusion-field mb-3">
                <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_FirstName">Nombre *</label>
                <input class="block form-control" id="inf_field_FirstName" name="inf_field_FirstName" placeholder="Nombre *" type="text" required />
            </div>
            <div class="infusion-field mb-3">
                <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_LastName">Apellidos *</label>
                <input class="block form-control" id="inf_field_LastName" name="inf_field_LastName" placeholder="Apellidos *" type="text" />
            </div>
            <div class="infusion-field mb-3">
                <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_Company">Empresa *</label>
                <input class="block form-control" id="inf_field_Company" name="inf_field_Company" placeholder="Empresa *" type="text" />
            </div>
            <div class="infusion-field mb-3">
                <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_custom_TelProfesional">Tel. Profesional</label>
                <input class="block form-control" id="inf_custom_TelProfesional" name="inf_custom_TelProfesional" placeholder="Tel. Profesional" type="text" />
            </div>
            <div class="infusion-field mb-3">
                <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_field_Email">Email *</label>
                <input class="block form-control" id="inf_field_Email" name="inf_field_Email" placeholder="Email *" type="text" required />
            </div>
            <div class="infusion-field mb-3">
                <label class="block mb-2 opacity-0 pointer-events-none h-1" for="inf_custom_Comentarios">Comentarios *</label>
                <input class="block form-control" id="inf_custom_Comentarios" name="inf_custom_Comentarios" placeholder="Comentarios *" type="text" />
            </div>
            <div>
                <div>&nbsp;</div>
            </div>
            <div class="infusion-submit">
                <button class="infusion-recaptcha btn btn-dark btn-lg" id="recaptcha_d0859f0182dc5fefb122f789be11e582" type="submit">Submit</button>
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
        src="https://sn292.infusionsoft.com/resources/external/recaptcha/production/recaptcha.js?b=1.70.0.486160"
      />
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onloadInfusionRecaptchaCallback&render=explicit"
        async="async"
        defer="defer"
      />
      <Script
        type="text/javascript"
        src="https://sn292.infusionsoft.com/app/timezone/timezoneInputJs?xid=d0859f0182dc5fefb122f789be11e582"
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
  ) : null;
};

export default NewsletterForm;
