import { Instagram, Facebook, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-16 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Coach A. Ramadan
            </h3>
            <p className="text-muted-foreground" >
              .حوّل جسدك وحياتك مع برامج تدريب أونلاين مخصصة تناسبك
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {["Home", "Steps", "Results", "Stories", "About", "Services", "Contact"].map((item) => {
                // ترجمة روابط الصفحة
                const labels: { [key: string]: string } = {
                  home: "الرئيسية",
                  steps: "الخطوات",
                  results: "النتائج",
                  stories: "قصص النجاح",
                  about: "عن المدرب",
                  services: "الخدمات",
                  contact: "تواصل معنا",
                };
                const key = item.toLowerCase();
                return (
                  <li key={item}>
                    <button
                      onClick={() => document.querySelector(`#${key}`)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {labels[key]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">تابعنا</h4>
            <div className="flex gap-x-4 justify-rigth">
              <a
                href="https://www.instagram.com/team.a.r?igsh=a3BhZW9pdDl3MWVh"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1B9jo2EZeJ/?mibextid=wwXIfr"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@ahmedramadan8823?si=0XxtYE6mChzvDqMz"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-smooth"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center text-muted-foreground" dir="rtl">
          <p>&copy; {new Date().getFullYear()} المدرب أحمد رمضان. جميع الحقوق محفوظة.</p>

          {/* Designed & Developed */}
          <p className="text-sm mt-4">
            تم التصميم والتطوير بواسطة <span className="font-semibold text-foreground">

              <a href="https://wa.me/+201016148495" target="_blank" rel="noopener noreferrer">
                أحمد رفعت
              </a>
            </span>
          </p>
        </div>


      </div>
    </footer>
  );
};
