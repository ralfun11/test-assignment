import React, {useEffect, useState} from "react"
import "../../App.css"

export type Position = {
    top: number,
    left: number,
};

export type BannerProps = {
    position: Position,
    id: number,
    remove: (id: number) => void
};

export const Banner = ({position, id, remove}:BannerProps) => {

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        window.addEventListener('resize', () => {
            const elements = document.getElementsByTagName("textarea");
            Array.from(elements).map((element) => {
                element.style.height = "auto";
                element.style.height = calculatePercentageHeight(element.scrollHeight);
            })
        });
    });

    return (
        <textarea
            className="input-field"
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
            onClick={() => setValue("")}
            style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
                width: "7%",
                height: "auto",
            }}
            onDoubleClick={() => remove(id)}
            onInput={(e) => {
                const element = e.currentTarget;
                element.style.height = "auto";
                element.style.height = calculatePercentageHeight(element.scrollHeight);
            }}
        />
    );
};

const calculatePercentageHeight = (scrollHeight:number) => `${(( scrollHeight)/window.innerHeight)*100}%`