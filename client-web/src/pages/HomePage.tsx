import { useTranslation } from "react-i18next";
import { ChangeLang } from "../components/common/ChangeLang";
import { Wrapper } from "../components/layout/Wrapper";
import bgImg from "../assets/background_img.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Loader } from "../components/ui/loader";
import { GamesList } from "../components/GamesList";
import { SpinningWheel } from "../components/SpinningWheel";

export const HomePage = () => {
  const { t } = useTranslation();

  const { games, loading } = useSelector((state: RootState) => state.userGames);

  return (
    <Wrapper>
      <div
        className='relative flex flex-col items-start justify-around w-full h-full p-2 md:p-8'
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 flex w-full gap-5 flex-col items-center md:items-start md:flex-row'>
          <aside className='bg-secondary-dark md:w-1/2 p-4 rounded w-full'>
            <h1 className='text-white'>{t("try_lack")}</h1>
            <p className='text-white'>{t("description")}</p>
          </aside>
          <div className='bg-secondary-dark text-black w-full md:w-1/2 p-4 rounded'>
            <SpinningWheel />
          </div>
        </div>
        <div
          className={`relative z-10 w-full mt-8 flex items-center
            justify-center`}
        >
          <div
            className={`w-[70%] flex items-center justify-center flex-col
            bg-[#5d5a5a] bg-opacity-30 backdrop-blur-sm rounded-xl z-10 pt-4 pb-4`}
          >
            <h2 className='text-white'>{t("g_h")}</h2>
            {loading ? (
              <div className='h-[400px] flex items-center justify-center'>
                <Loader
                  width='50'
                  height='50'
                />
              </div>
            ) : (
              <GamesList games={games?.games} />
            )}
          </div>
        </div>
        <div className='relative z-10 flex items-center justify-end mt-7 w-full'>
          <ChangeLang />
        </div>
      </div>
    </Wrapper>
  );
};
