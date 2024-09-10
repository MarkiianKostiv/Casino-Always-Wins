import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className='bg-secondary-dark w-full p-4 text-white'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='mb-4 md:mb-0'>
            <h1 className='text-lg font-bold'>CasinoAW</h1>
            <ul className='list-none'>
              <li>
                <Link
                  to={"/about_us"}
                  className='hover:underline duration-300'
                >
                  {t("footer.about_us")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className='hover:underline duration-300'
                >
                  {t("footer.contact_us")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/privacy-policy"}
                  className='hover:underline duration-300'
                >
                  {t("footer.privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/terms_of_service"}
                  className='hover:underline duration-300'
                >
                  {t("footer.terms_of_service")}
                </Link>
              </li>
            </ul>
          </div>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-lg font-bold'>
              {t("footer.contact_information")}
            </h2>
            <address className='flex items-start justify-center flex-col gap-1'>
              <p>
                <a
                  href='mailto:support@example.com'
                  className='hover:text-[#e2caca] flex items-center justify-center gap-1 duration-300'
                >
                  <EmailIcon />
                  support@example.com
                </a>
              </p>
              <p>
                <a
                  href='tel:+1234567890'
                  className='hover:text-[#e2caca] flex items-center justify-center gap-1 duration-300'
                >
                  <SmartphoneIcon />
                  +1 234 567 890
                </a>
              </p>
            </address>
          </div>
          <div>
            <h2 className='text-lg font-bold'>{t("footer.follow_me")}</h2>
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-[#e2caca] flex items-center justify-center gap-1 duration-300'
              >
                <LinkedInIcon />
                Linkedin
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-[#e2caca] flex items-center justify-center gap-1 duration-300'
              >
                <TelegramIcon />
                Telegram
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-[#e2caca] flex items-center justify-center gap-1 duration-300'
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className='mt-4 text-center'>
          <p>
            &copy; {new Date().getFullYear()} Casino Always Wins.{" "}
            {t("footer.r_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};
