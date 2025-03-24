import { RefObject, useEffect } from "react";
import { SimpleFunctionType } from "./types";

export default function useClickOutside(ref: RefObject<HTMLDivElement>, handleOutside : SimpleFunctionType ) {
    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            const currentTarget = event.target as HTMLDivElement;
            const currentRef = ref.current as HTMLElement;
            if (currentRef && !currentRef.contains(currentTarget)) {
                handleOutside();
            };
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });
};