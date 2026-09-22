import { FiTerminal, FiArrowRight } from "react-icons/fi";
import { logoC } from '../assets';
import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const Hero = () => {
    const { t } = useTranslation();
    
    // Parallax motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalized coordinates (-1 to 1)
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Map mouse position to movement range
    const backgroundX = useTransform(mouseX, [-1, 1], [-40, 40]);
    const backgroundY = useTransform(mouseY, [-1, 1], [-40, 40]);
    
    const foregroundX = useTransform(mouseX, [-1, 1], [30, -30]);
    const foregroundY = useTransform(mouseY, [-1, 1], [30, -30]);

    return (
        <section id="home" className="relative flex md:flex-row flex-col pt-8 pb-16 min-h-[85vh] items-center">
            
            <div className="gradient-mesh"></div>
            <div className="noise-overlay"></div>

            {/* Text container */}
            <motion.div 
                className="flex-1 flex justify-center flex-col xl:px-0 sm:px-16 px-6 z-10"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                {/* Status Badge */}
                <motion.div 
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-cyber-pink/30 bg-cyber-pink/10 text-cyber-pink mb-8 w-max shadow-[0_0_20px_rgba(255,16,240,0.15)]"
                    variants={fadeUp}
                >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-pink opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-pink"></span>
                    </span>
                    <span className="font-mono text-xs tracking-wider uppercase font-bold">{t('hero.badge')}</span>
                </motion.div>

                <motion.div className="w-full" variants={fadeUp}>
                    <h1 className="text-white font-bold text-5xl sm:text-6xl md:text-7xl leading-tight mb-2 tracking-tight">
                        {t('hero.greeting')} <br/>
                        <span className="text-gradient-pink">{t('hero.name')}</span>
                    </h1>
                    <h2 className="text-cyber-light text-xl sm:text-2xl md:text-3xl font-mono mb-6 uppercase tracking-widest font-semibold cyber-border-bottom pb-4 w-max">
                        {t('hero.role')}
                    </h2>
                </motion.div>

                <motion.p 
                    className="text-gray-400 max-w-[550px] mt-2 mb-10 text-lg leading-relaxed"
                    variants={fadeUp}
                    dangerouslySetInnerHTML={{ __html: t('hero.description') }}
                />

                {/* CTA Buttons */}
                <motion.div className="flex flex-wrap gap-4 mt-2" variants={fadeUp}>
                    <motion.a 
                        href="#services" 
                        className="group relative px-8 py-4 bg-cyber-pink text-white font-bold uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(255,16,240,0.5)] flex items-center gap-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="relative z-10">{t('hero.cta_primary')}</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform z-10" />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
                    </motion.a>
                    
                    <motion.a 
                        href="mailto:antonioayalam2001@gmail.com" 
                        className="px-8 py-4 border border-cyber-pink/50 text-cyber-pink font-bold uppercase tracking-widest hover:bg-cyber-pink/10 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FiTerminal />
                        <span>{t('hero.cta_secondary')}</span>
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Visual element — Typography-led design (Bencium) */}
            <motion.div 
                className="flex-1 flex justify-center items-center md:my-0 my-10 relative z-10 hidden md:flex"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
                <div className="relative flex items-center justify-center w-full h-full">
                    {/* Oversized background initial */}
                    <motion.div 
                        className="text-[320px] leading-none font-sans font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-cyber-pink/20 to-transparent select-none"
                        style={{ x: backgroundX, y: backgroundY }}
                    >
                        A
                    </motion.div>
                    
                    {/* Monospace overlay initial */}
                    <motion.div 
                        className="absolute text-[180px] leading-none font-mono text-white/5 font-bold tracking-tighter select-none -ml-20 mt-20"
                        style={{ x: foregroundX, y: foregroundY }}
                    >
                        A
                    </motion.div>

                    {/* Vertical typography accent */}
                    <div className="absolute right-10 flex flex-col gap-2 items-center opacity-50">
                        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-cyber-pink mb-4"></div>
                        <div className="text-xs font-mono text-cyber-pink tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-rl' }}>
                            Mora Ayala
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};