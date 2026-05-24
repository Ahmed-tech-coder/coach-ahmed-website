import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, HeartPulse, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Dumbbell,
    title: "تدريب أونلاين شخصي",
    description: "برامج تدريب مخصصة مصممة خصيصًا لأهدافك، جدولك ومستوى لياقتك. متابعة يومية ودعم مستمر.",
    features: ["خطط تدريب مخصصة", "متابعة يومية", "تتبع التقدم", "دعم 24/7"],
  },
  {
    icon: HeartPulse,
    title: "تغذية علاجية وإعادة تأهيل الإصابات",
    description: "استشارات متخصصة للتغذية العلاجية وإعادة تأهيل الإصابات. مثالي لمن يتعافى أو يتعامل مع مشاكل صحية محددة.",
    features: ["خطط تغذية علاجية", "إعادة تأهيل الإصابات", "استشارات صحية", "بروتوكولات التعافي"],
  },
  {
    icon: ShoppingBag,
    title: "منتجات AR كرياتين للرياضة",
    description: "مكملات عالية الجودة من براند AR Creatine الخاص بنا. منتجات من الدرجة الأولى لدعم رحلتك في التحول.",
    features: ["كرياتين عالي الجودة", "ضمان الجودة", "درجة احترافية", "براند موثوق"],
  },
];


export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            خدماتنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            حلول اللياقة البدنية الشاملة المصممة خصيصًا لتلبية احتياجاتك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 h-full hover:shadow-glow transition-smooth hover:border-primary group">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-smooth shadow-glow">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-smooth">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary ml-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
