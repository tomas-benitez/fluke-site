import Image from "next/image";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAppContext } from "../../../context";
import NewsletterForm from "./NewsletterForm";

const NewsletterPopup = () => {
  const { newsletterPopupVisible, setNewsletterPopupVisible } = useAppContext();

  return (
    <Offcanvas
      show={newsletterPopupVisible}
      placement="bottom"
      onHide={() => setNewsletterPopupVisible(false)}
      className="mx-auto max-w-7xl"
      style={{
        borderTopLeftRadius: "var(--bs-border-radius-lg)",
        borderTopRightRadius: "var(--bs-border-radius-lg)",
        "--bs-offcanvas-height": "80vh",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Newsletter</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ paddingLeft: 0, paddingRight: 0 }}>
        <h6
          className="text-center"
          style={{ maxWidth: "40ch", marginInline: "auto" }}
        >
          Complete el formulario para suscribirse a nuestro newsletter
        </h6>
        <div className="container max-w-3xl">
          <NewsletterForm />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NewsletterPopup;
