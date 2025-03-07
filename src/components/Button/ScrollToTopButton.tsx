import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // スクロール位置を監視
  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // ページトップに戻る処理
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // スムーズにスクロール
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-6 px-7 py-5 text-lg rounded-md bg-blue-800 text-white border-none cursor-pointer shadow-md"
        >
          Top
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;