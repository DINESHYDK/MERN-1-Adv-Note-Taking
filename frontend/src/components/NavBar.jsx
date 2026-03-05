import {PlusIcon} from "lucide-react";
import {Link} from "react-router";
import {useEffect, useState} from "react";

// All 6 available DaisyUI themes
const THEMES = [
    "valentine",  // Pink pastel (default)
    "lemonade",   // Fresh green light
    "aqua",      // Deep dark blue
    "dracula",    // Classic dark purple
    "emerald",       // Clean arctic light
    "autumn",     // Warm earthy tones
];

const NavBar = () => {
    // Load saved theme from localStorage, fallback to "valentine"
    const [theme, setTheme] = useState(
        () => localStorage.getItem("note-theme") || "valentine"
    );

    // Whenever theme state changes, update the HTML attribute + save to localStorage
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("note-theme", theme);
    }, [theme]);

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary font-mono tracking-tight">
                        YDK Notes
                    </h1>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3">
                        {/* Theme Selector — a simple <select> styled with DaisyUI */}
                        <select
                            className="select select-bordered select-sm w-28 sm:w-32 capitalize"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            {THEMES.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>

                        {/* New Note button — responsive text */}
                        <Link to="/create" className="btn btn-primary btn-sm sm:btn-md">
                            <PlusIcon className="size-4 sm:size-5"/>
                            {/* "New Note" on sm+ screens, "+New" on mobile */}
                            <span className="hidden sm:inline">New Note</span>
                            <span className="sm:hidden">New</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;