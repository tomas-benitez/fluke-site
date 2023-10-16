import nodemailer from "nodemailer";

export default function sendContact(req, res) {
  const {
    firstname,
    lastname,
    email_address,
    company,
    phone,
    message,
    current_url,
  } = req.body;

  if (message.includes("http")) {
    return res.status(400).json({
      message: "Message cannot contain a link",
    });
  }

  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "flukeargentinaweb@gmail.com",
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
  });

  const receivers =
    process.env.NODE_ENV === "development"
      ? ["dev@digitalmix.ar"]
      : [
          "impnews@viditecmail.com.ar",
          "etoolsmkt@gmail.com",
          "joaquin@digitalmix.ar",
        ];

  const email = {
    from: "flukeargentinaweb@gmail.com",
    to: receivers[0],
    replyTo: email_address,
    cc: receivers.slice(1),
    subject: `Consulta fluke.com.ar - ${firstname} ${lastname}`,
    text: [
      `Nombre: ${firstname} ${lastname}`,
      `Teléfono: ${phone}`,
      `Dirección de correo electrónico: ${email_address}`,
      `Empresa: ${company}`,
      `Formulario llenado en: ${current_url}`,
      `Message:`,
      ``,
      `  ${message}`,
    ].join("\n"),
  };

  transport.sendMail(email, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        contact: {
          ...req.body,
        },
      });
    } else {
      res.status(200).json({
        success: true,
        contact: {
          ...req.body,
        },
      });
    }
  });
}
