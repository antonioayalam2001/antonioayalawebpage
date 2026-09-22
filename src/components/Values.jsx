import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
    { id: "react", name: "React/Next.js", type: "Frontend" },
    { id: "astro", name: "Astro", type: "Frontend" },
    { id: "vue", name: "Vue", type: "Frontend" },
    { id: "tailwind", name: "TailwindCSS", type: "Frontend" },
    { id: "typescript", name: "TypeScript", type: "Language" },
    { id: "node", name: "Node/NestJS", type: "Backend" },
    { id: "express", name: "Express/Hapi", type: "Backend" },
    { id: "mysql", name: "MySQL", type: "Database" },
    { id: "mongodb", name: "MongoDB", type: "Database" },
    { id: "aws", name: "AWS/GCP", type: "Cloud" },
    { id: "docker", name: "Docker", type: "DevOps" },
    { id: "git", name: "Git", type: "DevOps" },
    { id: "gitlab", name: "GitLab CI/CD", type: "DevOps" },
    { id: "vitest", name: "Vitest/RTL", type: "Testing" },
];

export const Values = () => {
    const { t } = useTranslation();
    const chipsRef = useRef([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(chipsRef.current,
            { y: 20, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                },
            }
        );
    }, []);

    return (
        <section id="tech-stack" ref={sectionRef} className="py-16 relative z-10">
            <div className="mb-10">
                <h3 className="font-mono text-cyber-pink uppercase tracking-widest text-xs mb-2">{t('techStack.label')}</h3>
                <h2 className="text-2xl md:text-4xl font-bold font-sans uppercase">{t('techStack.title')}</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                    <motion.div 
                        key={tech.id}
                        ref={el => chipsRef.current[i] = el}
                        className="group flex flex-col px-5 py-3 bg-cyber-gray/50 border border-white/[0.06] hover:border-cyber-pink/40 rounded-sm transition-all duration-300 cursor-default"
                        whileHover={{ scale: 1.05, y: -2 }}
                    >
                        <span className="text-gray-500 font-mono text-[10px] uppercase mb-0.5 tracking-widest">{tech.type}</span>
                        <span className="text-white font-bold text-sm tracking-wide group-hover:text-cyber-pink transition-colors">{tech.name}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};