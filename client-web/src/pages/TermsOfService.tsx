import bgGif from "../assets/bg-gif.gif";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { GoBackBtn } from "../components/common/GoBackBtn";

export const TermsOfUse = () => {
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem("visit_token", "_");
  }, []);

  const isToken = localStorage.getItem("visit_token");

  return (
    <div
      className='before:absolute before:w-full before:h-full before:bg-[#000] before:opacity-[80%] relative flex 
  items-center justify-center min-h-[100vh] w-full p-[10px] bg-cover'
      style={{
        backgroundImage: `url(${bgGif})`,
        backgroundColor: "#000",
      }}
    >
      <div className='w-full flex items-center justify-center flex-col text-[#fff]'>
        {isToken && <GoBackBtn />}
        <div
          className={`w-full sm:w-[80%] mt-4 rounded-lg p-[30px] text-center border border-1 border-solid border-[rgba(255,255,255,0.5)]
        backdrop-blur flex flex-col items-start justify-between gap-6`}
        >
          <div className='flex flex-col items-center'>
            <h1 className='font-medium text-lg'>{t("terms_of_use.header")}</h1>

            <div className='mt-3'>
              <h2 className='font-semibold text-base'>
                {t("terms_of_use.section_1.title")}
              </h2>
              <p className='font-normal text-base text-justify mt-1'>
                {t("terms_of_use.section_1.content")}
              </p>
            </div>

            <div className='mt-2'>
              <h2 className='font-semibold text-base'>
                {t("terms_of_use.section_2.title")}
              </h2>
              <p className='font-normal text-base text-justify mt-1'>
                {t("terms_of_use.section_2.content")}
              </p>
            </div>

            <div className='mt-2'>
              <h2 className='font-semibold text-base'>
                {t("terms_of_use.section_3.title")}
              </h2>
              <p className='font-normal text-base text-justify mt-1'>
                {t("terms_of_use.section_3.content")}
              </p>
            </div>

            <div className='mt-2'>
              <h2 className='font-semibold text-base'>
                {t("terms_of_use.section_4.title")}
              </h2>
              <p className='font-normal text-base text-justify mt-1'>
                {t("terms_of_use.section_4.content")}
              </p>
            </div>

            <div className='mt-2'>
              <h2 className='font-semibold text-base'>
                {t("terms_of_use.section_5.title")}
              </h2>
              <p className='font-normal text-base text-justify mt-1'>
                {t("terms_of_use.section_5.content")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
