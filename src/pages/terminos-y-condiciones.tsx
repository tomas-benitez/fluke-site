import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RightArrowIcon from "@/components/svg/RightArrowIcon";
import { getGlobalData, GlobalData } from "@/lib/cms";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type ToSPageProps = {
  globalData: GlobalData;
};

const ToSPage = ({ globalData }: ToSPageProps) => {
  return (
    <Layout data={globalData}>
      <Seo
        seo={{
          metaTitle: `Fluke Argentina`,
          metaDescription: `Fluke Argentina`,
        }}
      />
      <div className="container pt-6 xl:px-12">
        <Fragment>
          <Link href="/" passHref>
            <a className="mr-2 text-gray-500">Inicio</a>
          </Link>
          <RightArrowIcon className="mr-2" />
        </Fragment>
        <span>Términos y condiciones</span>
      </div>
      <div className="mx-auto mt-12 max-w-5xl rounded-xl bg-white px-24 py-16 shadow-lg">
        <Image src="/icons/tos.svg" width={108} height={138} alt="" />
        <h1 className="mb-8 text-3xl font-bold text-[#FFB400]">
          Términos y condiciones
        </h1>
        <div className="document">
          <h3>PRELIMINAR</h3>
          <p>
            Los presentes términos y condiciones regularán la utilización de la
            Plataforma Digital perteneciente a la empresa VIDITEC S.A.,
            importador y distribuidor en el territorio de la República Argentina
            de las diferentes marcas ofrecidas en la Plataforma Digital. Por
            utilización de la Plataforma Digital se entiende la navegación de
            las diferentes páginas y opciones que brinda la Plataforma Digital,
            ya sea como sitio web y/o la app y/o cualquier otra vía o canal de
            uso que VIDITEC S.A. en el futuro contemple. Estos términos y
            condiciones constituyen un acuerdo vinculante entre cada usuario a
            cualquier título y VIDITEC S.A.. Estos términos y condiciones se
            consideran aceptados por la simple utilización de la Plataforma
            Digital que VIDITEC S.A. pone a disposición de cualquier persona
            mediante acceso digital.
          </p>
          <p>
            El titular de esta Plataforma Digital es VIDITEC S.A., con domicilio
            en Humberto Primo 2889, CABA. VIDITEC S.A. pone a disposición del
            público en general el uso de su red de sitios web, aplicaciones
            informáticas, app y otros productos quienes podrán utilizarlos
            sujetos a los Términos y Condiciones siguientes:
          </p>
          <p>
            El acceso y la descarga de las aplicaciones que VIDITEC S.A. pone a
            disposición del público en general, resultan gratuitas. El simple
            acceso y la utilización del sitio o las aplicaciones o cualquier
            herramienta que VIDITEC S.A. ponga a disposición implican la
            lectura, comprensión y aceptación de todos los términos y
            condiciones.
          </p>
          <p>
            VIDITEC S.A. se reserva la facultad de realizar cambios y
            actualizaciones de los presentes Términos y Condiciones y sus anexos
            sin necesidad de previo aviso. Los eventuales cambios serán
            publicados en el sitio, en las aplicaciones y en otras herramientas
            que correspondan y se harán efectivos conforme los términos del
            apartado CUARTO del presente.
          </p>
          <p>
            Todos los Usuarios se comprometen a revisar y leer los cambios y
            condiciones, por lo que 72 horas después de publicados los cambios,
            se considerarán conocidos y aceptados por todos.
          </p>
          <h3>PRIMERO: GLOSARIO</h3>
          <p>
            Plataforma Digital: Es toda interfaz informática que la empresa
            VIDITEC S.A. pone a disposición del público general, ya sea como
            sitio web, por ejemplo{" "}
            <Link href="/">
              <a>www.fluke.com.ar</a>
            </Link>
            , aplicación para teléfono celular y/o cualquier otra interfaz
            informática accesible mediante la utilización de algún dispositivo
            de manipulación de datos informáticos.
          </p>
          <p>
            Usuario: Es todo aquel que accede al sitio o descarga la app o
            cualquier otra herramienta de todas la Plataforma Digital de VIDITEC
            S.A. y navega por la misma, sea que descargue información o no. Su
            uso es voluntario y gratuito. La sola visita y utilización del
            PORTAL implicará la condición de usuario e implica el conocimiento,
            comprensión y aceptación de las condiciones generales de uso,
            plenamente y sin reserva y en caso de que corresponda, de las
            condiciones particulares del PORTAL, que en el futuro pueden
            completarse, ser sustituidas o modificarse en algún sentido en
            relación con los servicios y contenidos del PORTAL.
          </p>
          <p>
            <em>
              CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES, LOS
              CUALES TIENEN UN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ
              ABSTENERSE DE UTILIZAR EL SITIO Y/O LOS SERVICIOS. LA SOLA
              UTILIZACIÓN DEL MISMO IMPLICA LA ACEPTACIÓN DE LOS TÉRMINOS Y
              CONDICIONES DE USO Y LAS POLÍTICAS DE PRIVACIDA DE VIDITEC S.A.
            </em>
          </p>
          <p>
            Al ingresar a cualquier Plataforma Digital de VIDITEC S.A. el
            usuario manifiesta su consentimiento para su utilización y acepta
            sus servicios y contenidos comprometiéndose a no contravenir la
            legislación vigente, la buena fe y el orden público. Las violaciones
            a estas condiciones generales de uso o a cualquiera de las
            condiciones particulares, o la omisión de actos por parte del
            usuario, que a criterio de VIDITEC S.A. constituyan conductas
            abusivas, lesivas o ilícitas generará el derecho de VIDITEC S.A. de
            denegar de manera inmediata el acceso al PORTAL y/o a la prestación
            del servicio al usuario en falta.
          </p>
          <p>
            Todo usuario acepta que queda prohibido cualquier uso del PORTAL y/o
            de cualquier Plataforma Digital de VIDITEC S.A. con fines ilícitos
            que perjudiquen o puedan dañar la utilización y normal
            funcionamiento del mismo.
          </p>
          <p>
            En todos los casos el usuario declara conocer y aceptar los términos
            y condiciones en su totalidad.
          </p>
          <h3>
            SEGUNDO: ADICIONES Y MODIFICACIONES A LOS TÉRMINOS Y CONDICIONES
          </h3>
          <p>
            VIDITEC S.A. se reserva el derecho de adicionar y/o modificar los
            Términos y Condiciones aquí acordados. VIDITEC S.A. se compromete a
            hacer públicas las adiciones y/o modificaciones en las Plataforma
            Digital como ser sitio web y/o app y/u otras herramientas que se
            utilicen. Las adiciones y/o modificaciones según corresponda
            entrarán en vigencia luego de transcurridos diez días de su
            publicación.
          </p>
          <h3>TERCERO: INFORMACIÓN. PRIVACIDAD.</h3>
          <p>
            La información relacionada con el usuario que pudiera procesarse y
            almacenarse en la Plataforma Digital de VIDITEC S.A. se encontrará
            sujeta a las Políticas de Privacidad que integran el presente y que
            se extienden en un documento aparte, el que se considera aceptado y
            leído al aceptarse los presentes Términos y Condiciones.
          </p>
          <h3>CUARTO: OBLIGACIONES DE LOS USUARIOS</h3>
          <p>
            VIDITEC S.A. administra la Plataforma Digital de su propiedad.
            VIDITEC S.A. brinda información de productos con enlaces en cada
            caso que pueden o no contener un precio de referencia. Estos enlaces
            dirigen al usuario a otras Plataformas Digitales independientes de
            VIDITEC S.A. y/o datos de empresas, asimismo, independientes de
            VIDITEC S.A. donde los usuarios podrán efectuar la compra del
            producto pertinente. VIDITEC S.A. no garantiza ni el precio ni el
            stock de los productos publicados, resultando los mismos meras
            referencias a los fines de facilitar al usuario la compra de los
            mismos.
          </p>
          <h3>QUINTO: INTEGRIDAD DE LA BASE DE DATOS</h3>
          <p>
            Se encuentra vedada la acción y/o uso de dispositivo, software, o
            cualquier otro medio tendiente a interferir tanto en las actividades
            y operatoria de VIDITEC S.A. como en las publicaciones de la
            Plataforma Digital. Cualquier intromisión, tentativa o actividad
            violatoria o contraria a las leyes sobre derecho de propiedad
            intelectual y/o a las prohibiciones estipuladas en estos Términos y
            Condiciones harán pasible a su responsable de las acciones legales
            pertinentes, y a las sanciones previstas por este acuerdo, así como,
            eventualmente, lo hará responsable de indemnizar los daños y
            perjuicios que ocasione.
          </p>
          <h3>SEXTO: FALLOS EN EL SISTEMA</h3>
          <p>
            VIDITEC S.A. no se responsabiliza por cualquier daño, perjuicio o
            pérdida causados por fallas en el sistema, en el servidor o en
            Internet. VIDITEC S.A. tampoco será responsable por cualquier virus
            que pudiera infectar el equipo del Usuario como consecuencia del
            acceso, uso o examen de su sitio web o a raíz de cualquier
            transferencia de datos, archivos, imágenes, textos, o audio
            contenidos en el mismo. Los Usuarios NO podrán imputarle
            responsabilidad alguna a VIDITEC S.A. ni exigir pago por lucro
            cesante, en virtud de perjuicios resultantes de dificultades
            técnicas o fallas en los sistemas o en Internet. VIDITEC S.A. no
            garantiza el acceso y uso continuado o ininterrumpido de su sitio.
            El sistema puede eventualmente no estar disponible debido a
            dificultades técnicas o fallas de Internet, o por cualquier otra
            circunstancia ajena a VIDITEC S.A.; en tales casos se procurará
            restablecerlo con la mayor celeridad posible sin que por ello pueda
            imputársele algún tipo de responsabilidad. VIDITEC S.A. no será
            responsable por ningún error u omisión contenidos en su sitio web.
          </p>
          <h3>SÉPTIMO: PROPIEDAD INTELECTUAL</h3>
          <p>
            El nombre, isologotipo, colores, contenidos de las pantallas
            relativas a los servicios de VIDITEC S.A. como así también los
            programas, bases de datos, redes, archivos y todo otro material de
            la Plataforma Digital de VIDITEC S.A. son de propiedad de VIDITEC
            S.A.. En este sentido toda la propiedad intelectual de VIDITEC S.A.
            está protegida por las leyes y los tratados internacionales de
            derecho de autor, marcas, patentes, modelos y diseños industriales.
            El uso indebido y la reproducción total o parcial de dichos
            contenidos quedan prohibidos, salvo autorización expresa y por
            escrito de VIDITEC S.A.. La Plataforma Digital que se pone a
            disposición puede contener enlaces a otros sitios web lo cual no
            indica que sean propiedad de VIDITEC S.A. o que sean operados por
            VIDITEC S.A.. En virtud que VIDITEC S.A. no tiene control sobre
            tales sitios, NO será responsable por los contenidos, materiales,
            acciones y/o servicios prestados por los mismos, ni por daños o
            pérdidas ocasionadas por la utilización de los mismos, sean causadas
            directa o indirectamente. La presencia de enlaces a otros sitios web
            no implica una sociedad, relación, aprobación, respaldo de VIDITEC
            S.A. a dichos sitios y sus contenidos, sino meros enlaces
            informativos.
          </p>
          <h3>OCTAVO: INDEMNIDAD</h3>
          <p>
            Los Usuarios en general se obligan a indemnizar y mantener indemne a
            VIDITEC S.A., sus filiales, empresas controladas y/o controlantes,
            directivos, administradores, representantes y empleados, por
            cualquier reclamo o demanda de otros Usuarios en general o tercero
            por sus actividades en la Plataforma Digital de VIDITEC S.A. o por
            el incumplimiento de estos Términos y Condiciones Generales o por la
            violación de cualesquiera leyes o derechos de terceros. Esta
            indemnidad abarca razonablemente todas las costas, gastos extra
            judiciales y judiciales, honorarios de profesionales, etc. que
            VIDITEC S.A. debiera contratar.
          </p>
          <h3>NOVENO: NOTIFICACIONES</h3>
          <p>
            Sin perjuicio de otros medios epistolares, los usuarios en general
            aceptan la utilización del correo electrónico para las
            comunicaciones referidas a cualquier tema respecto a la utilización
            de la Plataforma Digital a las direcciones de correo electrónico que
            los usuarios eventualmente brinden en la Plataforma Digital. VIDITEC
            S.A. recibirá comunicaciones por correo electrónico o mediante los
            canales que se publiquen en la Plataforma Digital a la dirección
            pertinente publicada en la Plataforma Digital. El domicilio legal de
            VIDITEC S.A. es Humberto Primo 2889, Ciudad Autónoma de Buenos
            Aires.
          </p>
          <h3>
            DÉCIMO: NULIDAD E INEFICACIA DE LAS CLÁUSULAS DE LOS PRESENTES
            TÉRMINOS Y CONDICIONES
          </h3>
          <p>
            Si alguna cláusula incluida en los presentes Términos y Condiciones
            y los Anexos que lo integran fuese declarada total o parcialmente,
            nula o ineficaz, tal nulidad o ineficacia tan sólo afectará a dicha
            disposición o a la parte de la misma que resulte nula o ineficaz,
            subsistiendo las presentes en todo lo demás, considerándose tal
            disposición total o parcialmente por no aplicable.
          </p>
          <h3>DÉCIMO PRIMERO: LEY APLICABLE. JURISDICCÓN.</h3>
          <p>
            Este acuerdo estará regido integralmente por la Ley vigente y
            aplicable de la República Argentina. La jurisdicción frente a
            cualquier controversia le corresponderá a los Tribunales Ordinarios
            de la Justicia Comercial de la Capital Federal de la República
            Argentina. La Plataforma Digital se encuentra diseñada para utilizar
            en la República Argentina. Su utilización fuera de la República
            Argentina implica la aceptación de la jurisdicción aquí referida.
            Los usuarios en general que utilicen la Plataforma Digital fuera del
            territorio de la República Argentina lo hacen por su propia voluntad
            y asumen la responsabilidad de respetar la legislación de la
            República Argentina, y en caso que legalmente esté prohibido
            hacerlo, se abstendrán de utilizarla.
          </p>
          <h2>POLITICAS DE PRIVACIDAD DE DATOS DE VIDITEC S.A.</h2>
          <p>
            Este ANEXO titulado POLITICA DE PRIVACIDAD DE DATOS DE VIDITEC S.A.
            forma parte de los Términos y Condiciones de uso de las Plataformas
            digitales de VIDITEC S.A..{" "}
          </p>
          <p>
            Esta Política de privacidad describe cómo se recopila, utiliza y
            comparte tu información cuando se utiliza la Plataforma Digital, y
            es aceptada por todos los Usuarios en general cuando acceden y/o
            utilizan la Plataforma Digital de VIDITEC S.A..
          </p>
          <h3>1) TIPOS DE INFORMACIÓN</h3>
          <p>
            VIDITEC S.A. recopilará los siguientes tipos de información respecto
            a cada uno de los Usuarios en general cuando la brinden en el marco
            de su acceso a la Plataforma Digital:
          </p>
          <p>
            . Información de contacto, como el nombre completo y la dirección de
            correo electrónico cuando fuera brindado.{" "}
          </p>
          <p>
            . Datos personales necesarios para la identificación del usuario
            cuando se efectúan consultas.{" "}
          </p>
          <p>
            . El contenido, las comunicaciones y otros datos que se proporcionan
            en la Plataforma Digital. Por ejemplo, al efectuar una consulta,
            compartir contenido, enviar mensajes, etc. puede incluir información
            en el contenido que se proporciona (como los metadatos) o sobre él,
            por ejemplo, la ubicación de una foto o la fecha de creación de un
            archivo.
          </p>
          <p>
            . Contenido, comunicaciones e información que otras personas
            proporcionan al usar la Plataforma Digital. Esto puede incluir
            información sobre los Usuarios, como cuando otras personas comparten
            o comentan fotografías, realizan calificaciones, evaluaciones, etc.
          </p>
          <p>
            . Comunicaciones, feedback, sugerencias e ideas que envíen los
            Usuarios en general.
          </p>
          <p>
            . Información de facturación, mensajes, etc. de VIDITEC S.A. sobre
            particularidades como temas técnicos, contables, administrativos,
            impositivos, etc.
          </p>
          <h3>2) UTILIZACIÓN DE LA INFORMACIÓN</h3>
          <p>
            VIDITEC S.A. podrá utilizar la información que contenga su
            Plataforma Digital conforme surge de sus bases de Datos.
          </p>
          <p>En este contexto VIDITEC S.A. podrá, entre otros ejemplos:</p>
          <p>Comunicarse con Usuarios en general.</p>
          <p>
            Mejorar la seguridad y protección de la Plataforma Digital, por
            ejemplo, investigando actividades sospechosas o violaciones de las
            condiciones o políticas aplicables.
          </p>
          <p>Personalizar la experiencia de los Usuarios en general.</p>
          <p>
            Desarrollar herramientas, productos o servicios nuevos en la
            Plataforma Digital.
          </p>
          <p>
            Relacionar los datos de un mismo Usuario en diferentes dispositivos
            de la Plataforma Digital para optimizar y mejorar su funcionamiento.
          </p>
          <p>Identificar y reparar errores que pueda haber.</p>
          <p>
            Realizar análisis de datos y sistemas, incluso investigaciones para
            la Plataforma Digital
          </p>
          <h3>3) DIVULGACIÓN DE LA INFORMACIÓN</h3>
          <p>
            La información de los Usuarios en general podrá ser divulgada por
            VIDITEC S.A. conforme el criterio de los objetivos de la Plataforma
            Digital. En este sentido la información puede ser divulgada en casos
            como los siguientes:
          </p>
          <p>
            A proveedores de servicios de terceros que colaboran con la
            prestación de la Plataforma Digital
          </p>
          <p>
            A aplicaciones, sitios web y/o servicios de terceros a los que los
            usuarios puedan conectarse por medio de la Plataforma Digital.
          </p>
          <p>
            Para proteger a una persona, combatir el fraude y solucionar
            problemas de seguridad o técnicos.
          </p>
          <p>
            En relación con citaciones, garantías, órdenes de presentación de
            pruebas u otras solicitudes u órdenes de las fuerzas del orden.
          </p>
          <h3>4) ENLACES Y CONTENIDOS DE TERCEROS</h3>
          <p>
            La Plataforma Digital puede incluir enlaces a contenido de terceros
            sobre los que VIDITEC S.A. no tiene control alguno. Es obligación y
            carga de cada Usuario la revisión de las políticas de privacidad de
            cada sitio web que visite.
          </p>
          <h3>5) CONSULTAS</h3>
          <p>
            La evacuación de consultas resulta una facultad exclusiva de VIDITEC
            S.A. no existiendo en ningún caso obligación de evacuarla.
          </p>
          <h3>6) INTEGRIDAD DE LOS ENLACES</h3>
          <p>
            Siendo los enlaces brindados en la Plataforma Digital de propiedad
            de terceros, VIDITEC S.A. no tiene control sobre los mismos por lo
            que no garantiza en forma alguna su integridad y funcionamiento.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    let globalDataPromise = getGlobalData();

    return {
      props: {
        globalData: await globalDataPromise,
      },
    };
  } catch (e) {
    console.error("ERROR", e);
    return { props: {} };
  }
};

export default ToSPage;
