import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", label: "🇺🇸 English" },
        { code: "km", label: "🇰🇭 Khmer" },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);
    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="mx-auto w-full items-center justify-center">
            <div className="relative">
                <div
                    className="flex cursor-pointer items-center justify-between space-x-5 bg-white px-4 py-2"
                    onClick={toggleDropdown}
                >
                    <span className="text-base font-medium text-black">
                        {languages.find(lang => lang.code === i18n.language)?.label || "Choose Language"}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </div>

                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full shadow-xl px-4 py-1 text-gray-800 bg-white">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`my-2 block w-full text-left border-b border-gray-100 py-1 font-semibold hover:text-black ${i18n.language === lang.code ? "text-black" : "text-gray-500"
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageDropdown;
