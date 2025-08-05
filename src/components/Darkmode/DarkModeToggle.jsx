import { Moon, Sun } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useDarkMode();

    return (
        <div className="relative group z-50 flex items-center justify-center">
            <button
                onClick={() => setIsDark(!isDark)}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                )}
            </button>

            {/* Tooltip */}
            <span className="absolute bottom-08 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out text-xs text-white bg-black/80 px-2 py-1 rounded-md shadow-lg whitespace-nowrap pointer-events-none">
                {isDark ? "Light Mode" : "Dark Mode"}
            </span>
        </div>
    );
};

export default DarkModeToggle;