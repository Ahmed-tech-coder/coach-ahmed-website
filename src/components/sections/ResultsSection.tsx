import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, Zap, TrendingUp } from "lucide-react";

const achievements = [
  {
    icon: Dumbbell,
    title: "جسم قوي وصحي",
    description: "جسم مش بس جذاب، لكنه قوي وصحي",
  },
  {
    icon: Zap,
    title: "طاقة أعلى",
    description: "زيادة الطاقة والتركيز في العمل اليومي",
  },
  {
    icon: TrendingUp,
    title: "أداء مثالي",
    description: "تحسن حقيقي في الأداء البدني والنفسي",
  },
];


export const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="results" ref={ref} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ما سوف تحققه
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نتائج حقيقية ودائمة تعمل على تغيير كل جانب من جوانب حياتك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="mb-6 inline-flex">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-smooth shadow-glow">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: "10,000+", label: "تحولات ناجحة" },
            { value: "15+", label: "بطولات" },
            { value: "7+", label: "سنوات خبرة" },
            { value: "100%", label: "التزام كامل" },
          ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
            className="text-center p-6 bg-card rounded-xl shadow-card border border-border"
          >
            <div className="text-3xl md:text-4xl font-bold mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};
