import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Heart, Utensils, Pill } from "lucide-react";

import m1 from "@/assets/Working/m1.avif";
import m2 from "@/assets/Working/m2.jpeg";
import m3 from "@/assets/Working/m3.jpg";
import m4 from "@/assets/Working/m4.webp";

const steps = [
  {
    number: "1",
    icon: Calendar,
    title: "خطة تدريب شخصية",
    description: "مصممة حسب وقتك وأهدافك",
    bgImage: m1,
  },
  {
    number: "2",
    icon: Heart,
    title: "متابعة يومية",
    description: "دعم نفسي وتحفيزي مستمر",
    bgImage: m2,
  },
  {
    number: "3",
    icon: Utensils,
    title: "تغذية علاجية",
    description: "مخصصة لجسمك مع مراعاة الإصابات إذا وجدت",
    bgImage: m3,
  },
  {
    number: "4",
    icon: Pill,
    title: "مكملات عالية الجودة",
    description: "استخدام أفضل المكملات عند الحاجة (براند كرياتين AR)",
    bgImage: m4,
  },
];


export const StepsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="steps" ref={ref} className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            خريطة طريق التحول الخاصة بك
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            عملية مثبتة خطوة بخطوة لتحقيق أهداف اللياقة البدنية الخاصة بك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div
                  className="bg-cover bg-center relative p-8 py-32 rounded-2xl shadow-card border border-border hover:border-primary transition-smooth hover:shadow-glow h-full flex flex-col justify-end"
                  style={{
                    backgroundImage: `url(${step.bgImage})`,
                  }}
                >
                  {/* overlay لتوضيح النص */}
                  <div className="absolute inset-0 bg-black/40 rounded-2xl" />

                  <div className="z-10">
                    {/* Step number badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-glow">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 pt-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-smooth">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-white text-opacity-90 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting line (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
