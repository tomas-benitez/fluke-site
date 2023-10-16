import Image from "next/image";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAppContext } from "../../../context";
import ContactForm from "./ContactForm";

const ContactPopup = () => {
  const {
    contactPopupState: { visible, message },
    setContactPopupState,
  } = useAppContext();

  return (
    <Offcanvas
      show={visible}
      placement="bottom"
      onHide={() => {
        setContactPopupState({ visible: false });
      }}
      className="mx-auto max-w-7xl"
      style={{
        borderTopLeftRadius: "var(--bs-border-radius-lg)",
        borderTopRightRadius: "var(--bs-border-radius-lg)",
        "--bs-offcanvas-height": "80vh",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Contacto</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ paddingLeft: 0, paddingRight: 0 }}>
        <h6
          className="text-center"
          style={{ maxWidth: "40ch", marginInline: "auto" }}
        >
          Complete el formulario y un especialista se contactará con usted a la
          brevedad
        </h6>
        <div className="container max-w-3xl">
          <ContactForm message={message} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ContactPopup;
