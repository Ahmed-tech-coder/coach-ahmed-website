import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const WhatsAppButton = () => {
    const [showBadge, setShowBadge] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowBadge(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const phoneNumber = "+201040569515";
    const message = "السلام عليكم ورحمة الله, أريد الاستفسار عن خدماتكم.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-end font-sans">

            {/* Chat Bubble (Conditional Render) */}
            {showBadge && (
                <div className="mb-4 transition-all duration-500 ease-in-out transform scale-100 opacity-100 origin-bottom-right">
                    <div className="relative bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 max-w-[240px]">
                        <button
                            onClick={() => setShowBadge(false)}
                            className="absolute -top-2 -left-2 bg-white shadow-md rounded-full p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <IoClose size={14} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-inner">
                                    <FaWhatsapp size={20} />
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                            </div>
                            <div>
                                <p className="text-[13px] font-bold text-gray-800">فريق الدعم</p>
                                <p className="text-[11px] text-gray-500">متصل الآن - يرد خلال دقائق</p>
                            </div>
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 block text-center bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-2 rounded-xl transition-all shadow-md active:scale-95"
                        >
                            بدء المحادثة
                        </a>
                    </div>
                </div>
            )}

            {/* Floating Action */}
            <div className="group relative">

                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-[22px] shadow-xl transition-all duration-500 group-hover:rounded-full group-hover:rotate-[360deg] overflow-hidden"
                >
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>

                    <FaWhatsapp size={32} className="relative z-10 filter drop-shadow-sm" />
                </a>

                {/* Tooltip */}
                <div className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-md text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10">
                    راسلنا الآن
                </div>
            </div>

            <style jsx>{`
                @keyframes shine {
                    100% {
                        left: 125%;
                    }
                }
                .animate-shine {
                    animation: shine 0.8s;
                }
            `}</style>
        </div>
    );
};

export default WhatsAppButton;