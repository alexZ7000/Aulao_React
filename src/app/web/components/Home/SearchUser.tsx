import { useState } from "react";
import ModernInput from "@components/Generic/ModernInput.tsx";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import getUser from "@integrations/Github/GetUser.ts";
import IGitHubUser from "@interfaces/IGithubUser.ts";
import { useThemeDetector } from "@functions/ThemeDetector.ts";

export default function SearchUser() {
    const [githubData, setGithubData] = useState<IGitHubUser>();
    const [profileInput, setProfileInput] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [fade, setFade] = useState(false);
    const isDarkTheme = useThemeDetector();

    async function sendData(owner: string) {
        setLoaded(false);
        setFade(false);
        try {
            await toast
                .promise(getUser({ owner }), {
                    loading: `Procurando Usuário`,
                    success: <b>Usuário Github encontrado com sucesso!</b>,
                    error: (error: AxiosError) =>
                        error.status + " " + error.message
                })
                .then((githubUserData) => {
                    setGithubData(githubUserData as IGitHubUser);
                    setLoaded(true);
                    handleFade();
                });
        } catch (e) {
            console.log(e);
        }
    }

    function handleFade() {
        setTimeout(() => {
            setFade(true);
        }, 300);
    }

    return (
        <div
            className={
                "w-full pt-20 h-screen flex-col flex justify-center items-center"
            }
        >
            <div className={"flex flex-col w-72 gap-y-5"}>
                <ModernInput
                    label="Perfil Github"
                    value={profileInput}
                    onChange={(value) => setProfileInput(value)}
                    placeholder="Escreva apenas o perfil Github..."
                />
                <button
                    onClick={() => sendData(profileInput)}
                    className="text-white text-lg mt-5 bg-blue-500 p-3 hover:bg-blue-600 rounded-2xl shadow-lg duration-300 transition-colors active:scale-95"
                >
                    Pesquisar perfil
                </button>
            </div>
            {loaded && (
                <div
                    onClick={() => window.open(githubData?.html_url, "_blank")}
                    className={`cursor-pointer w-[75%] h-72 px-20 flex hover:scale-105 items-center rounded transition-all duration-300 mt-10 ${isDarkTheme ? "bg-gray-800" : "bg-gray-300"} ${fade ? "opacity-100" : "opacity-0"}`}
                >
                    <div className={"flex"}>
                        <img
                            className={"rounded-full shadow-lg w-52"}
                            src={githubData?.avatar_url}
                            alt="avatar"
                        />
                        <div className={"pb-32 ps-10"}>
                            <p>{githubData?.name}</p>
                            <p>{githubData?.bio}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
