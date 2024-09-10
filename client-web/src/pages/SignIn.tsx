import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import bgGif from "../assets/bg-gif.gif";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { ChangeLang } from "../components/common/ChangeLang";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../state/user/userSlice";
import { Loader } from "../components/ui/loader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const SignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);

  const handleFocus = () => {
    setIsActive(true);
    setIsFocused(true);
    controls.stop(); // Stop animation when interacting
  };

  const handleBlur = (event: any) => {
    const { value } = event.target;
    setIsFocused(false);
    if (!value) {
      setIsActive(false);
      controls.start({
        y: [0, -10, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        },
      });
    }
  };

  const handleMouseEnter = () => {
    setIsActive(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    if (!isFocused) {
      controls.start({
        y: [0, -10, 0],
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        },
      });
    }
  };

  useEffect(() => {
    if (!isActive && !isFocused) {
      controls.start({
        y: [0, -10, 0],
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        },
      });
    }
  }, [isActive, isFocused, controls]);

  const initialValues = {
    email: "",
    pass: "",
  };

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  useEffect(() => {
    if (user && accessToken && refreshToken) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = (data: { email: string; pass: string }) => {
    dispatch(loginRequest(data));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, "Email must be at least 3 characters")
      .max(20, "Email can't be longer than 20 characters")
      .required("Email is required"),
    pass: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(10, "Password can't be longer than 10 characters")
      .required("Password is required"),
  });

  return (
    <div
      className='before:absolute before:w-full before:h-full before:bg-[#000] before:opacity-[80%] relative flex 
      items-center justify-center min-h-[100vh] w-full pr-[10px] pl-[10px] bg-cover '
      style={{
        backgroundImage: `url(${bgGif})`,
        backgroundColor: "#000",
      }}
    >
      <ToastContainer
        className={`border border-1 border-solid border-[rgba(255,255,255,0.5)]
        backdrop-blur`}
      />
      <motion.div
        className={`w-[100%] sm:w-[80%] md:w-[50%] rounded-lg p-[30px] text-center border border-1 border-solid border-[rgba(255,255,255,0.5)]
        backdrop-blur`}
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form className='flex flex-col'>
              <h2 className='text-2xl mb-5 text-[#fff]'>{t("auth")}</h2>
              <div className='relative border-b-2 border-solid border-[#ccc]'>
                <Field
                  name='email'
                  className='w-full h-10 bg-transparent border-none outline-none text-base text-[#fff] peer'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <label
                  className={`absolute left-0 flex items-center justify-center text-[#fff] duration-150 ease-in-out 
                    pointer-events-none transform -translate-y-2 top-1/2 
                    peer-focus:top-2 peer-focus:-translate-y-6 ${
                      values.email ? "top-2 -translate-y-6" : ""
                    }`}
                >
                  {t("email")}
                  <ErrorMessage
                    className={`text-red-500 ml-1 bg-[#fff] pl-1 pr-1 rounded text-base font-semibold`}
                    name='email'
                    component='span'
                  />
                </label>
              </div>
              <div className='relative border-b-2 border-solid border-[#ccc] mt-5'>
                <Field
                  name='pass'
                  className='w-full h-10 bg-transparent border-none outline-none text-base text-[#fff] peer'
                  type='password'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <label
                  className={`absolute left-0 flex items-center justify-center text-[#fff] duration-150 ease-in-out 
                    pointer-events-none transform -translate-y-2 top-1/2 
                    peer-focus:top-2 peer-focus:-translate-y-6 ${
                      values.pass ? "top-2 -translate-y-6" : ""
                    }`}
                >
                  {t("password")}
                  <ErrorMessage
                    className={`text-red-500 ml-1 bg-[#fff] pl-1 pr-1 rounded text-base font-semibold`}
                    name='password'
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
                {loading ? <Loader /> : t("logIn")}
              </button>
              <div className='text-[#fff] mt-[30px] text-center'>
                <p>
                  {t("no_account")}{" "}
                  <Link
                    className='font-semibold text-base hover:underline duration-300'
                    to={"/sign-up"}
                  >
                    {t("reg")}
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
      <div className='fixed bottom-0 right-0 mr-3 mb-3'>
        <ChangeLang />
      </div>
    </div>
  );
};
