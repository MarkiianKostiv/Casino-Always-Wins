import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import SettingsIcon from "@mui/icons-material/Settings";

export const ChangeLang: React.FC = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      if (isVisible) {
        setIsRotating(true);
        setTimeout(() => {
          setIsVisible(false);
          setIsRotating(false);
        }, 300);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsRotating(false), 300);
    }
  }, [isVisible]);

  const toggleVisibility = () => {
    if (isVisible) {
      setIsRotating(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsRotating(false);
      }, 300);
    } else {
      setIsVisible(true);
      setIsRotating(true);
      setTimeout(() => setIsRotating(false), 300);
    }
  };

  return (
    <div
      className='flex items-center justify-center relative flex-col'
      onMouseEnter={() => {
        setIsVisible(true);
        setIsRotating(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 300);
      }}
    >
      <div
        ref={containerRef}
        className={`flex items-start justify-center flex-col absolute 
          bg-gray-800 bg-opacity-30 backdrop-blur-sm z-10 bottom-11 pt-2 pb-2 pr-1 pl-1 rounded-md 
          transition-all duration-300 ${
            isVisible
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <button onClick={() => changeLanguage("en")}>
          <ReactCountryFlag
            className='emojiFlag'
            countryCode='gb'
            style={{
              fontSize: "2em",
              lineHeight: "2em",
            }}
            aria-label='United Kingdom'
            svg
          />
        </button>
        <button onClick={() => changeLanguage("uk")}>
          <ReactCountryFlag
            className='emojiFlag'
            countryCode='ua'
            style={{
              fontSize: "2em",
              lineHeight: "2em",
            }}
            aria-label='Ukraine'
            svg
          />
        </button>
      </div>
      <button
        className='bg-gray-800 bg-opacity-50 z-20 p-2 rounded-b-md'
        onClick={toggleVisibility}
      >
        <SettingsIcon
          className={`text-white ${isRotating ? "animate-spin" : ""}`}
        />
      </button>
    </div>
  );
};
