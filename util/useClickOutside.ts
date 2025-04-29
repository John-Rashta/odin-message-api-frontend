import { RefObject, useEffect } from "react";
import { SimpleFunctionType } from "./types";

export default function useClickOutside(ref: RefObject<HTMLDivElement>, handleOutside : SimpleFunctionType ) {
    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            event.stopPropagation();
            const currentTarget = event.target as HTMLDivElement;
            if (currentTarget.closest(".optionsUser") && ref.current?.classList.contains("userOptions")) {
                return;
            };

            if (currentTarget.closest(".otherOptions") && ref.current?.classList.contains("extraOptions")) {
                return;
            };
           
            const currentRef = ref.current as HTMLElement;
            if (currentRef && !currentRef.contains(currentTarget)) {
                handleOutside();
            };
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        }
    });
};