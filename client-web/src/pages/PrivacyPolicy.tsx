import { useTranslation } from "react-i18next";
import { GoBackBtn } from "../components/common/GoBackBtn";
export const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <main className='flex items-center justify-start text-[#fff] bg-primary w-full flex-col pt-6 pb-6 pr-5 pl-5'>
      <GoBackBtn />
      <div className='flex items-center justify-center flex-col text-center'>
        <h1 className='text-xl font-semibold'>{t("policy.title")}</h1>
        <h3 className='mt-3 text-lg font-medium'>
          {t("policy.introduction_header")}
        </h3>
        <p className='text-left text-base font-normal'>
          {t("policy.introduction")}
        </p>
        <h3 className='mt-3 text-lg font-medium'>
          {t("policy.information_header")}
        </h3>
        <p className='text-left text-base font-normal'>
          {t("policy.information")}
        </p>
        <h3 className='mt-3 text-lg font-medium'>
          {t("policy.data_security_header")}
        </h3>
        <p className='text-left text-base font-normal'>
          {t("policy.data_security")}
        </p>
        <h3 className='mt-3 text-lg font-medium'>
          {t("policy.user_awareness_header")}
        </h3>
        <p className='text-left text-base font-normal'>
          {t("policy.user_awareness")}
        </p>
        <h3 className='mt-3 text-lg font-medium'>
          {t("policy.changes_p_p_header")}
        </h3>
        <p className='text-left text-base font-normal'>
          {t("policy.changes_p_p")}
        </p>
        <h3 className='mt-3 text-lg font-medium'>
          {t("policy.contact_us_header")}
        </h3>
        <p className='text-left text-base font-normal'>
          {t("policy.contact_us")}
        </p>
      </div>
    </main>
  );
};
