import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, ShoppingCart, CreditCard, Smartphone, DollarSign } from "lucide-react";
import { toast } from "sonner";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            هل أنت مستعد لبدء رحلتك؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اتخذ الخطوة الأولى نحو أن تصبح أفضل نسخة من نفسك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="w-full h-auto p-6 gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-smooth flex-col space-y-3"
              onClick={() => window.open('https://wa.me/+201040569515', '_blank')}
            >
              <MessageSquare className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">واتساب مباشر</div>
                <div className="text-sm opacity-90">تواصل مع المدرب أحمد رمضان</div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full h-auto p-6 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-smooth flex-col space-y-3"
              onClick={() => {
                const section = document.getElementById("offers");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FileText className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">التسجيل أونلاين</div>
                <div className="text-sm">املأ الاستمارة الآن</div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full h-auto p-6 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-smooth flex-col space-y-3"
              onClick={() => window.open('https://wa.me/+201040528061', '_blank')}
            >
              <ShoppingCart className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">شراء AR كرياتين</div>
                <div className="text-sm">مكملات عالية الجودة</div>
              </div>
            </Button>
          </motion.div>
        </div>

        {/* Payment Section Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-card p-8 rounded-2xl shadow-card border border-border text-center">
            <h3 className="text-2xl font-bold mb-4">الدفع الإلكتروني</h3>
            <p className="text-muted-foreground mb-6">
              سيتم قريباً دمج نظام دفع آمن عبر الإنترنت. سيكون هناك عدة طرق للدفع.
            </p>
            <div className="flex justify-center space-x-6 text-muted-foreground" dir="ltr">
              <div className="flex flex-col items-center text-sm space-y-1">
                <CreditCard className="w-6 h-6" />
                <span>بطاقة ائتمان</span>
              </div>
              <div className="flex flex-col items-center text-sm space-y-1">
                <Smartphone className="w-6 h-6" />
                <span>الدفع عبر الهاتف</span>
              </div>
              <div className="flex flex-col items-center text-sm space-y-1">
                <DollarSign className="w-6 h-6" />
                <span>التحويل البنكي</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
