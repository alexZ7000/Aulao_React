import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: { padding: 15, fontSize: 16 }
            }}
        />
    );
}
