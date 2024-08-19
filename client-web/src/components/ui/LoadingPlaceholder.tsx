import { motion } from "framer-motion";
interface LProps {
  width: string;
  height: string;
}

export const LoadingPlaceholder = ({ width, height }: LProps) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      style={{
        width,
        height,
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        filter: "blur(8px)",
      }}
    />
  );
};
