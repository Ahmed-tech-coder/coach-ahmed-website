import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";

/* ================= Assets ================= */

const BASE_IMGS = "https://ahmedramadancoach.com/testimonials-images";
const BASE_SOUNDS = "https://ahmedramadancoach.com/sounds";
const BASE_VIDEOS = "https://ahmedramadancoach.com/videos";


/* ================= Data ================= */
const images = [
  `${BASE_IMGS}/t-1.jpeg`,
  `${BASE_IMGS}/t-2.jpeg`,
  `${BASE_IMGS}/t-3.jpeg`,
  `${BASE_IMGS}/t-4.jpeg`,
  `${BASE_IMGS}/t-5.jpeg`,
  `${BASE_IMGS}/t-6.jpeg`,
  `${BASE_IMGS}/t-7.jpeg`,
  `${BASE_IMGS}/t-8.jpeg`,
  `${BASE_IMGS}/t-9.jpeg`,
  `${BASE_IMGS}/t-10.jpeg`,
  `${BASE_IMGS}/t-11.jpeg`,
  `${BASE_IMGS}/t-12.jpeg`,
  `${BASE_IMGS}/t-13.jpeg`,
  `${BASE_IMGS}/t-14.jpeg`,
  `${BASE_IMGS}/t-15.jpeg`,
  `${BASE_IMGS}/t-16.jpeg`,
  `${BASE_IMGS}/t-17.jpeg`,
  `${BASE_IMGS}/t-18.jpeg`,
];

const videoTestimonials = [
  `${BASE_VIDEOS}/video-1.mp4`,
  `${BASE_VIDEOS}/video-2.mp4`,
  `${BASE_VIDEOS}/video-3.mp4`,
  `${BASE_VIDEOS}/video-4.mp4`,
  `${BASE_VIDEOS}/video-5.mp4`,
  `${BASE_VIDEOS}/video-6.mp4`,
];

const voiceTestimonials = [
  `${BASE_SOUNDS}/sound-1.mp4`,
  `${BASE_SOUNDS}/sound-2.mp4`,
  `${BASE_SOUNDS}/sound-3.mp4`,
  `${BASE_SOUNDS}/sound-4.mp4`,
  `${BASE_SOUNDS}/sound-5.mp4`,
  `${BASE_SOUNDS}/sound-6.mp4`,
  `${BASE_SOUNDS}/sound-7.mp4`,
  `${BASE_SOUNDS}/sound-8.mp4`,
  `${BASE_SOUNDS}/sound-9.mp4`,
  `${BASE_SOUNDS}/sound-10.mp4`,
  `${BASE_SOUNDS}/sound-11.mp4`,
  `${BASE_SOUNDS}/sound-12.mp4`,
  `${BASE_SOUNDS}/sound-13.mp4`,
  `${BASE_SOUNDS}/sound-14.mp4`,
  `${BASE_SOUNDS}/sound-15.mp4`,
  `${BASE_SOUNDS}/sound-16.mp4`,
  `${BASE_SOUNDS}/sound-17.mp4`,
];

