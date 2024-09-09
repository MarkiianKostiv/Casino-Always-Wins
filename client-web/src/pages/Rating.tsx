import { Wrapper } from "../components/layout/Wrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { ratingRequest } from "../state/games/slicers/global_users_games_rating/globalRatingSlice";
import { Loader } from "../components/ui/loader";
import { useTranslation } from "react-i18next";
import { GoBackBtn } from "../components/common/GoBackBtn";
import { RatingRow } from "../components/RatingRow";
import { FixedSizeList as List } from "react-window";

const ITEM_HEIGHT = 50;
const MAX_VISIBLE_ITEMS = 10;

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
        {loading ? (
          <Loader />
        ) : error ? (
          <p className='text-red-500 text-xl'>{error}</p>
        ) : rating ? (
          <List
            height={ITEM_HEIGHT * MAX_VISIBLE_ITEMS}
            itemCount={rating.length}
            itemSize={ITEM_HEIGHT}
            width='80%'
          >
            {({ index, style }) => (
              <RatingRow
                index={index}
                style={style}
              />
            )}
          </List>
        ) : (
          <p>{t("rating.no_ratings")}</p>
        )}
      </div>
    </Wrapper>
  );
};
