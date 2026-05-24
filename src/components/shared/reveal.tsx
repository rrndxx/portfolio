import { motion } from "motion/react"
import type { ReactNode } from "react"

interface RevealProps {
    children: ReactNode
    delay?: number
}

export function Reveal({ children, delay = 0 }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    )
}