import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Briefcase, Trophy } from "lucide-react";
import coachImg from "@/assets/Working/m2.jpeg";
import certificate1 from "@/assets/certificate_1.jpeg";
import certificate2 from "@/assets/certificate_2.jpeg";

const credentials = [
  {
    icon: Award,
    title: "مدرب معتمد",
    description: "الأكاديمية الدولية للتدريب والتنمية - معتمد من وزارة الخارجية",
  },
  {
    icon: Briefcase,
    title: "متخصص",
    description: "تغذية علاجية وإصابات – معتمد CFT",
  },
  {
    icon: Trophy,
    title: "بطل",
    description: "أكثر من 15 بطولة، بما في ذلك بطولات دولية (Dubai Pro – الإمارات)",
  },
  {
    icon: BookOpen,
    title: "مؤلف",
    description: 'مؤلف كتاب "سر الفورمة"',
  },
];

const certificates = [certificate1, certificate2];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            تعرف على المدرب أحمد رمضان
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            شريكك في تحقيق التحولات الاستثنائية
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* Image */}
              <img
                src={coachImg}
                alt="المدرب أحمد رمضان"
                className="w-full h-full object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating achievements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-16 -right-2 bg-card p-4 rounded-xl shadow-glow border-2 border-primary"
            >
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-bold">أكثر من 15 بطولة</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6 mt-16"
          >
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                بخبرة أكثر من{" "}
                <span className="text-primary font-semibold">
                  7 سنوات في التدريب أونلاين
                </span>{" "}
                منذ 2017، ساعدت أكثر من{" "}
                <span className="text-primary font-semibold">
                  10,000 عميل حول العالم
                </span>{" "}
                على تحقيق تحولات كاملة في أجسامهم.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                كبطل كمال أجسام{" "}
                <span className="text-primary font-semibold">
                  مع فريق مستر أولمبيا – بيج رامي
                </span>{" "}
                ومؤسس{" "}
                <span className="text-primary font-semibold">
                  شركة AR للتدريب أونلاين
                </span>{" "}
                و{" "}
                <span className="text-primary font-semibold">
                  براند كرياتين AR
                </span>
                ، أقدم خبرة مثبتة ومعرفة على مستوى البطولات لكل عميل.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {credentials.map((credential, index) => {
                const Icon = credential.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.1,
                    }}
                    className="bg-card p-4 rounded-xl border border-border hover:border-primary transition-smooth hover:shadow-card"
                  >
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-bold mb-1 text-foreground">
                      {credential.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {credential.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold mb-10">الشهادات والاعتمادات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg border-2 border-border/50 hover:border-primary transition-smooth"
              >
                <img
                  src={cert}
                  alt={`شهادة ${index + 1}`}
                  className="w-full h-full object-contain p-4 bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};