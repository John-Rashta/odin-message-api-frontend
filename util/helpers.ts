import { enIN } from "date-fns/locale";
import { Locale } from "date-fns/locale";
import { BasicClickType, ClickType, FuncsOptionsType } from "./types";
import { TargetUser, CoordsInfo, TargetMessage, BasicUserInfo } from "./interfaces";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface HandleOptions {
    changeShow: React.Dispatch<React.SetStateAction<boolean>>,
    changeCoords: React.Dispatch<React.SetStateAction<CoordsInfo>>,
};

interface UserOptions {
    changeData: React.Dispatch<React.SetStateAction<TargetUser>>,
};

interface MessageOptions {
    changeData: React.Dispatch<React.SetStateAction<TargetMessage>>,
};

const formatRelativeLocale = {
    lastWeek: "'Last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'Today at' p",
    tomorrow: "'Tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'Pp'
};

const locale : Locale = {
    ...enIN,
    formatRelative: token => formatRelativeLocale[token]
};

const helperGetCoords = function getCoordsFromEventAndTarget(e : BasicClickType, target : HTMLElement) {
    const rect = target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const finalX = mouseX;
    const finalY = mouseY;

    return {
        top: finalY,
        left: finalX
    }
};

const handleUserOptionsClick = function handleClickingForOptions(myId: string, e : BasicClickType, helpFuncs : HandleOptions & UserOptions ) {
    const target = e.target as HTMLElement;
    const realTarget = target.closest(".optionsUser");
    if (!realTarget || !(realTarget instanceof HTMLElement)) {
        return;
    };

    const possibleUser = realTarget.dataset.userid;
    if (possibleUser === myId) {
        return;
    }

    const finalCoords = helperGetCoords(e, target);
    const possibleAdmin = realTarget.dataset.admin;
    const possibleFriend = realTarget.dataset.friend;
    helpFuncs.changeData({
        user: possibleUser,
        admin: possibleAdmin,
        friend: possibleFriend,
    })
    helpFuncs.changeCoords(finalCoords);
    helpFuncs.changeShow(true);
    return;
};

const handleMessageOptionsClick = function handleClickingMessageForOptions(myId: string, e: ClickType, helpFuncs: HandleOptions & MessageOptions) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const checkIfUser = target.closest(".optionsUser");
    if (checkIfUser) {
        return;
    };
    const realTarget = target.closest(".optionsMessage");
    if (!realTarget || !(realTarget instanceof HTMLElement)) {
        return;
    };
    const possibleMessage = realTarget.dataset.messageid;
    const possibleSender = realTarget.dataset.userid;
    if (possibleSender !== myId) {
        return;
    };
    const boundTarget = target.getBoundingClientRect();
    const finalCoords = {top: boundTarget.top, left: Math.round(boundTarget.right * 0.9)};
    helpFuncs.changeData({
        message: possibleMessage
    });
    helpFuncs.changeCoords(finalCoords);
    helpFuncs.changeShow(true);
    return;
};

const getFuncs = function getChangeFunctionsFromHandlers(info : FuncsOptionsType) {
    return {
        changeShow: info[0].changeShow,
        changeCoords: info[1].changeCoords,
        changeData: info[2].changeData,
    }
};

const getAdminIds = function getIdOfAdminsFroAdminList(info: BasicUserInfo[]) {
    return info.map((admin) => {
        return admin.id
    });
};

const isFetchBaseQueryError = function checkErrorBeforeUsing(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
};

export { locale, handleUserOptionsClick, handleMessageOptionsClick, getFuncs, getAdminIds, isFetchBaseQueryError };