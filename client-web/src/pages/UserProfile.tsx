import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Wrapper } from "../components/layout/Wrapper";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, ErrorMessage, Field, Form, FormikHelpers } from "formik";
import ClearIcon from "@mui/icons-material/Clear";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateRequest } from "../state/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../components/ui/loader";
import { GoBackBtn } from "../components/common/GoBackBtn";

export const UserProfile = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { games, error } = useSelector((state: RootState) => state.userGames);
  const dispatch: AppDispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const { t } = useTranslation();

  const closeOpen = () => {
    setHidden(!hidden);
  };

  const initialValues = {
    id: user?.id,
    username: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Username must be at least 5 characters")
      .max(10, "Username can't be longer than 10 characters")
      .required("Username is required"),
  });

  const submit = (
    data: { id: string | undefined; username: string },
    { resetForm }: FormikHelpers<{ id: string | undefined; username: string }>
  ) => {
    if (!data.id) {
      toast.warning("Please relogin to update username");
    } else {
      dispatch(updateRequest(data));
      resetForm();
    }
  };

  return (
    <Wrapper>
      <GoBackBtn />
      <div className='flex items-center justify-around w-full mt-8 gap-10'>
        <aside className='w-1/2 h-[200px]'>
          <h1 className='flex items-center justify-start gap-3'>
            {t("user_profile.profile")}:
            <span className='bg-secondary-light text-[#000] text-lg font-semibold pt-2 pb-2 pl-4 pr-4 rounded-xl'>
              {user?.username}
            </span>
          </h1>
          <ul
            className={`flex items-start justify-center flex-col gap-4 mt-5 bg-primary-dark p-5
               rounded-b-xl`}
          >
            <li className='w-full flex items-center justify-start gap-3'>
              {t("user_profile.username")}: {user?.username}
            </li>
            <li className='w-full flex items-center justify-start gap-3'>
              {t("user_profile.email")}: {user?.email}
            </li>
            <li className='w-full flex items-center justify-start gap-3'>
              <button
                className={`flex items-center justify-center bg-secondary rounded-xl pt-2 pb-2 pr-3 pl-3
                      hover:bg-secondary-dark active:bg-secondary-light duration-300 ease-in-out
                      text-[#000]`}
                onClick={closeOpen}
              >
                <EditIcon />
                {t("user_profile.edit_username")}
              </button>
            </li>
          </ul>
        </aside>
        <aside className='w-1/2 h-[200px]'>
          <h1 className='text-lg font-semibold pt-2 pb-2 pl-4 pr-4'>
            {t("user_profile.user_rating")}
          </h1>
          <ul
            className={`flex items-start justify-center flex-col gap-4 mt-5 bg-secondary-light text-[#000] p-5
               rounded-b-xl`}
          >
            <li className='w-full flex items-center justify-start gap-3'>
              <h3>
                {t("user_profile.wins_%")}: {games?.gamesWinRating}.
              </h3>
              <h3>
                {t("user_profile.total_games")}: {games?.gamesCount}.
              </h3>
            </li>
            <li className='w-full flex items-center justify-start gap-3'>
              <h3>
                {t("user_profile.w_games")}: {games?.gamesWinCount}.
              </h3>
              <h3>
                {t("user_profile.l_games")}: {games?.gamesLoseCount}.
              </h3>
            </li>
            <li className='w-full flex items-center justify-start gap-3'>
              <Link
                className={`flex items-center justify-center bg-secondary rounded-xl pt-2 pb-2 pr-3 pl-3
                      hover:bg-secondary-dark active:bg-secondary-light duration-300 ease-in-out
                      text-[#000]`}
                to={"/rating"}
              >
                {t("user_profile.g_rating")}
              </Link>
            </li>
          </ul>
        </aside>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-[100vh] bg-black opacity-[70%] 
          flex items-center justify-center ${hidden ? "hidden" : ""}`}
      >
        <ToastContainer className={`z-50 opacity-100`} />
        <div
          className={`w-[50%] rounded-lg p-[30px] text-center border border-1 border-solid border-[rgba(255,255,255,0.5)]
        backdrop-blur`}
        >
          <div className='w-full flex items-center justify-end pr-3'>
            <button onClick={closeOpen}>
              <ClearIcon />
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <Form className='flex flex-col'>
                <div className='relative border-b-2 border-solid border-[#ccc]'>
                  <Field
                    name='username'
                    className='w-full h-10 bg-transparent border-none outline-none text-base text-[#fff] peer'
                  />
                  <label
                    className={`absolute left-0 flex items-center justify-center text-[#fff] duration-150 ease-in-out 
                    pointer-events-none transform -translate-y-2 top-1/2 
                    peer-focus:top-2 peer-focus:-translate-y-6 ${
                      values.username ? "top-2 -translate-y-6" : ""
                    }`}
                  >
                    {t("username")}
                    <ErrorMessage
                      className={`text-red-500 ml-1 bg-[#fff] pl-1 pr-1 rounded text-base font-semibold`}
                      name='username'
                      component='span'
                    />
                  </label>
                </div>
                <button
                  className={`mt-6 text-[#fff] font-semibold pl-5 pr-5 pt-3 pb-3 rounded text-base
                    border-2 border-solid border-transparent duration-300 ease-in-out hover:border-[#fff] 
                    hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center`}
                  type='submit'
                >
                  {loading ? <Loader /> : t("confirm")}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};
