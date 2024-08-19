import { Loader } from "./loader";
import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <main className='flex items-center justify-center bg-primary-dark h-[100vh] flex-col gap-8'>
      <motion.h1
        className='text-3xl font-bold text-secondary'
        animate={{
          color: ["#4e8074", "#c6fced", "#00ff6a"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Casino Always Wins
      </motion.h1>
      <Loader
        width='80'
        height='80'
      />
    </main>
  );
};
