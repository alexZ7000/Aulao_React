import warning from "../../Assets/warning.png";

export default function Error404() {
    return (
        <div className={"w-full flex h-screen justify-center items-center"}>
            <div className={"flex-col"}>
                <img src={warning} alt="warning" />
                <div className={"flex-row text-2xl text-center"}>
                    <h1>
                        ERRO: <strong className="text-red-600">404</strong>{" "}
                        Página não encontrada
                    </h1>
                    <p>Verifique o URL digitado</p>
                </div>
            </div>
        </div>
    );
}
