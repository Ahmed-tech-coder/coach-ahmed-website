import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ images, defaultItemsPerPage = 3 }) => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth < 600) setItemsPerPage(1);
            else if (window.innerWidth < 900) setItemsPerPage(2);
            else setItemsPerPage(defaultItemsPerPage);
        };
        updateItems();
        window.addEventListener("resize", updateItems);
        return () => window.removeEventListener("resize", updateItems);
    }, [defaultItemsPerPage]);

    const next = () => {
        setDirection(1);
        setCurrent((prev) => (prev + itemsPerPage) % images.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - itemsPerPage + images.length) % images.length);
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
    };

    const currentImages = [];
    for (let i = 0; i < itemsPerPage; i++) {
        currentImages.push(images[(current + i) % images.length]);
    }

    return (
        <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "240px" }}>
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    style={{
                        display: "flex",
                        gap: "10px",
                        position: "absolute",
                        width: "100%",
                        height: "100%", // مهم جدًا
                    }}
                >
                    {currentImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            style={{
                                width: `${100 / itemsPerPage}%`,
                                height: "100%", // مهم
                                objectFit: "cover",
                                borderRadius: "10px",
                            }}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

    );
};

export default Carousel;
