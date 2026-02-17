import { motion } from "framer-motion";

interface CoreValueItemProps {
  index: number;
  letter: string;
  title: string;
  description: string;
  isActive?: boolean;
  isRTL?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function CoreValueItem({
  index,
  letter,
  title,
  description,
  isActive = false,
  isRTL = false,
  onMouseEnter,
  onMouseLeave,
}: CoreValueItemProps) {
  const isEven = index % 2 === 0;

  // Clip Paths for arrow shapes
  const arrowRight =
    "polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)";
  const arrowLeft = "polygon(0% 50%, 20px 0%, 100% 0%, 100% 100%, 20px 100%)";

  const greyGradient = "linear-gradient(270deg, #828893 0%, #B0B4BA 100%)";
  const greenGradient = "linear-gradient(270deg, #1B7A71 0%, #16B4A6 100%)";
  const greenGradientAlt = "linear-gradient(90deg, #1B7A71 0%, #16B4A6 100%)";

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: isEven ? 50 : -50,
        },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      }}
      className="relative w-full flex items-center justify-center gap-2 md:gap-5 lg:gap-6 py-2 md:py-3 group cursor-pointer"
      dir={isRTL ? "rtl" : "ltr"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* LEFT SIDE - flex-1 with basis-0 for strict equal width */}
      <div className="flex-1 basis-0 flex justify-end items-center overflow-visible">
        {isEven ? (
          // Text on Left (Mastery, Continuous Improvement, Future Ready)
          <div
            className="font-medium leading-tight text-right flex items-center transition-all duration-700"
            style={{
              color: isActive ? "#000000" : "#555555",
              fontFamily: isRTL ? "LamaSans, sans-serif" : "inherit",
              fontSize: "clamp(11px, 1.4vw, 16px)",
              width: "clamp(100px, 30vw, 220px)",
              minHeight: "clamp(40px, 6vw, 70px)",
              paddingRight: "clamp(4px, 1vw, 12px)",
              fontWeight: isActive ? 500 : 400,
              opacity: isActive ? 1 : 0.8,
            }}
          >
            <p className="w-full">{description}</p>
          </div>
        ) : (
          // Ribbon on Left (Accountability, Confidentiality, Measured Impact)
          <div className="relative flex justify-end w-full lg:w-auto">
            {/* Shadow Image */}
            <img
              src="/images/about/shadow.png"
              alt=""
              className="absolute pointer-events-none z-0 transition-opacity duration-700 hidden md:block"
              style={{
                top: "95%",
                right: "8px",
                width: "clamp(150px, 20vw, 220px)",
                height: "auto",
                opacity: isActive ? 1 : 0.5,
              }}
            />

            <div
              className="relative text-white flex items-center z-10 transition-all duration-700 ease-in-out group-hover:scale-[1.03] origin-right"
              style={{
                background: isActive ? greenGradient : greyGradient,
                clipPath: isRTL ? arrowLeft : arrowRight,
                marginRight: "-4px",
                width: "clamp(115px, 32vw, 220px)",
                minHeight: "clamp(40px, 6vw, 50px)",
                paddingLeft: "clamp(10px, 3vw, 32px)",
                paddingRight: "clamp(16px, 4vw, 48px)",
                boxShadow: isActive
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
                  : "none",
                transform: isActive ? "scale(1.03)" : "scale(1)",
              }}
            >
              <h3
                className="font-bold uppercase tracking-wider text-left leading-tight w-full"
                style={{
                  fontSize: "clamp(9px, 1.2vw, 15px)",
                  fontFamily: isRTL ? "LamaSans, sans-serif" : "inherit",
                }}
              >
                {title}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* CENTER - CIRCLE (fixed width, always centered) */}
      <div className="relative z-20 flex-shrink-0">
        <div
          className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white font-bold text-base md:text-2xl lg:text-3xl shadow-sm transition-all duration-700"
          style={{
            background: isActive ? "#1B7A71" : "#828893",
            fontFamily: isRTL ? "LamaSans, sans-serif" : "inherit",
            transform: isActive ? "scale(1.03)" : "scale(1)",
            boxShadow: isActive ? "0 0 10px rgba(27, 122, 113, 0.25)" : "none",
          }}
        >
          {letter}
        </div>
      </div>

      {/* RIGHT SIDE - flex-1 with basis-0 for strict equal width */}
      <div className="flex-1 basis-0 flex justify-start items-center overflow-visible">
        {isEven ? (
          // Ribbon on Right (Mastery, Continuous Improvement, Future Ready)
          <div className="relative flex justify-start w-full lg:w-auto">
            {/* Shadow Image */}
            <img
              src="/images/about/shadow.png"
              alt=""
              className="absolute pointer-events-none z-0 transition-opacity duration-700 hidden md:block"
              style={{
                top: "95%",
                left: "8px",
                width: "clamp(150px, 20vw, 220px)",
                height: "auto",
                transform: "scaleX(-1)",
                opacity: isActive ? 1 : 0.5,
              }}
            />

            <div
              className="relative text-white flex items-center z-10 transition-all duration-700 ease-in-out group-hover:scale-[1.03] origin-left"
              style={{
                background: isActive ? greenGradientAlt : greyGradient,
                clipPath: isRTL ? arrowRight : arrowLeft,
                marginLeft: "-4px",
                width: "clamp(115px, 32vw, 220px)",
                minHeight: "clamp(40px, 6vw, 50px)",
                paddingLeft: "clamp(16px, 4vw, 48px)",
                paddingRight: "clamp(10px, 3vw, 32px)",
                boxShadow: isActive
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
                  : "none",
                transform: isActive ? "scale(1.03)" : "scale(1)",
              }}
            >
              <h3
                className="font-bold uppercase tracking-wider text-left leading-tight w-full"
                style={{
                  fontSize: "clamp(9px, 1.2vw, 15px)",
                  fontFamily: isRTL ? "LamaSans, sans-serif" : "inherit",
                }}
              >
                {title}
              </h3>
            </div>
          </div>
        ) : (
          // Text on Right (Accountability, Confidentiality, Measured Impact)
          <div
            className="font-medium leading-tight text-left flex items-center transition-all duration-700"
            style={{
              color: isActive ? "#000000" : "#555555",
              fontFamily: isRTL ? "LamaSans, sans-serif" : "inherit",
              fontSize: "clamp(11px, 1.4vw, 16px)",
              width: "clamp(100px, 30vw, 220px)",
              minHeight: "clamp(40px, 6vw, 70px)",
              paddingLeft: "clamp(4px, 1vw, 12px)",
              fontWeight: isActive ? 500 : 400,
              opacity: isActive ? 1 : 0.8,
            }}
          >
            <p className="w-full">{description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
