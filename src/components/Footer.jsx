import { FiLinkedin, FiGithub, FiMessageCircle, FiMail } from "react-icons/fi";
import { socialMedia } from "../helpers/constants.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const iconMap = {
    FiLinkedin: <FiLinkedin size={20} />,
    FiGithub: <FiGithub size={20} />,
    FiMessageCircle: <FiMessageCircle size={20} />,
    FiMail: <FiMail size={20} />,
};

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="w-full flex flex-col md:flex-row justify-between items-center py-10 z-10 relative">
            <div className="flex flex-col mb-8 md:mb-0">
                <h2 className="font-sans font-bold text-cyber-pink text-2xl tracking-widest uppercase mb-2">Tony<span className="text-white">_Ayala</span></h2>
                <p className="text-gray-500 font-mono text-xs max-w-[310px]">
                    {t('footer.tagline')}<br />
                    © {new Date().getFullYear()} {t('footer.rights')}
                </p>
            </div>

            <div className="flex flex-row gap-4">
                {socialMedia.map((social) => (
                    <motion.a 
                        href={social.link} 
                        key={social.id}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-cyber-pink transition-colors p-2 border border-white/5 hover:border-cyber-pink/30 rounded-sm"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {iconMap[social.iconName]}
                    </motion.a>
                ))}
            </div>
        </footer>
    );
};