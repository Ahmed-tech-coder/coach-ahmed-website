import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Tag, Target, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import coachImg from "@/assets/Working/m4.webp";

const BASE = "https://ahmedramadancoach.com/products-images";
const BASE_API = import.meta.env.VITE_BASE_API;

const productsData = [
    {
        id: 1,
        img: `${BASE}/p-1.jpeg`,
        name: "AR Creatine | 300 g | 60 Servings",
        oldPrice: "1200",
        price: "850"
    },
    {
        id: 2,
        img: `${BASE}/p-2.jpeg`,
        name: "AR Creatine | 300 g | 60 Servings + Shaker",
        oldPrice: "1350",
        price: "920"
    },
    {
        id: 3,
        img: `${BASE}/p-3.jpeg`,
        name: "AR Creatine | 300 g + 150 g | 60 + 30 Servings + Shaker",
        oldPrice: "1600",
        price: "1300"
    },
    {
        id: 4,
        img: `${BASE}/p-4.jpeg`,
        name: "AR Creatine | 150 g | 30 Servings + Shaker",
        oldPrice: "750",
        price: "520"
    },
    {
        id: 5,
        img: `${BASE}/p-5.jpeg`,
        name: "AR Creatine | 300 g | 60 Servings + Shaker + Fitness Guide Book",
        oldPrice: "550",
        price: "999"
    },
    {
        id: 6,
        img: `${BASE}/p-6.jpeg`,
        name: "AR Creatine | 150 g | 30 Servings + Shaker + Fitness Guide Book",
        oldPrice: "890",
        price: "650"
    },
    {
        id: 7,
        img: `${BASE}/p-7.jpeg`,
        name: "AR Creatine | 150 g | 30 Servings",
        oldPrice: "650",
        price: "450"
    }
];
export const Products = () => {
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState<Record<number, number>>(
        Object.fromEntries(productsData.map(p => [p.id, 1]))
    );
    const [openVideo, setOpenVideo] = useState(false);
    const videoRef = useRef<HTMLIFrameElement | null>(null);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);
    const { user } = useAuth();

    useEffect(() => {
        document.body.style.overflow = openVideo ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openVideo]);

    const handleOrder = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setLoadingId(id);

        try {
            const quantity = quantities[id];
            const token = user?.user_token;

            if (!token) {
                setLoadingId(null);
                toast.error("لازم تسجل دخول الأول");
                navigate("/login")
            }

            const formData = new FormData();
            formData.append("user_token", token);
            formData.append("product_id", id.toString());
            formData.append("quantity", quantity.toString());

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
            toast.error(err.message || "فشل في إرسال الطلب ❌");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <section className="relative overflow-hidden pt-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />

            <div className="container mx-auto px-4 relative z-10 space-y-32">
                {/* ================= STORY SECTION ================= */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white">
                            <img
                                src={coachImg}
                                alt="كابتن أحمد رمضان"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            ليه كرياتين AR مختلف؟
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            في مشواري كمدرب دولي، شفت كتير.. بس أصعب حاجة واجهتها مكنتش في
                            التمرين ولا في الدايت، كانت في{" "}
                            <span className="text-primary font-semibold">"السموم"</span> اللي
                            بنشتريها وإحنا فاكرين إنها مكملات.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            أنا كابتن أحمد رمضان، والدافع اللي خلاني أعمل AR هو خوفي على الشباب
                            اللي بيضحي بصحته وهو مش دريان. وقعت بنفسي في فخ المكملات المغشوشة
                            اللي مالية السوق.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            مواد مجهولة وشوائب بتتحط في العلب عشان تزود الوزن وتلم فلوس،
                            والنتيجة؟ ترسبات بتدمر أجهزتك الداخلية.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            عشان كده صممت{" "}
                            <span className="font-semibold text-foreground">كرياتين AR</span>{" "}
                            بضمير مدرب خايف على أبطاله قبل أي مكسب. نقاء 100% بدون ذرة شوائب،
                            ومعاه تحليل معملي يوصلك بنفسك.
                        </p>

                        <div className="bg-muted rounded-2xl p-5 border border-primary/20 shadow-inner">
                            <p className="font-semibold flex items-center gap-2 text-primary">
                                <Tag className="w-5 h-5" />
                                وعدي ليك:
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                لو مشفتش النتيجة اللي بتتمناها — فلوسك ترجعلك كاملة.
                            </p>
                        </div>

                        <p className="text-xl font-semibold pt-4">
                            صحتك أغلى من مجرد مكمل…{" "}
                            <span className="text-primary border-b-2 border-primary/30 pb-1">
                                ابدأ بنقاء، ابدأ AR.
                            </span>
                        </p>
                    </motion.div>
                </div>

                {/* ================= VIDEO SECTION ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button
                        size="lg"
                        className="gradient-primary text-white shadow-glow hover:scale-105 transition-smooth rounded-full px-12"
                        onClick={() => setOpenVideo(true)}
                    >
                        شاهد قصة AR كاملة
                        <Play className="mr-2 h-5 w-5 fill-white" />
                    </Button>
                </motion.div>

                {/* ================= PRODUCT GALLERY ================= */}
                <div>
                    <h2 className="text-4xl font-bold text-center mb-16">صور المنتجات</h2>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">


                        {productsData.map((product, i) => {
                            const quantity = quantities[product.id];

                            const increment = (id: number, e: React.MouseEvent) => {
                                e.stopPropagation();

                                setQuantities(prev => ({
                                    ...prev,
                                    [id]: prev[id] + 1
                                }));
                            };
                            const decrement = (id: number, e: React.MouseEvent) => {
                                e.stopPropagation();

                                setQuantities(prev => ({
                                    ...prev,
                                    [id]: prev[id] > 1 ? prev[id] - 1 : 1
                                }));
                            };


                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative group rounded-2xl overflow-hidden shadow-card w-[calc(100%-0.75rem)] md:w-[calc(33.333%-1.35rem)] aspect-[4/5] cursor-pointer bg-white border border-gray-100"
                                >
                                    <img
                                        src={product.img}
                                        alt="AR Creatine"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 pt-10 md:hidden">

                                        <div className="flex flex-col gap-2">

                                            {/* Product Name */}
                                            <p
                                                dir="auto"
                                                className="text-xs font-semibold text-white leading-snug line-clamp-2 [unicode-bidi:plaintext">
                                                {product.name}
                                            </p>

                                            {/* price */}
                                            <div className="flex items-center justify-between">

                                                <div>
                                                    <span className="text-[10px] text-gray-300 line-through opacity-70 block">
                                                        {product.oldPrice} EGP
                                                    </span>

                                                    <span className="text-lg font-bold text-white">
                                                        {product.price} EGP
                                                    </span>
                                                </div>

                                                <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                                    وفر {parseInt(product.oldPrice) - parseInt(product.price)}
                                                </div>

                                            </div>

                                            {/* counter */}
                                            <div className="flex items-center justify-between gap-2">

                                                <div className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden">

                                                    <button
                                                        onClick={(e) => decrement(product.id, e)}
                                                        className="w-8 h-8 flex items-center justify-center text-white font-bold active:scale-90"
                                                    >
                                                        -
                                                    </button>

                                                    <span className="px-3 text-white font-bold">
                                                        {quantity}
                                                    </span>

                                                    <button
                                                        onClick={(e) => increment(product.id, e)}
                                                        className="w-8 h-8 flex items-center justify-center text-white font-bold active:scale-90"
                                                    >
                                                        +
                                                    </button>

                                                </div>

                                                {/* order button */}
                                                <button
                                                    disabled={loadingId === product.id}
                                                    onClick={(e) => handleOrder(product.id, e)}
                                                    className="bg-primary text-black text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 active:scale-95"
                                                >
                                                    اطلب
                                                    <ArrowRight className="w-3 h-3" />
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                    <div className="hidden md:flex absolute inset-0 bg-black/80 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex-col items-center justify-center p-6 text-center">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            className="w-full space-y-4"
                                        >
                                            <div className="bg-red-500 text-white text-[12px] font-bold px-3 py-1 rounded-full inline-block">
                                                وفر {parseInt(product.oldPrice) - parseInt(product.price)} EGP
                                            </div>

                                            <div className="space-y-2">
                                                {/* Product Name */}
                                                <p
                                                    dir="auto"
                                                    className="text-sm font-semibold text-white leading-snug line-clamp-2 [unicode-bidi:plaintext">
                                                    {product.name}
                                                </p>

                                                {/* Price */}
                                                <div>
                                                    <p className="text-gray-400 line-through text-sm">
                                                        {product.oldPrice} EGP
                                                    </p>
                                                    <p className="text-4xl font-black text-white">
                                                        {product.price}{" "}
                                                        <span className="text-sm font-normal text-primary">EGP</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* --- Counter --- */}
                                            <div className="flex items-center justify-center gap-4 bg-white/10 rounded-xl p-2 border border-white/20 backdrop-blur-md w-32 mx-auto">
                                                <button
                                                    onClick={(e) => decrement(product.id, e)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-primary hover:text-black transition-colors text-white font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xl font-bold text-white min-w-[20px]">{quantity}</span>
                                                <button
                                                    onClick={(e) => increment(product.id, e)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-primary hover:text-black transition-colors text-white font-bold"
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                disabled={loadingId === product.id}
                                                onClick={(e) => handleOrder(product.id, e)}
                                                className="w-full bg-primary text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95"
                                            >
                                                اطلب الآن
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ================= CTA ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center pb-24"
                >
                    <Button
                        size="lg"
                        className="gradient-primary text-white shadow-glow hover:scale-105 transition-smooth rounded-full px-12 py-7 "
                        onClick={() => window.open('https://wa.me/+201028454284', '_blank')}

                    >
                        اطلب كرياتين AR الآن (الكمية محدودة)
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </motion.div>
            </div>

            {/* ================= VIDEO MODAL ================= */}
            <AnimatePresence>
                {openVideo && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenVideo(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 60, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60, scale: 0.94 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-black shadow-[0_40px_120px_rgba(0,0,0,0.8)] border border-white/10"
                        >
                            <button
                                onClick={() => setOpenVideo(false)}
                                className="absolute top-5 left-5 z-20 w-11 h-11 rounded-full bg-black/50 text-white text-xl hover:bg-red-500 transition-all flex items-center justify-center backdrop-blur-sm"
                            >
                                ✕
                            </button>

                            <div className="relative aspect-video">
                                <iframe
                                    ref={videoRef}
                                    src="https://drive.google.com/file/d/1-UTd8xsbS2rd6TSk-Vqr4yZzGzzpR2LQ/preview"
                                    allow="autoplay; fullscreen"
                                    className="absolute inset-0 w-full h-full border-0"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================= PAYMENT DIALOG ================= */}
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
                            <p className="text-muted-foreground mb-6">كود الطلب: <span className="font-mono text-primary">{orderData.order_code}</span></p>

                            <div className="bg-muted/50 rounded-2xl p-6 mb-8 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">المنتج:</span>
                                    <span className="font-medium truncate ml-4">{orderData.product_name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">الكمية:</span>
                                    <span className="font-medium">{orderData.quantity}</span>
                                </div>
                                <hr className="border-gray-200 dark:border-zinc-800" />
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">إجمالي المبلغ:</span>
                                    <span className="text-2xl font-black text-primary">{orderData.total_amount} EGP</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    size="lg"
                                    className="w-full py-7 text-lg font-bold rounded-2xl shadow-glow"
                                    onClick={() => {
                                        window.open(orderData.payment_url, '_blank', 'noopener,noreferrer');
                                        setShowPaymentDialog(false);
                                    }}
                                >
                                    توجه للدفع الآن
                                    <ArrowRight className="mr-2 h-5 w-5" />
                                </Button>
                                <button
                                    onClick={() => setShowPaymentDialog(false)}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    إغلاق النافذة
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};