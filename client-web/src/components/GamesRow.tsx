import { useTranslation } from "react-i18next";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

export const GamesRow = ({
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
}) => {
  const { t } = useTranslation();
  const { games: stateGames } = useSelector(
    (state: RootState) => state.userGames
  );

  const games = stateGames?.games || [];
  const item = games[index];
  return (
    <li
      className={`flex items-center text-[#000] justify-between p-3 bg-secondary-light 
        rounded-lg md:w-[30%] w-[45%]`}
      style={style}
    >
      {t("result")}: {item.gameResult ? t("win") : t("loss")}
    </li>
  );
};