/* ================= Component ================= */
export const StoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [currentImage, setCurrentImage] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentSound, setCurrentSound] = useState(0);
  const [soundDirection, setSoundDirection] = useState<1 | -1>(1);
  const [isDragging, setIsDragging] = useState(false);



  const soundsPerView = 3;
  const videoRef = useRef(null);

  /* ================= Scroll Lock ================= */
  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeVideo]);

  /* ================= ESC Close ================= */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };

    if (activeVideo) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeVideo]);

  /* ================= Auto Image Slider ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((p) => (p + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* ================= Navigation ================= */
  const nextVideo = () => setCurrentVideo((p) => (p + 1) % videoTestimonials.length);
  const prevVideo = () => setCurrentVideo((p) => (p - 1 + videoTestimonials.length) % videoTestimonials.length);

  const nextSound = () => {
    if (currentSound + soundsPerView < voiceTestimonials.length) {
      setSoundDirection(1);
      setCurrentSound((p) => p + soundsPerView);
    }
  };

  const prevSound = () => {
    if (currentSound > 0) {
      setSoundDirection(-1);
      setCurrentSound((p) => p - soundsPerView);
    }
  };



  const totalSoundPages = Math.ceil(voiceTestimonials.length / soundsPerView);
  const currentSoundPage = Math.floor(currentSound / soundsPerView);

  const goToSoundPage = (page: number) => {
    setSoundDirection(page > currentSoundPage ? 1 : -1);
    setCurrentSound(page * soundsPerView);
  };
  const voiceColors = [
    "from-emerald-500/20 to-transparent",
    "from-sky-500/20 to-transparent",
    "from-purple-500/20 to-transparent",
  ];


  const arrowBtnClass = `
  hidden md:flex
  absolute top-1/2 -translate-y-1/2
  w-12 h-12
  items-center justify-center
  rounded-full
  bg-black/60 backdrop-blur
  text-white
  hover:bg-primary hover:scale-110
  transition-all duration-300
  z-20
  `;

  const voicesVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction === 1 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 1 | -1) => ({
      x: direction === 1 ? -80 : 80,
      opacity: 0,
    }),
  };



  return (
    <section id="stories" ref={ref} className="py-24 md:py-36">
      <div className="container mx-auto px-4">
        {/* ================= Heading ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            تجارب حقيقية. نتائج حقيقية.
          </h2>
        </motion.div>

        {/* ================= Image Slider ================= */}
        <div className="mb-28 flex flex-col items-center gap-6 relative">
          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrentImage((p) => (p - 1 + images.length) % images.length)
            }
            className={`${arrowBtnClass} left-4`}
          >
            <ArrowLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrentImage((p) => (p + 1) % images.length)
            }
            className={`${arrowBtnClass} right-4`}
          >
            <ArrowRight />
          </button>
          <div className="relative w-full md:w-2/3 rounded-2xl overflow-hidden shadow-xl">



            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -80) {
                    setCurrentImage((p) => (p + 1) % images.length);
                  } else if (info.offset.x > 80) {
                    setCurrentImage((p) => (p - 1 + images.length) % images.length);
                  }
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7 }}
                className="w-full h-[520px] object-contain bg-black md:cursor-default cursor-grab"
              />

            </AnimatePresence>
          </div>

          {/* Image Dots */}
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${i === currentImage ? "bg-primary scale-125" : "bg-black/30 dark:bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ================= Video Testimonials ================= */}
        <h3 className="text-2xl font-semibold mb-12 text-center">
          توثيق نجاح عملائنا
        </h3>

        <div className="flex flex-col items-center gap-6 mb-28 relative">
          <button
            onClick={prevVideo}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 rounded-full text-white"
          >
            <ArrowLeft />
          </button>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}

            onDragStart={() => setIsDragging(true)}

            onDragEnd={(e, info) => {
              if (info.offset.x < -80) nextVideo();
              if (info.offset.x > 80) prevVideo();

              setTimeout(() => setIsDragging(false), 0);
            }}

            onClick={() => {
              if (!isDragging) {
                setActiveVideo(videoTestimonials[currentVideo]);
              }
            }}

            className="relative w-full md:w-2/3 aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
          >
            <video
              src={videoTestimonials[currentVideo]}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          </motion.div>

          <button
            onClick={nextVideo}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 rounded-full text-white"
          >
            <ArrowRight />
          </button>

          {/* Mobile Dots */}
          <div className="flex gap-2">
            {videoTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentVideo(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${i === currentVideo ? "bg-primary scale-125" : "bg-black/30 dark:bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ================= Voices ================= */}

        <h3 className="text-2xl font-semibold mb-12 text-center">
          بعض آراء عملائنا
        </h3>

        <div className="max-w-6xl mx-auto relative">

          {/* Left Arrow */}
          <button
            onClick={prevSound}
            disabled={currentSound === 0}
            className={`${arrowBtnClass} left-[-100px] disabled:opacity-30`}
          >
            <ArrowLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSound}
            disabled={currentSound + soundsPerView >= voiceTestimonials.length}
            className={`${arrowBtnClass} right-[-100px] disabled:opacity-30`}
          >
            <ArrowRight />
          </button>
          {/* Cards */}
          <AnimatePresence mode="wait" custom={soundDirection}>
            <motion.div
              key={currentSoundPage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80 && currentSound + soundsPerView < voiceTestimonials.length) {
                  nextSound();
                }
                if (info.offset.x > 80 && currentSound > 0) {
                  prevSound();
                }
              }}
              custom={soundDirection}
              variants={voicesVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 cursor-grab"
            >
              {voiceTestimonials
                .slice(currentSound, currentSound + soundsPerView)
                .map((v, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    onClick={() => setActiveVideo(v)}
                    className="
            relative cursor-pointer rounded-3xl p-6
            bg-[#020617]
            border border-white/10
            shadow-xl hover:shadow-2xl
            overflow-hidden
          "
                  >
                    {/* Gradient Accent */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${voiceColors[(currentSound + i) % voiceColors.length]
                        }`}
                    />

                    <div className="relative flex items-center gap-4">
                      <span className="text-lg font-bold text-white">
                        {(currentSound + i + 1).toString().padStart(2, "0")}
                      </span>

                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>

                      <div>
                        <p className="text-white font-medium">تجربة صوتية</p>
                        <span className="text-xs text-white/60">
                          اضغط للاستماع لرأي العميل
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>


          {/* Dots */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: totalSoundPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSoundPage(i)}
                className={`
          w-3 h-3 rounded-full transition-all duration-300
          ${i === currentSoundPage
                    ? "bg-primary scale-125"
                    : "bg-black/30 dark:bg-white/30 hover:scale-110"
                  }
        `}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ================= Modal ================= */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl overflow-hidden bg-black"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="
                  absolute top-5 right-5 z-20
                  w-11 h-11 rounded-full
                  bg-black/70 backdrop-blur
                  text-white text-xl
                  hover:bg-primary hover:scale-110
                  transition-all duration-300
                "
              >
                ✕
              </button>

              <video
                ref={videoRef}
                src={activeVideo}
                autoPlay
                controls
                className="w-full rounded-3xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
