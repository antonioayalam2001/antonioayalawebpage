import styles, {layout} from "../helpers/styleTailwind.js";
import {services} from "../helpers/constants.js";
import {ServiceCard} from "./ServiceCard.jsx";

export const Services = () => {
    return (
        <section id={'Services'} className={` ${layout.section}`}>

            {/*Left section (Info part)*/}
            <div className={` ${layout.sectionInfo}`}>
                <h2 className={` ${styles.heading2}`}>Mi aportación</h2>
                <p className={` ${styles.paragraph} md:max-w-[470px] max-w-[100%] mt-6`}>
                    Desde el inicio de mi <span className="italic text-golden"> aprendizaje como un freelancer y estudiante he estado mejorando mis habilidades tanto duras como blandas, las cuales me han permitido ganar experiencia en muchas areas de interes para mi </span>
                    asi como el trabajo en equipo y la comunicación.
                    <br /><br /><br />
                    Todo el tiempo trato de mejorar en lo que realizo y siempre que tengo oportunidad analizo trabajos anteriores para aprender de mis errores y de ser posible rectificar y mejorarlos, durante mi tiempo de escuela he aprendido a interactuar con las personas y valorar a cada uno de los miembros de un equipo así como adaptarme.
                    a las diferentes situaciones que se presentan en el día a día.
                    <br /><br /><br />
                    Ofrezco una amplia variedad de servicios que incluyen: <span className="italic text-golden"> programación web, sitios web estáticos responsivos, aplicaciones react, creación y consumo de API's así como programación y enseñanza
                    en multiples lenguajes </span>, <span className="font-bold italic"> asi que aprovecha la oportunidad de conocerme y descubre que soy la persona correcta para tu proyecto... </span>
                </p>
            </div>

            {/*    Right Section (Services cards)*/}

            <div className={` ${layout.sectionImg}  flex-col justify-between ss:py-8 gap-4`}>
                {services.map((service) => (
                    <ServiceCard key={service.id} {...service}/>
                ))}
            </div>

        </section>
    );
}