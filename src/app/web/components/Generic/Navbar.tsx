import WhiteLogo from "@assets/react-git-logo-white.png"; // import usando alias
import DarkLogo from "../../../assets/react-git-logo-black.png"; // import sem usar alias
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { navbarProperties } from "@constants/NavbarProperties.ts";

export default function Navbar() {
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    return (
        <div
            className={`fixed z-40 flex bg-transparent backdrop-blur-md justify-between ${isDarkTheme ? "bg-blck" : "bg-gra-100"} top-0 drop-shadow p-5 w-full`}
        >
            <div className={"flex gap-5 items-center"}>
                <img
                    className={
                        "w-20 hover:scale-110 duration-300 transition-transform cursor-pointer"
                    }
                    src={isDarkTheme ? DarkLogo : WhiteLogo}
                    alt={"React & Git logo"}
                    onClick={() => navigate("/")}
                />
                {navbarProperties.map((item, index) => (
                    <NavLink
                        className={`text-white active:scale-95 transform hover:-translate-y-0.5 transition-transform duration-300 text-lg shadow-lg text-center min-w-40 p-1 rounded-full ${isDarkTheme ? "bg-blue-900" : "bg-blue-500"}`}
                        key={index}
                        to={item.goTo}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
            <div className={"flex"}></div>
        </div>
    );
}
