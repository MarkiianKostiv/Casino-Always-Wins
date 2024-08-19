import { motion } from "framer-motion";

interface loaderProps {
  color?: string;
  width?: string;
  height?: string;
}

const spinTransition = {
  repeat: Infinity,
  ease: "easeInOut",
  duration: 1,
};

export const Loader = ({
  color = "#eee",
  width = "35",
  height = "35",
}: loaderProps) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className='relative'
    >
      <motion.span
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderColor: color,
          borderTopColor: "#2D3134",
          borderWidth: "7px",
        }}
        className='block border-solid rounded-[50%] box-border absolute top-0 left-0'
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};
