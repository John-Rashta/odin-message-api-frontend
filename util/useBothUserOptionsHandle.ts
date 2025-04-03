import useUserOptionsHandle from "./useUserOptionsHandle";

export default function useBothUserOptionsHandle() {
    const [showFuncs, coordsFuncs, dataFuncs] = useUserOptionsHandle();
    const [showMinFuncs, coordsMinFuncs, dataMinFuncs] = useUserOptionsHandle();

    return [
        {
            showFuncs,
            coordsFuncs,
            dataFuncs,
        },
        {
            showFuncs: showMinFuncs,
            coordsFuncs: coordsMinFuncs,
            dataFuncs: dataMinFuncs,
        },
    ]
};