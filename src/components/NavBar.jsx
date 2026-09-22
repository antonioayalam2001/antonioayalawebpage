import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { close, menu, mexico, us } from '../assets/';
import { navLinks } from "../helpers/constants.js";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export const NavBar = () => {
    const [toggle, setToggle] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
    };

    return (
        <motion.nav 
            className="w-full flex py-5 justify-between items-center z-[100] relative border-b border-white/5"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
                <span className="font-sans font-bold text-cyber-pink text-xl tracking-widest uppercase">Tony<span className="text-white">_Ayala</span></span>
            </a>

            {/* Desktop Nav */}
            <ul className="list-none sm:flex hidden justify-end items-center flex-1 z-50 gap-6">
                {navLinks.map((nav) => (
                    <li key={nav.id}>
                        <a 
                            href={`#${nav.id}`} 
                            className="font-mono text-xs text-gray-400 hover:text-cyber-pink transition-colors uppercase tracking-widest cursor-pointer relative group"
                        >
                            {t(nav.titleKey)}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-pink group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </li>
                ))}
                
                {/* Language toggle */}
                <li className="border-l border-white/10 pl-6">
                    <button 
                        onClick={toggleLang}
                        className="font-mono text-xs text-gray-400 hover:text-cyber-pink transition-colors border border-white/10 hover:border-cyber-pink/50 px-3 py-1.5 rounded-sm uppercase tracking-widest"
                    >
                        {t('lang.toggle')}
                    </button>
                </li>

                {/* CV Downloads */}
                <li className="flex items-center gap-3">
                    <a href="./MoraAyalaCurriculumVEs.pdf" download className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 hover:border-cyber-pink/50 rounded-sm">
                        CV <img src={mexico} alt="ES" className="w-4 h-4" />
                    </a>
                    <a href="./MoraAyalaCurriculumVEn.pdf" download className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 hover:border-cyber-pink/50 rounded-sm">
                        CV <img src={us} alt="EN" className="w-4 h-4" />
                    </a>
                </li>
            </ul>

            {/* Mobile Nav */}
            <div className="sm:hidden flex items-center gap-4 z-50">
                <button 
                    onClick={toggleLang}
                    className="font-mono text-xs text-gray-400 border border-white/10 px-2 py-1 rounded-sm"
                >
                    {t('lang.toggle')}
                </button>
                <button
                    onClick={() => setToggle((prev) => !prev)}
                    className="text-white hover:text-cyber-pink transition-colors focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {toggle ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
                
                <AnimatePresence>
                    {toggle && (
                        <motion.div 
                            className="p-6 bg-cyber-black/95 backdrop-blur-md border border-white/10 absolute top-16 right-0 mx-4 my-2 min-w-[220px] rounded-sm shadow-2xl shadow-cyber-pink/10"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ul className="flex list-none flex-col gap-5">
                                {navLinks.map((nav) => (
                                    <li key={nav.id}>
                                        <a 
                                            href={`#${nav.id}`} 
                                            onClick={() => setToggle(false)}
                                            className="font-mono text-sm text-gray-300 hover:text-cyber-pink transition-colors uppercase tracking-widest block border-b border-white/5 pb-2"
                                        >
                                            {t(nav.titleKey)}
                                        </a>
                                    </li>
                                ))}
                                <li className="flex flex-col gap-3 mt-2"> 
                                    <a href="./MoraAyalaCurriculumVEs.pdf" download className="flex justify-between items-center text-xs font-mono text-gray-400 hover:text-white border border-white/10 px-3 py-2 rounded-sm">
                                        Curriculum <img src={mexico} alt="ES" className="w-4 h-4" />
                                    </a>
                                    <a href="./MoraAyalaCurriculumVEn.pdf" download className="flex justify-between items-center text-xs font-mono text-gray-400 hover:text-white border border-white/10 px-3 py-2 rounded-sm">
                                        Resume <img src={us} alt="EN" className="w-4 h-4" />
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};