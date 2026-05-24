import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    Clock,
    RefreshCcw,
    ArrowLeft,
    ShieldCheck,
    MessageCircle,
    Hash,
    Package,
    CreditCard,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const BASE_API = import.meta.env.VITE_BASE_API;

interface OrderDetails {
    status: string;
    message: string;
    order_code: string;
    payment_code: string;
    product_name: string;
    quantity: string;
    total_amount: string;
    whatsapp_url: string;
}

export const Payment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<OrderDetails | null>(null);

    const invoice_id = searchParams.get("invoice_id");
    const { user } = useAuth();

    const checkPayment = async () => {
        if (!invoice_id) return;
        setLoading(true);
        try {
            const res = await fetch(
                `${BASE_API}/user/orders/checkPayment?invoice_id=${invoice_id}`
            );
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "فشل التحقق من الدفع");

            if (data.status === "success" || data.message === "تم الدفع مسبقاً") {
                setOrderData(data);
                setPaymentStatus("paid");
            }
            else if (data.status === "unComplete") {
                setOrderData(data);
                setPaymentStatus("unpaid");
            }
            else {
                setPaymentStatus(data.status);
            }
        } catch (err: any) {
            toast.error(err.message || "حصل خطأ في التحقق من الدفع");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (invoice_id && user?.user_token) {
            checkPayment();
        }
    }, [invoice_id, user]);

    const StatusDisplay = () => {
        if (loading) return (
            <div className="flex flex-col items-center gap-4 py-8">
                <RefreshCcw className="w-12 h-12 text-primary animate-spin" />
                <p className="text-lg font-medium animate-pulse">جاري تأكيد عملية الدفع...</p>
            </div>
        );

        switch (paymentStatus) {
            case "paid":
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div className="text-center space-y-2">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-500/10">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">عملية ناجحة</h2>
                            <p className="text-muted-foreground text-sm">تم استلام المبلغ بنجاح، يرجى تأكيد الأوردر الآن</p>
                        </div>

                        {orderData && (
                            <div className="bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-3xl p-6 text-right space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-700 pb-3">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Hash className="w-3 h-3" /> رقم الطلب
                                    </span>
                                    <span className="font-mono font-bold text-sm uppercase">{orderData.order_code}</span>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                                        <Package className="w-3 h-3" /> المنتج المطلوب
                                    </span>
                                    <p className="text-sm font-bold">{orderData.product_name}</p>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <CreditCard className="w-3 h-3" /> إجمالي الدفع
                                    </span>
                                    <span className="text-xl font-black text-primary">{orderData.total_amount} جنيه</span>
                                </div>
                            </div>
                        )}


                        <div className="space-y-3 pt-2">
                            <Button
                                onClick={() => window.open(orderData?.whatsapp_url, '_blank')}
                                className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg shadow-green-500/20 text-lg font-bold group"
                            >
                                <MessageCircle className="ml-2 w-5 h-5 fill-current" />
                                تأكيد الطلب مع الكابتن
                                <ChevronRight className="mr-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>

                        </div>

                        <p className="text-[11px] text-center text-muted-foreground px-6 leading-relaxed">
                            * اضغط على زر التأكيد لإرسال بيانات الدفع للكابتن عبر واتساب لبدء شحن طلبك فوراً.
                        </p>
                    </motion.div>
                );
            case "pending":
                return (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center space-y-4 py-6"
                    >
                        <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
                            <Clock className="w-12 h-12 text-amber-600" />
                        </div>
                        <h2 className="text-2xl font-bold">بانتظار التأكيد</h2>
                        <p className="text-muted-foreground">جاري معالجة العملية من قبل البنك...</p>
                        <Button onClick={checkPayment} variant="outline" className="h-12 rounded-xl mt-4">
                            تحديث الحالة <RefreshCcw className="mr-2 w-4 h-4" />
                        </Button>
                    </motion.div>
                );
            case "failed":
                return (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center space-y-4 py-6"
                    >
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                            <XCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold">فشل الدفع</h2>
                        <p className="text-muted-foreground text-balance px-4">لم نتمكن من إتمام العملية، يرجى مراجعة رصيدك والمحاولة لاحقاً.</p>
                        <Button onClick={() => navigate("/products")} className="w-full h-12 rounded-xl mt-4 border-red-200 text-red-600" variant="outline">
                            العودة للمتجر <ArrowLeft className="mr-2 w-4 h-4" />
                        </Button>
                    </motion.div>
                );
            case "unpaid":
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-6 py-6"
                    >
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                            <CreditCard className="w-12 h-12 text-blue-600" />
                        </div>

                        <h2 className="text-2xl font-bold">لم يتم الدفع بعد</h2>

                        <p className="text-muted-foreground text-sm px-4">
                            الفاتورة تم إنشاؤها بنجاح، ولكن لم يتم إتمام عملية الدفع حتى الآن.
                        </p>

                        {/* CTA */}
                        <div className="space-y-3 pt-2">
                            <Button
                                onClick={() => window.open(orderData?.payment_url, '_blank')}
                                className="w-full h-14 rounded-2xl text-lg font-bold"
                            >
                                ادفع الآن
                            </Button>

                            <Button
                                onClick={checkPayment}
                                variant="outline"
                                className="w-full h-12 rounded-xl"
                            >
                                تحديث الحالة
                                <RefreshCcw className="mr-2 w-4 h-4" />
                            </Button>
                        </div>

                        <p className="text-[11px] text-muted-foreground px-6 leading-relaxed">
                            * بعد إتمام الدفع، اضغط على "تحديث الحالة" لتأكيد العملية.
                        </p>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#fafafa] dark:bg-zinc-950 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.07)] border border-gray-100 dark:border-zinc-800 p-8 md:p-10"
            >
                <div className="flex items-center justify-center gap-2 mb-8 opacity-40">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified Secure Payment</span>
                </div>

                {!invoice_id ? (
                    <div className="text-center py-8">
                        <XCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h1 className="text-xl font-bold">رابط غير صالح</h1>
                        <Button onClick={() => navigate("/")} variant="link" className="mt-4 text-primary">العودة للرئيسية</Button>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <StatusDisplay />
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};