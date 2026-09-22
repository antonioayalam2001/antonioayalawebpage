import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorSystem = ({ isMobile }) => {
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 }); // Offscreen initially

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Water Distortion Filter */}
            <svg style={{ display: "none" }}>
                <defs>
                    <filter id="water-distortion">
                        {/* fractalNoise gives a wavy/watery texture */}
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -5" in="noise" result="coloredNoise" />
                        <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="40" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* Fondo 2: Base Negra (Se coloca por debajo de la capa que se revela) */}
            <div className="pointer-events-none fixed inset-0 z-[-2] bg-cyber-black" />

            {/* Fondo 1: Capa Colorida con Distorsión de Agua (Sólo visible en el cursor) */}
            <motion.div 
                className="pointer-events-none fixed inset-0 z-[-1]"
                style={{
                    // Combinación de rosas y colores de la paleta
                    background: "linear-gradient(135deg, #FF10F0, #ff003c, #FF10F0, #00f0ff, #FF10F0)",
                    backgroundSize: "400% 400%",
                    // Efecto de distorsión de agua
                    filter: "url(#water-distortion)",
                    // Máscara que revela el fondo sólo en un círculo alrededor del cursor
                    maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.8) 0%, transparent 70%)`,
                    WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.8) 0%, transparent 70%)`,
                    opacity: 0.7
                }}
                animate={{
                    // Animar el gradiente para que el "agua" fluya
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear"
                }}
            />

            {/* Custom Cursor Ring */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 w-10 h-10 border border-cyber-pink/80 rounded-full z-[9999] mix-blend-screen shadow-[0_0_15px_rgba(255,16,240,0.4)]"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            
            {/* Custom Cursor Dot */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[9999] mix-blend-screen"
                animate={{
                    x: mousePosition.x - 3,
                    y: mousePosition.y - 3,
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
            />
        </>
    );
};

export const InteractiveEnvironment = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="relative w-full min-h-screen">
            <CursorSystem isMobile={isMobile} />
            
            {/* Main Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
