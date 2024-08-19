import { Wrapper } from "../components/layout/Wrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { ratingRequest } from "../state/games/slicers/global_users_games_rating/globalRatingSlice";
import { Loader } from "../components/ui/loader";
import { useTranslation } from "react-i18next";
import { GoBackBtn } from "../components/common/GoBackBtn";

export const Rating = () => {
  const { t } = useTranslation();
  const { rating, loading, error } = useSelector(
    (state: RootState) => state.globalRating
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(ratingRequest());
  }, [dispatch]);

  return (
    <Wrapper>
      <GoBackBtn />
      <div className='w-full flex items-center justify-center flex-col mt-8'>
        <h1 className='text-4xl font-bold mb-8 text-secondary'>{t("p_r")}</h1>
        <ul className='w-[60%] flex items-center justify-center flex-col gap-4'>
          {loading ? (
            <Loader />
          ) : (
            rating?.map((item, index) => (
              <li
                className='w-full flex items-center text-[#000] justify-between p-4 bg-secondary-light rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
                key={item.username}
              >
                <span className='text-xl font-semibold text-accent'>
                  {index + 1}
                </span>
                <span className='text-2xl font-bold  underline decoration-secondary'>
                  {item.username}
                </span>
                <span className='text-xl font-semibold underline decoration-primary-dark'>
                  {item.gamesWinRating}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </Wrapper>
  );
};
