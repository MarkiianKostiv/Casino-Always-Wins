import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LogoutBtn } from "../common/Logout";
import { useTranslation } from "react-i18next";
import { MobileMenuBurger } from "../common/MobileMenuBurger";
import { MobileMenu } from "../common/MobileMenu";

export const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [delayHoverEnd, setDelayHoverEnd] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const renderLetters = (text: string) => {
    return text.split("").map((letter, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: isHovered ? index * 0.05 : (text.length - index) * 0.05 + 0.5,
          duration: 0.2,
        }}
        className='inline-block'
      >
        {letter}
      </motion.span>
    ));
  };

  const handleMouseEnter = () => {
    setDelayHoverEnd(false);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setDelayHoverEnd(true);
    setTimeout(() => {
      setIsHovered(false);
    }, 10);
  };

  const openModalSignOut = () => {
    setIsOpen(true);
  };

  const closeModalSignOut = () => {
    setIsOpen(false);
  };

  return (
    <header className='w-full bg-secondary flex items-center justify-between pt-3 pb-3 pr-6 pl-6 sticky top-0 z-20'>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='relative'
      >
        <Link to={"/"}>
          <h1 className='text-2xl font-semibold flex'>
            Casino{" "}
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{
                delay: isHovered ? 0 : 1.2, // Затримка перед появою AW після завершення анімації
                duration: 0.2,
              }}
              className='relative'
            >
              AW
            </motion.span>
            <motion.span
              className='absolute top-0 left-[70%] w-20 flex'
              initial={false}
              animate={isHovered || delayHoverEnd ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1 },
                hidden: {
                  opacity: 0,
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {renderLetters("Always Wins")}
            </motion.span>
          </h1>
        </Link>
      </div>
      <nav>
        <ul className='hidden items-center justify-center gap-3 md:flex'>
          <li className='flex items-center justify-center'>
            <AccountCircleIcon /> <p>{user?.username}</p>
          </li>
          <li>
            <Link to={"/my-profile"}>{t("header.my_profile")}</Link>
          </li>
          <li>
            <Link to={"/rating"}>{t("header.rating")}</Link>
          </li>
          <li className='relative'>
            <button
              className={`text-base font-normal bg-primary rounded-xl pr-2 
                pl-2 transition-colors duration-300 ease-in-out transform hover:bg-orange-700 active:bg-orange-900`}
              onClick={openModalSignOut}
            >
              {t("header.logout")}
            </button>

            <LogoutBtn
              hidden={open}
              onClose={closeModalSignOut}
            />
          </li>
        </ul>
        <div className='md:hidden'>
          <MobileMenuBurger />
        </div>
      </nav>
      <MobileMenu />
    </header>
  );
};
