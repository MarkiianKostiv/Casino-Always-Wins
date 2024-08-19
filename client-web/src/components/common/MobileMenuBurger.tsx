import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { toggleMobileMenu } from "../../state/ui_helpers/helpers.slice";

export const MobileMenuBurger = () => {
  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.ui.isMobileMenuOpen
  );

  const toggleMenu = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <div>
      <button
        className='p-2 rounded-lg z-30'
        onClick={toggleMenu}
      >
        <motion.div
          animate={{
            rotate: isMobileMenuOpen ? 0 : 180,
            scale: isMobileMenuOpen ? 1.2 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isMobileMenuOpen ? (
            <MenuOpenIcon fontSize='large' />
          ) : (
            <MenuIcon fontSize='large' />
          )}
        </motion.div>
      </button>
    </div>
  );
};
