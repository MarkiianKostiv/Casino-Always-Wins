import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IGame } from "../interfaces/IGame";
import { useTranslation } from "react-i18next";

interface GamesListProps {
  games?: IGame[];
}

export const GamesList = ({ games: propGames }: GamesListProps) => {
  const [visibleItems, setVisibleItems] = useState(20);
  const { t } = useTranslation();

  const { games: stateGames } = useSelector(
    (state: RootState) => state.userGames
  );

  const games = propGames || stateGames?.games || [];

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleItems((prevVisibleItems) => prevVisibleItems + 20);
          }
        },
        { threshold: 1.0 } // You might need to adjust this threshold based on when you want to trigger loading
      );

      if (node) observer.current.observe(node);
    },
    [visibleItems] // Consider adding games.length to the dependency array if needed
  );

  useEffect(() => {
    const currentObserver = observer.current;
    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, []);

  return (
    <ul
      className='text-white w-full h-[400px] flex flex-col 
      justify-start items-center gap-3 
      scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent 
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll'
    >
      {games.slice(0, visibleItems).map((item, index) => {
        if (index === visibleItems - 1) {
          return (
            <li
              ref={lastItemRef}
              key={item.id}
              className={`flex items-center text-[#000] justify-between p-3 bg-secondary-light 
                rounded-lg w-[30%]`}
            >
              {t("result")}: {item.gameResult ? t("win") : t("loss")}
            </li>
          );
        } else {
          return (
            <li
              key={item.id}
              className={`flex items-center text-[#000] justify-between p-3 bg-secondary-light 
                rounded-lg w-[30%]`}
            >
              {t("result")}: {item.gameResult ? t("win") : t("lose")}
            </li>
          );
        }
      })}
    </ul>
  );
};
