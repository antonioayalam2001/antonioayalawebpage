import { FiCode, FiLayers, FiDatabase } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const icons = [
    <FiCode size={28} className="text-cyber-pink" />,
    <FiLayers size={28} className="text-cyber-cyan" />,
    <FiDatabase size={28} className="text-cyber-green" />,
];

const glowColors = [
    "group-hover:shadow-[0_0_30px_rgba(255,16,240,0.25)] border-cyber-pink/20",
    "group-hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] border-cyber-cyan/20",
    "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.25)] border-cyber-green/20",
];

export const Services = () => {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;
        
        gsap.fromTo(cards, 
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play reverse play reverse",
                },
            }
        );

        return () => ScrollTrigger.getAll().forEach(st => st.kill());
    }, []);

    const items = t('services.items', { returnObjects: true });

    return (
        <section id="services" ref={sectionRef} className="py-20 relative z-10">
            <div className="mb-14">
                <span className="font-mono text-cyber-pink text-xs uppercase tracking-widest mb-3 block">{t('services.label')}</span>
                <h2 className="text-3xl md:text-5xl font-bold font-sans uppercase tracking-tight mb-4 flex items-center gap-4">
                    <span className="w-10 h-1 bg-cyber-pink"></span>
                    <span>{t('services.title_pre')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-cyan">{t('services.title_highlight')}</span></span>
                </h2>
                <p className="text-cyber-light font-mono text-base max-w-2xl">
                    {t('services.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((service, index) => (
                    <motion.div 
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className={`group glass-panel border p-7 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default ${glowColors[index]}`}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.06] transition-colors duration-500"></div>
                        
                        <div className="mb-5 bg-cyber-black w-14 h-14 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors relative z-10">
                            {icons[index]}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 font-sans tracking-wide relative z-10">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm relative z-10">{service.desc}</p>
                        
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-pink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};