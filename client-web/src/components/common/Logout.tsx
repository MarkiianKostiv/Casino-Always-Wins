import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router";
import { AppDispatch } from "../../state/store";
import { useDispatch } from "react-redux";
import { logout } from "../../state/user/userSlice";
import { useTranslation } from "react-i18next";

interface LogoutBtnProps {
  hidden: boolean;
  onClose: () => void;
}

export const LogoutBtn = ({ hidden, onClose }: LogoutBtnProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const signOut = () => {
    dispatch(logout());
    navigate("/sign-up");
  };

  return (
    <div
      className={`absolute bg-primary-light z-40 right-[30%] ${
        hidden ? "flex" : "hidden"
      } flex-col p-3 pt-1 gap-4 w-[250px]`}
    >
      <div className='flex w-full items-center justify-end'>
        <button
          className='text-[#000] hover:text-[#e24949] duration-300'
          onClick={onClose}
        >
          <ClearIcon className='w-5 h-5' />
        </button>
      </div>
      <p className='text-[#000] text-center'>{t("logout.header")}</p>
      <div className='flex items-center justify-center gap-2'>
        <button
          className={`flex items-center justify-center bg-secondary rounded-xl pt-2 pb-2 pr-3 pl-3
            hover:bg-secondary-dark active:bg-secondary-light duration-300 ease-in-out
            text-[#000]`}
          onClick={signOut}
        >
          {t("confirm")}
        </button>
        <button
          className={`flex items-center justify-center bg-primary-light rounded-xl pt-2 pb-2 pr-3 pl-3
            hover:bg-[#d53333] hover:text-[#fff] active:bg-[#f55d5d] duration-300 ease-in-out
            text-[#000]`}
          onClick={onClose}
        >
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};
