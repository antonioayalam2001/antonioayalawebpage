import { FiBriefcase, FiBook, FiFolder } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const typeConfig = {
    work: { icon: <FiBriefcase size={18} />, color: "cyber-pink", borderColor: "border-cyber-pink/30", badgeColor: "bg-cyber-pink/15 text-cyber-pink" },
    education: { icon: <FiBook size={18} />, color: "cyber-cyan", borderColor: "border-cyber-cyan/30", badgeColor: "bg-cyber-cyan/15 text-cyber-cyan" },
    project: { icon: <FiFolder size={18} />, color: "cyber-green", borderColor: "border-cyber-green/30", badgeColor: "bg-cyber-green/15 text-cyber-green" },
};

export const Experience = () => {
    const { t } = useTranslation();
    const cardsRef = useRef([]);
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    const items = t('experience.items', { returnObjects: true });

    useEffect(() => {
        // Animate the vertical line
        gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play reverse play reverse",
                },
            }
        );

        // Individual card triggers
        cardsRef.current.forEach((card) => {
            gsap.fromTo(card,
                { x: -40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        });
    }, []);

    return (
        <section id="experience" ref={sectionRef} className="py-20 relative z-10">
            <div className="mb-14">
                <span className="font-mono text-cyber-pink text-xs uppercase tracking-widest mb-3 block">{t('experience.label')}</span>
                <h2 className="text-3xl md:text-4xl font-bold font-sans uppercase tracking-tight flex items-center gap-4">
                    <span className="w-10 h-1 bg-cyber-pink"></span>
                    <span>{t('experience.title')}</span>
                </h2>
            </div>

            <div className="relative">
                {/* Vertical timeline line */}
                <div 
                    ref={lineRef}
                    className="absolute left-5 md:left-7 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyber-pink/40 via-cyber-cyan/20 to-transparent origin-top"
                ></div>

                <div className="flex flex-col gap-8">
                    {items.map((item, index) => {
                        const config = typeConfig[item.type] || typeConfig.work;
                        return (
                            <motion.div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className={`relative pl-14 md:pl-20 group`}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-3 md:left-5 top-6 w-5 h-5 rounded-full border-2 ${config.borderColor} bg-cyber-black flex items-center justify-center z-10`}>
                                    <div className={`w-2 h-2 rounded-full bg-${config.color}`}></div>
                                </div>

                                {/* Card */}
                                <div className={`glass-panel border ${config.borderColor} p-6 rounded-sm transition-all duration-300 group-hover:border-opacity-60`}>
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className={`${config.badgeColor} font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm flex items-center gap-1.5`}>
                                            {config.icon}
                                            {item.type === 'work' ? 'Trabajo' : item.type === 'education' ? 'Educación' : 'Proyecto'}
                                        </span>
                                        <span className="font-mono text-gray-500 text-xs">{item.period}</span>
                                        {item.badge && (
                                            <span className="font-mono text-[10px] uppercase tracking-wider bg-cyber-pink/10 text-cyber-pink px-2 py-0.5 rounded-sm border border-cyber-pink/20">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-lg font-bold mb-1 tracking-wide">{item.title}</h3>
                                    <p className="text-cyber-light text-sm font-mono mb-3">{item.company}</p>
                                    
                                    {item.highlights && item.highlights.length > 0 && (
                                        <ul className="space-y-1.5">
                                            {item.highlights.map((hl, i) => (
                                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                                    <span className="text-cyber-pink mt-1.5 text-[6px]">●</span>
                                                    {hl}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};