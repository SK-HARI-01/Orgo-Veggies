import { useEffect, useState } from "react";
import "./ScrollButtons.css"; // Make sure to create this CSS file

function ScrollButtons() {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButtons(window.scrollY > 50); // Show buttons only when scrolled down
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return (
        <div className={`scroll-buttons ${showButtons ? "visible" : "hidden"}`}>
            <button className="scroll-btn up" onClick={scrollToTop}>▲</button>
            <button className="scroll-btn down" onClick={scrollToBottom}>▼</button>
        </div>
    );
}

export default ScrollButtons;
