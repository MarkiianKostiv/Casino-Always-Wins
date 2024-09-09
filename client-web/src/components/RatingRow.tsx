import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export const RatingRow = ({
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
}) => {
  const { rating } = useSelector((state: RootState) => state.globalRating);

  if (!rating) {
    return null; // or some fallback UI if necessary
  }

  const player = rating[index];

  return (
    <li
      className='w-full flex items-center text-[#000] justify-between p-4 bg-secondary-light rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
      style={style} // Important for react-window
    >
      <span className='text-xl font-semibold text-accent'>{index + 1}</span>
      <span className='text-2xl font-bold underline decoration-secondary'>
        {player.username}
      </span>
      <span className='text-xl font-semibold underline decoration-primary-dark'>
        {player.gamesWinRating}
      </span>
    </li>
  );
};
