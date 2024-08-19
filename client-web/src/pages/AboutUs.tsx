import bgGif from "../assets/bg-gif.gif";
import { Link } from "react-router-dom";
import rouletteImg from "../assets/roulete.png";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { GoBackBtn } from "../components/common/GoBackBtn";

export const AboutUS = () => {
  const { t } = useTranslation();
  useEffect(() => {
    localStorage.setItem("visit_token", "_");
  }, []);

  const isToken = localStorage.getItem("visit_token");

  return (
    <div
      className='before:absolute before:w-full before:h-full before:bg-[#000] before:opacity-[80%] relative flex 
  items-center justify-center min-h-[100vh] w-full pr-[10px] pl-[10px] bg-cover '
      style={{
        backgroundImage: `url(${bgGif})`,
        backgroundColor: "#000",
      }}
    >
      <div className='w-full flex items-center justify-center flex-col text-[#fff]'>
        {isToken && <GoBackBtn />}
        <div
          className={`w-[80%] rounded-lg p-[30px] text-center border border-1 border-solid border-[rgba(255,255,255,0.5)]
        backdrop-blur flex items-start justify-between gap-6`}
        >
          <div className='w-[50%] flex items-center justify-center flex-col'>
            <h1 className='font-medium text-lg'>{t("about_us.header")}</h1>
            <p className='font-normal text-base text-justify mt-3'>
              {t("about_us.p_1")}
            </p>
            <p className='font-normal text-base text-justify mt-2'>
              {t("about_us.p_2")}
            </p>
            <p className='font-normal text-base text-justify mt-2'>
              {t("about_us.p_3")}
            </p>
            <p className='font-normal text-base text-justify mt-2'>
              {t("about_us.p_4")}
            </p>
          </div>
          <div className='bg-[#fff] w-[50%] rounded-2xl'>
            <img
              src={`${rouletteImg}`}
              alt='Roulette Image'
              className='transform -scale-x-100  shadow-lg drop-shadow-[0_16px_16px_rgba(0,0,0,0.75)]'
            />
          </div>
        </div>
        <div className='z-20 mt-10'>
          <Link
            className={`flex items-center justify-center gap-2 bg-secondary rounded-2xl 
             hover:bg-secondary-light hover:text-[#000] w-[350px] h-[60px] p-1
               font-semibold text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95`}
            to={"/sign-up"}
          >
            Спробувати CasinoAW <KeyboardTabIcon fontSize='large' />
          </Link>
        </div>
      </div>
    </div>
  );
};
