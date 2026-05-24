import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import coachImg from "@/assets/coach-ahmed.jpeg";
import { useEffect, useRef, useState } from "react";

const coachVideo = "https://ahmedramadancoach.com/videos/intro.mp4"

export const HeroSection = () => {
  const [openVideo, setOpenVideo] = useState(false);
  const videoRef = useRef(null);

  /* ================= Scroll Lock + Auto Pause ================= */
  useEffect(() => {
    if (openVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openVideo]);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span>
                غيّر
              </span>
              <br />
              جسدك وحياتك
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-semibold text-foreground/90"
            >
              هل أنت مستعد لتصبح أفضل نسخة من نفسك؟
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 text-lg text-muted-foreground"
            >
              <li>• متضايق من جسمك الحالي؟</li>
              <li>• مش لاقي وقت للتدريب أو التغذية صح بسبب شغلك؟</li>
              <li>• محتاج خطة واضحة ومتابعة دقيقة توصل للنتيجة بسرعة؟</li>
            </motion.ul>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl font-semibold text-foreground"
            >
              انا هنا عشان نغير ده!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              مع برامج تدريبية أونلاين مصممة خصيصًا ليك اين كان شغلك دكتور، مهندس، أو محاسب، سائق هنخلي جسمك وصحتك على أعلى مستوى بدون ما تضطر تضيع وقتك.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                size="lg"
                className="gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-smooth"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ابدأ تحولك
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-smooth"
                onClick={() => setOpenVideo(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                شاهد الفيديو
              </Button>

            </motion.div>
          </motion.div>
          {/* ================= Right Image Preview ================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              onClick={() => setOpenVideo(true)}
              className="relative aspect-[1] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            >
              <img
                src={coachImg}
                alt="أحمد رمضان"
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
              />

              {/* ================= Overlay Text Animated ================= */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                {/* خلفية شفافة */}
                <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

                {/* ===== Animated Text ===== */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative text-3xl md:text-4xl font-bold text-white text-shadow-lg"
                >
                  أحمد رمضان
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative text-lg md:text-xl text-white/90 mt-2 text-shadow-md"
                >
                  اخصائي تغذية
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative text-lg md:text-xl text-white/90 text-shadow-md"
                >
                  مدرب معتمد دوليًا
                </motion.p>
              </div>
            </div>



            {/* ================= Text Below Image ================= */}
            <div className="mt-4 px-6 text-center">
              <p className="font-semibold text-lg">ضمان الثقة بينا</p>
              <p className="text-sm mt-1">
                لو التزمت ومحققتش نتيجة، هيتم استرداد فلوسك كاملة
              </p>
            </div>
          </motion.div>

        </div>
      </div>
      {/* ================= Image Modal ================= */}
      <AnimatePresence>
        {openVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center
         bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenVideo(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.94 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-black shadow-[0_40px_120px_rgba(0,0,0,0.8)] border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenVideo(false)}
                className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-black/70 backdrop-blur text-white text-xl hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                ✕
              </button>

              {/* ================= Video Modal Content ================= */}
              <video
                ref={videoRef}
                src={coachVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-[600px] object-cover rounded-2xl bg-black"
              >
                متصفحك لا يدعم تشغيل الفيديو
              </video>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
};
