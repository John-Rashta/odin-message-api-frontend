import { RefObject, useEffect } from "react";
import { SimpleFunctionType } from "./types";

export default function useClickOutside(ref: RefObject<HTMLDivElement>, handleOutside : SimpleFunctionType ) {
    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            event.stopPropagation();
            const currentTarget = event.target as HTMLDivElement;
            if (currentTarget.closest(".optionsUser")) {
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