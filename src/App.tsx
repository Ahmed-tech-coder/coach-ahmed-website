import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { Products } from "./pages/Products";
import { InteractiveBackground } from "./components/BackgroundAnimation";
import { Navigation } from "./components/Navigation";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Payment } from "./pages/Payment";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1E1E2F",
            color: "#FFFFFF",
            fontWeight: 500,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            padding: "12px 16px",
            textAlign: "right",
          },
          success: {
            style: { background: "#16A34A", color: "#fff" },
          },
          error: {
            style: { background: "#DC2626", color: "#fff" },
          },
          info: {
            style: { background: "#2563EB", color: "#fff" },
          },
        }}
      />
      <Sonner
        position="top-center"
        richColors
        closeButton
        expand={true}
        duration={4000}
        visibleToasts={3}
        toastOptions={{
          classNames: {
            toast:
              "rounded-2xl border border-gray-200 shadow-xl backdrop-blur-xl0",
            title: "font-bold text-sm",
            description: "text-xs ",
            actionButton:
              "text-white rounded-xl px-3 py-1 text-xs",
            cancelButton:
              "text-black rounded-xl px-3 py-1 text-xs",
          },
        }}
      />

      <InteractiveBackground />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTopButton />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
