import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useTranslation } from "react-i18next";
import { toggleMobileMenu } from "../../state/ui_helpers/helpers.slice";
import { LogoutBtn } from "./Logout";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const MobileMenu = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.ui.isMobileMenuOpen
  );

  const openModalSignOut = () => {
    setIsOpen(true);
  };

  const closeModalSignOut = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent | ReactMouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      dispatch(toggleMobileMenu());
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.div
      ref={menuRef}
      className='absolute top-[100%] left-0 w-full bg-black pt-3 pb-3 flex items-center justify-center z-10'
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isMobileMenuOpen ? 1 : 0,
        y: isMobileMenuOpen ? 0 : -20,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <ul className='flex flex-col items-center justify-center gap-3'>
        <li>
          <Link
            className={`text-base font-normal hover:text-secondary duration-300 active:text-secondary-light
          hover:underline active:underline flex items-center justify-center gap-1`}
            to={"/"}
          >
            <HomeIcon /> {t("home")}
          </Link>
        </li>
        <li>
          <Link
            className={`text-base font-normal hover:text-secondary duration-300 active:text-secondary-light
          hover:underline active:underline flex items-center justify-center gap-1`}
            to={"/my-profile"}
          >
            <AccountCircleIcon />
            {t("header.my_profile")}
          </Link>
        </li>
        <li>
          <Link
            className={`text-base font-normal hover:text-secondary duration-300 active:text-secondary-light
            hover:underline active:underline flex items-center justify-center gap-1`}
            to={"/rating"}
          >
            <SignalCellularAltIcon />
            {t("header.rating")}
          </Link>
        </li>
        <li className='relative z-20'>
          <button
            className={`text-base font-normal bg-primary-light text-primary rounded-xl pr-2 
            pl-2 transition-colors duration-300 ease-in-out transform hover:text-primary-light hover:bg-orange-700 active:bg-orange-900`}
            onClick={openModalSignOut}
          >
            {t("header.logout")}
          </button>
          <LogoutBtn
            hidden={isOpen}
            onClose={closeModalSignOut}
          />
        </li>
      </ul>
    </motion.div>
  );
};
