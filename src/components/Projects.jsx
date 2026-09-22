import { FiLock, FiTerminal } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
    const { t } = useTranslation();
    const terminalRef = useRef(null);
    const linesRef = useRef([]);

    useEffect(() => {
        gsap.fromTo(terminalRef.current,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: terminalRef.current,
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                },
            }
        );

        // Typewriter-like stagger for terminal lines
        gsap.fromTo(linesRef.current,
            { opacity: 0, x: -10 },
            {
                opacity: 1,
                x: 0,
                duration: 0.3,
                stagger: 0.2,
                delay: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: terminalRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);

    return (
        <section id="projects" className="py-20 relative z-10">
            <div className="mb-12">
                <h2 className="text-2xl md:text-4xl font-bold font-sans uppercase flex items-center gap-3">
                    <FiTerminal className="text-cyber-pink" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-white">{t('projects.title')}</span>
                </h2>
            </div>

            {/* Featured Project: Recallio */}
            <motion.div 
                className="w-full max-w-4xl mx-auto mb-16 bg-cyber-black border border-cyber-pink/20 rounded-sm p-6 md:p-10 shadow-[0_0_20px_rgba(255,16,240,0.05)] hover:border-cyber-pink/50 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="flex-1">
                        <h3 className="text-3xl font-bold font-sans text-white mb-2">{t('projects.recallio.title')}</h3>
                        <p className="text-cyber-pink font-mono text-sm mb-6 uppercase tracking-wider">{t('projects.recallio.subtitle')}</p>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">{t('projects.recallio.desc')}</p>
                        
                        <div className="mb-6 p-4 bg-cyber-pink/5 border-l-2 border-cyber-pink">
                            <span className="block text-white font-bold mb-1 text-sm">Challenge:</span>
                            <p className="text-gray-400 text-sm">{t('projects.recallio.challenge')}</p>
                        </div>
                    </div>

                    <div className="flex-1 lg:border-l lg:border-white/10 lg:pl-8">
                        <h4 className="text-white font-bold mb-4 font-mono text-sm tracking-widest uppercase cyber-border-bottom pb-2 inline-block">
                            {t('projects.recallio.arch_title')}
                        </h4>
                        <ul className="space-y-3 mb-8">
                            {(t('projects.recallio.arch', { returnObjects: true }) || []).map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-cyber-pink mt-1">▹</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h4 className="text-white font-bold mb-4 font-mono text-sm tracking-widest uppercase cyber-border-bottom pb-2 inline-block">
                            {t('projects.recallio.stack_title')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {(t('projects.recallio.stack', { returnObjects: true }) || []).map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-gray-300 rounded-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                ref={terminalRef}
                className="w-full max-w-4xl mx-auto bg-cyber-black border border-cyber-pink/20 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(255,16,240,0.08)]"
                whileHover={{ borderColor: "rgba(255,16,240,0.4)" }}
                transition={{ duration: 0.3 }}
            >
                {/* Terminal Header */}
                <div className="bg-[#0a0a0a] px-4 py-2.5 border-b border-cyber-pink/20 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyber-pink/70"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-cyber-green/70"></div>
                    <span className="ml-4 font-mono text-[10px] text-gray-600 uppercase tracking-wider">{t('projects.terminal_user')}</span>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-10 font-mono text-sm">
                    <div ref={el => linesRef.current[0] = el} className="text-cyber-green mb-2">{t('projects.cmd')}</div>
                    <div className="text-gray-300 mb-6 flex flex-col gap-1.5">
                        <span ref={el => linesRef.current[1] = el}>{t('projects.log_1')}</span>
                        <span ref={el => linesRef.current[2] = el}>{t('projects.log_2')}</span>
                        <span ref={el => linesRef.current[3] = el} className="text-cyber-pink">{t('projects.log_warn')}</span>
                    </div>

                    <motion.div 
                        ref={el => linesRef.current[4] = el}
                        className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-700/50 bg-white/[0.01] rounded-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <FiLock className="text-cyber-pink text-3xl mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2 font-sans tracking-wide">{t('projects.nda_title')}</h3>
                        <p className="text-gray-400 text-center max-w-md text-sm">
                            {t('projects.nda_desc')}
                        </p>
                    </motion.div>

                    <div className="mt-6 flex items-center gap-2">
                        <span className="text-cyber-green">$</span>
                        <span className="text-gray-300 border-r-2 border-cyber-pink animate-pulse">_</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
