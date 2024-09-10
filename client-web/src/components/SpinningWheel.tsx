import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { gameRequest } from "../state/games/slicers/run_game/gameSlice";
import { Loader } from "./ui/loader";
import { gsap } from "gsap";
import { userGamesRequest } from "../state/games/slicers/user_games_statistic/gamesUserSlice";
import { useTranslation } from "react-i18next";

const sections = ["Win", "Loss", "Win", "Loss", "Win", "Loss", "Win", "Loss"];
const sectionCount = sections.length;

export const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hidden, setHidden] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { game, loading } = useSelector((state: RootState) => state.game);
  const { user } = useSelector((state: RootState) => state.user);

  const spinWheel = async () => {
    setIsSpinning(true);
    gsap.killTweensOf(canvasRef.current);

    if (user) {
      dispatch(gameRequest(user?.id));
    }
  };

  const openCloseResultModal = () => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, 2000);
  };

  useEffect(() => {
    if (game && !loading) {
      const randomExtraSpins = 5 * 5 + 5; // Extra revs for effect
      const spins = randomExtraSpins * 360;

      // Setting the exact angles for Win and Loss
      let targetAngle = game.gameResult === true ? 67.5 : 22.5;

      const totalRotation = spins + targetAngle;
      gsap.set(canvasRef.current, { rotation: 0 });

      gsap.to(canvasRef.current, {
        rotation: totalRotation,
        duration: 4,
        ease: "power4.out",
        onUpdate: function () {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");

          if (ctx && canvas) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sections.forEach((section, index) => {
              const startAngle = (index * 2 * Math.PI) / sectionCount;
              const endAngle = ((index + 1) * 2 * Math.PI) / sectionCount;

              ctx.beginPath();
              ctx.moveTo(centerX, centerY);
              ctx.arc(centerX, centerY, radius, startAngle, endAngle);
              ctx.closePath();

              ctx.fillStyle = section === "Win" ? "green" : "red";
              ctx.fill();

              ctx.save();
              ctx.translate(
                centerX + (radius / 2) * Math.cos((startAngle + endAngle) / 2),
                centerY + (radius / 2) * Math.sin((startAngle + endAngle) / 2)
              );
              ctx.rotate((startAngle + endAngle) / 2 + Math.PI / 2);
              ctx.fillStyle = "white";
              ctx.font = "20px Arial";
              ctx.fillText(section, -ctx.measureText(section).width / 2, 0);
              ctx.restore();
            });

            // Rotation of the blade
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate((totalRotation * Math.PI) / 180);
            ctx.translate(-centerX, -centerY);
            ctx.restore();
          }
        },
        onComplete: () => {
          setIsSpinning(false);
          openCloseResultModal();
          if (user) {
            dispatch(userGamesRequest(user.id));
          }
        },
      });
    }
  }, [game, loading]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && canvas) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sections.forEach((section, index) => {
        const startAngle = (index * 2 * Math.PI) / sectionCount;
        const endAngle = ((index + 1) * 2 * Math.PI) / sectionCount;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = section === "Win" ? "green" : "red";
        ctx.fill();

        ctx.save();
        ctx.translate(
          centerX + (radius / 2) * Math.cos((startAngle + endAngle) / 2),
          centerY + (radius / 2) * Math.sin((startAngle + endAngle) / 2)
        );
        ctx.rotate((startAngle + endAngle) / 2 + Math.PI / 2);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(section, -ctx.measureText(section).width / 2, 0);
        ctx.restore();
      });
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='relative flex items-center justify-center flex-col'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl pointer-events-none z-20 text-primary-light'>
          ▼
        </div>
        <canvas
          ref={canvasRef}
          width='256'
          height='256'
          className='border-4 border-gray-400 rounded-full'
        />
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`p-2 rounded shadow-lg transform transition-transform duration-300 ease-in-out mt-4
          pr-6 pl-6 font-medium text-lg 
          ${
            isSpinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-secondary text-white hover:-translate-y-1 hover:shadow-xl active:translate-y-1 active:shadow-sm"
          }`}
      >
        {t("spin")}
      </button>
      <div>
        <div
          className={`fixed top-0 left-0 w-full h-[100v]
          flex items-start pt-10 justify-center ${hidden ? "hidden" : ""}`}
        >
          <div
            className={`w-[50%] rounded-lg p-[30px] text-center border border-1 border-solid border-[rgba(255,255,255,0.5)]
    backdrop-blur z-50`}
          >
            <h1 className='text-[#ffff] font-medium text-xl'>
              {`${t("spinning_wheel.you")} `}
              {loading ? (
                <Loader />
              ) : game?.gameResult ? (
                t("spinning_wheel.win")
              ) : (
                t("spinning_wheel.loss")
              )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
