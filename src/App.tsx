import AppRoutes from "@routes/index";
import { createPortal } from "react-dom";
import ToastContainer from "@components/Generic/ToastContainer.tsx";
import { useThemeDetector } from "@functions/ThemeDetector.ts";

export default function App() {
    const isDarkTheme = useThemeDetector();
    return (
        <>
            <ToastContainer></ToastContainer>
            {createPortal(
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={
                        isDarkTheme
                            ? "/react-git-logo-white.png"
                            : "react-git-logo-black.png"
                    }
                />,
                document.getElementById("link-by-user-theme") as
                    | Element
                    | DocumentFragment
            )}
            <AppRoutes />
        </>
    );
}
