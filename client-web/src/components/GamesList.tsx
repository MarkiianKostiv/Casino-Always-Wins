import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IGame } from "../interfaces/IGame";
import { GamesRow } from "./GamesRow";

interface GamesListProps {
  games?: IGame[];
}

const ITEM_HEIGHT = 50;
const MAX_VISIBLE_ITEMS = 8;

export const GamesList = ({ games: propGames }: GamesListProps) => {
  const { games: stateGames } = useSelector(
    (state: RootState) => state.userGames
  );

  const games = propGames || stateGames?.games || [];

  return (
    <List
      height={ITEM_HEIGHT * MAX_VISIBLE_ITEMS}
      itemCount={games.length}
      itemSize={ITEM_HEIGHT + 10}
      width='60%'
      className='flex flex-col gap-5 scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent 
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll'
    >
      {GamesRow}
    </List>
  );
};
