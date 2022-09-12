import { useEffect, useState } from "react";

const listGradientBG = [
    "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
    "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
    "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
    "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
    "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
    "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
];

export default function Layout({ children }) {
    const [gradientBG, setGradientBG] = useState(listGradientBG[0]);
    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
        setGradientBG(listGradientBG[randomNumber]);
    }, []);

    return (
        <div
            style={{
                height: "100vH",
                display: "flex",
                alignItems: "center",
                backgroundImage: gradientBG,
            }}
        >
            <div>{children}</div>
        </div>
    );
}
