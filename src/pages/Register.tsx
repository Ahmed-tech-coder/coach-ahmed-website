import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const BASE_API = import.meta.env.VITE_BASE_API;


export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // validations
        if (password !== confirmPassword) {
            toast.error("كلمات المرور غير متطابقة");
            return;
        }

        if (password.length < 6) {
            toast.error("كلمة المرور ضعيفة");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("full_name", name);
            formData.append("email", email);
            formData.append("phone_number", phone);
            formData.append("password", password);
            formData.append("confirm_password", confirmPassword);

            const response = await fetch(`${BASE_API}/user/register`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            toast.success("تم إنشاء الحساب بنجاح");

            navigate("/");

        } catch (err: any) {
            toast.error(err.message || "حدث خطأ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/15 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md sm:max-w-lg p-6 sm:p-12 mx-auto backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-5">
                        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
                            انضم إلى <span className="text-primary">أبطال AR</span>
                        </h1>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        ابدأ رحلتك الآن مع المكملات الأكثر نقاءً
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/80">الاسم الكامل</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-4 sm:top-5 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="أدخل اسمك"
                                className="w-full pl-12 pr-5 py-3 sm:py-4 rounded-2xl border border-gray-100 bg-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-lg"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/80">البريد الإلكتروني</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-4 sm:top-5 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    dir="ltr"
                                    className="w-full pl-12 pr-5 py-3 sm:py-4 rounded-2xl border border-gray-100 bg-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/80">رقم الهاتف</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-4 sm:top-5 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type="tel"
                                    placeholder="01xxxxxxxxx"
                                    dir="ltr"
                                    className="w-full pl-12 pr-5 py-3 sm:py-4 rounded-2xl border border-gray-100 bg-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-lg"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/80">كلمة المرور</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-4 sm:top-5 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    dir="ltr"
                                    className="w-full pl-12 pr-5 py-3 sm:py-4 rounded-2xl border border-gray-100 bg-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-4 sm:top-5 right-4 text-gray-400 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/80">تأكيد كلمة المرور</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-4 sm:top-5 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    dir="ltr"
                                    className="w-full pl-12 pr-5 py-3 sm:py-4 rounded-2xl border border-gray-100 bg-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-lg"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute top-4 sm:top-5 right-4 text-gray-400 hover:text-primary transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>



                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full gradient-primary text-white font-bold py-5 sm:py-6 rounded-2xl shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all text-lg sm:text-xl flex items-center justify-center gap-2 mt-4"
                    >
                        إنشاء حساب الآن
                        <ArrowLeft className="w-6 h-6" />
                    </Button>

                </form>
                {/* Login Redirect */}
                <p className="mt-6 text-center text-muted-foreground font-medium text-sm sm:text-base">
                    لديك حساب بالفعل؟{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-primary font-bold hover:underline"
                    >
                        سجل دخولك من هنا
                    </button>
                </p>

                {/* Terms */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center italic text-center text-xs sm:text-sm text-gray-400">
                    بإنشائك حساب، أنت توافق على شروط وأحكام AR Fitness
                </div>
            </motion.div>
        </section>
    );
};