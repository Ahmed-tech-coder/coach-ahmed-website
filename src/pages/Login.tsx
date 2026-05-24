import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { useAuth } from "@/context/AuthContext";
const BASE_API = import.meta.env.VITE_BASE_API;

export const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("phone_number", phone);
            formData.append("password", password);

            const response = await fetch(`${BASE_API}/user/login`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            console.log("SUCCESS:", data);

            if (data.user_token) {
                login(data); 
            }

            toast.success("تم تسجيل الدخول بنجاح");
            navigate("/");

        } catch (error: any) {
            console.error("ERROR:", error.message);
            alert(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/15 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md p-8 md:p-10 mx-4  backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20"
            >
                {/*  Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-foreground mb-3">
                        مرحباً <span className="text-primary">بطل AR</span>
                    </h1>
                    <p className="text-muted-foreground">سجل دخولك لمتابعة أقوى العروض</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold mr-2 text-foreground/80">رقم الهاتف</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-5 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                            <input
                                type="tel"
                                placeholder="01xxxxxxxxx"
                                dir="ltr"
                                className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100  bg-transparent  focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold mr-2 text-foreground/80">كلمة المرور</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-5 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                dir="ltr"
                                className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-100  bg-transparent  focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-5 right-4 text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full gradient-primary text-white font-bold py-7 rounded-2xl shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all text-lg group"
                    >
                        {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                        <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </form>


                <div className="mt-8 space-y-4">
                    <p className="text-center text-muted-foreground">
                        ليس لديك حساب؟{" "}
                        <button

                            onClick={() => navigate("/register")}
                            className="text-primary font-bold hover:underline">
                            إنشاء حساب بطل جديد
                        </button>
                    </p>

                    <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-400">جميع الحقوق محفوظة لـ AR Creatine</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};