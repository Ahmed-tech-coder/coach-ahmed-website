import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { CheckCircle2, Trophy, Medal, Star, Wallet, Users, PhoneCall } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const vipPlans = [
    { id: 8, duration: "3 شهور", price: "4999", oldPrice: "9100" },
    { id: 9, duration: "6 شهور", price: "7999", oldPrice: "14500", popular: true },
    { id: 10, duration: "سنة كاملة", price: "11999", oldPrice: "21800" },
];

const ecoPlans = [
    { id: 11, duration: "3 شهور", price: "1999" },
    { id: 12, duration: "6 شهور", price: "3500" },
    { id: 13, duration: "سنة كاملة", price: "5999" },
];

const BASE_API = import.meta.env.VITE_BASE_API;

export const OffersSection = () => {
    const naviagte = useNavigate();
    const { user } = useAuth();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);

    const handlePlanOrder = async (planId: number) => {
        setLoadingId(planId);

        try {
            const token = user?.user_token;

            const formData = new FormData();
            formData.append("user_token", token);
            formData.append("product_id", planId.toString());
            formData.append("quantity", "1");

            const res = await fetch(`${BASE_API}/user/orders/createOrder`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "حصل خطأ");
            }

            setOrderData(data);
            setShowPaymentDialog(true);

            toast.success("تم إنشاء الفاتورة بنجاح");

        } catch (err: any) {
            console.error(err);

            if (err.message?.includes("غير مصرح")) {
                toast.error("يرجى تسجيل الدخول أولاً");
                naviagte("/login");
                return;
            }
            toast.error(err.message || "فشل في إنشاء الطلب");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <section id="offers" ref={ref} className="py-24 relative overflow-hidden text-gray-900 dark:text-gray-100">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.2)_0%,transparent_70%)]" />

            <div className="container mx-auto px-4 relative z-10">

                {/* ================= HEADER & ACHIEVEMENTS ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-full mb-6 animate-pulse">
                        <Trophy className="w-5 h-5" />
                        <span className="text-sm font-bold tracking-wide">احتفالاً بإنجازات كابتن أحمد رمضان 2025</span>
                    </div>

                    <h2 className="text-3xl md:text-6xl font-black mb-6 leading-tight">
                        خصم الأبطال يصل إلى <span className="text-primary underline decoration-wavy underline-offset-8">45%</span> ✨
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 dark:border-gray-700 flex items-center gap-4">
                            <div className="bg-yellow-500/20 p-3 rounded-xl"><Medal className="text-yellow-500 w-8 h-8" /></div>
                            <p className="text-right text-sm md:text-base font-medium">المركز الأول في بطولة العالم للطبيعيين بالإمارات</p>
                        </div>
                        <div className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 dark:border-gray-700 flex items-center gap-4">
                            <div className="bg-blue-500/20 p-3 rounded-xl"><Star className="text-blue-500 w-8 h-8" /></div>
                            <p className="text-right text-sm md:text-base font-medium">أفضل مدرب أونلاين محقق نتائج في عام 2025</p>
                        </div>
                    </div>
                </motion.div>

                {/* ================= VIP PLANS ================= */}
                <div className="mb-24">
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="h-[1px] w-12 bg-primary" />
                        <div className="text-3xl font-bold flex items-center gap-2 flex-col lg:flex-row">
                            <h3> باقات الـ VIP</h3>
                            <div className="flex items-center gap-2">
                                <p className="text-primary text-xl lg:text-3xl">(متابعة شخصية معي)</p>
                                <PhoneCall className="w-6 h-6 animate-bounce text-primary" />
                            </div>
                        </div>
                        <div className="h-[1px] w-12 bg-primary" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {vipPlans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="relative"
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
                                        <span className="bg-primary text-black text-xs font-black px-4 py-1 rounded-full shadow-glow">الأكثر طلباً</span>
                                    </div>
                                )}
                                <Card className={`p-8 bg-white/5 dark:bg-gray-900/50 border-2 ${plan.popular ? 'border-primary shadow-glow' : 'border-white/10 dark:border-gray-700'} rounded-3xl text-center relative overflow-hidden group transition-all`}>
                                    <p className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{plan.duration}</p>
                                    <div className="mb-6">
                                        <span className="text-gray-500 dark:text-gray-400 line-through text-lg block mb-1">{plan.oldPrice} EGP</span>
                                        <span className="text-5xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                                        <span className="text-primary font-bold mr-2">EGP</span>
                                    </div>
                                    <ul className="text-right space-y-4 mb-8 text-gray-700 dark:text-gray-300">
                                        <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> متابعة يومية شخصية مع كابتن أحمد</li>
                                        <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> مكالمة Meeting لتحديد الأهداف بدقة</li>
                                        <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> متاح زيارة للمقر للتفاصيل وجهاً لوجه</li>
                                    </ul>
                                    <Button
                                        disabled={loadingId === plan.id}
                                        onClick={() => handlePlanOrder(plan.id)}
                                        className="w-full rounded-full py-6 gradient-primary font-bold text-lg hover:scale-105 transition-transform"
                                    >
                                        {loadingId === plan.id ? "جاري التنفيذ..." : "احجز مكاني الآن"}
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ================= ECONOMY PLANS ================= */}
                <div className="mb-20">
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="h-[1px] w-12 bg-gray-600 dark:bg-gray-500" />
                        <h3 className="text-2xl font-bold flex items-center gap-2  dark:text-gray-300">
                            باقات اقتصادية <Users className="w-5 h-5" />
                        </h3>
                        <div className="h-[1px] w-12 bg-gray-600 dark:bg-gray-500" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {ecoPlans.map((plan, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.02 }}>
                                <Card className="p-6 bg-white/5 dark:bg-gray-900/50 border dark:border-gray-700 rounded-2xl text-center border-primary/50 transition-all">
                                    <p className="font-bold text-gray-400 dark:text-gray-300 mb-2">{plan.duration}</p>
                                    <p className="text-3xl font-black mb-4 text-gray-900 dark:text-white">{plan.price} <span className="text-sm">EGP</span></p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">متابعة دقيقة مع الفريق الرياضي والطبي (Team AR)</p>
                                    <Button
                                        disabled={loadingId === plan.id}
                                        onClick={() => handlePlanOrder(plan.id)}
                                        variant="outline"
                                        className="w-full rounded-full border-primary/50 text-primary hover:bg-primary hover:text-black"
                                    >
                                        {loadingId === plan.id ? "جاري التنفيذ..." : " اختيار الباقة"}
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ================= REFUND GUARANTEE ================= */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-3xl mx-auto bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 p-[1px] rounded-3xl"
                >
                    <div className="bg-gray-200 dark:bg-gray-900 p-8 rounded-3xl text-center">
                        <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                            <Wallet className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-2xl font-bold mb-3 italic dark:text-white">ضمان احترام الثقة 🤝✅</h4>
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            أنا أضمن لك النتائج 100%. لو التزمت بالخطة ولم تحقق النتائج المطلوبة،
                            <p className="text-gray-900 dark:text-white font-bold px-1">أضمن لك استرداد كامل مبلغ الاشتراك</p>
                            بدون خصم مليم واحد. ثقتك هي رأس مالي.
                        </div>
                    </div>
                </motion.div>

            </div>

            <AnimatePresence>
                {showPaymentDialog && orderData && (
                    <motion.div
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-zinc-800 text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">✓</div>
                            </div>

                            <h3 className="text-2xl font-bold mb-2">تم إنشاء الطلب بنجاح!</h3>

                            <p className="text-muted-foreground mb-6">
                                كود الطلب:{" "}
                                <span className="font-mono text-primary">
                                    {orderData.order_code}
                                </span>
                            </p>

                            <div className="bg-muted/50 rounded-2xl p-6 mb-8 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">الباقة:</span>
                                    <span className="font-medium truncate ml-4">
                                        {orderData.product_name}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">المدة:</span>
                                    <span className="font-medium">
                                        {orderData.quantity} × اشتراك
                                    </span>
                                </div>

                                <hr className="border-gray-200 dark:border-zinc-800" />

                                <div className="flex justify-between items-center">
                                    <span className="font-bold">إجمالي المبلغ:</span>
                                    <span className="text-2xl font-black text-primary">
                                        {orderData.total_amount} EGP
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    size="lg"
                                    className="w-full py-7 text-lg font-bold rounded-2xl shadow-glow"
                                    onClick={() => {
                                        window.open(orderData.payment_url, '_blank');
                                        setShowPaymentDialog(false);
                                    }}
                                >
                                    توجه للدفع الآن
                                </Button>

                                <button
                                    onClick={() => setShowPaymentDialog(false)}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};