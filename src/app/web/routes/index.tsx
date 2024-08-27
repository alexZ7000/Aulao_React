import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@components/Generic/Navbar.tsx";
import { lazy, Suspense } from "react";
import Loading from "@screens/Loading.tsx";
const Home = lazy(() => import("@screens/Home.tsx"));
const Error404 = lazy(() => import("@screens/Error404.tsx"));

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Suspense
                fallback={
                    <div
                        className={
                            "fixed flex-col inset-0 flex items-center justify-center"
                        }
                    >
                        <Loading />
                    </div>
                }
            >
                <Routes>
                    <Route element={<Error404 />} path={"*"} />
                    <Route element={<Home />} path={"/"} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
