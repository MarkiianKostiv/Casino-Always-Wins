import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export const GoBackBtn = () => {
  const navigate = useNavigate();
  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.ui.isMobileMenuOpen
  );
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={
        isMobileMenuOpen
          ? "z-10"
          : "z-20" + ` flex justify-start items-center w-full`
      }
    >
      <button
        className={`text-[#fff] hover:text-[#eacbcb] duration-300 ease-in-out
            active:text-[#d2c7c7]`}
        onClick={goBack}
      >
        <ArrowBackIcon fontSize='large' />
      </button>
    </div>
  );
};
