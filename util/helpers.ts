import { enIN } from "date-fns/locale";
import { Locale } from "date-fns/locale";
import { ClickType } from "./types";
import { TargetData, CoordsInfo } from "./interfaces";

const formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'Pp'
};

const locale : Locale = {
    ...enIN,
    formatRelative: token => formatRelativeLocale[token]
};

interface HandleOptions {
    changeShow: React.Dispatch<React.SetStateAction<boolean>>,
    changeCoords: React.Dispatch<React.SetStateAction<CoordsInfo>>,
    changeData: React.Dispatch<React.SetStateAction<TargetData>>,
}

const handleOptionsClick = function handleClickingForOptions(e : ClickType, helpFuncs : HandleOptions ) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const finalX = mouseX - rect.left;
    const finalY = mouseY - rect.top;
    const possibleUser = target.dataset.userid;
    const possibleMessage = target.dataset.messageid;
    const possibleAdmin = target.dataset.admin;
    const possibleFriend = target.dataset.friend;
    helpFuncs.changeData({
        user: possibleUser,
        message: possibleMessage,
        admin: possibleAdmin,
        friend: possibleFriend,
    })
    helpFuncs.changeCoords({top: finalY, left: finalX});
    helpFuncs.changeShow(true);
}

export { locale, handleOptionsClick };