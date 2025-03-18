import { enIN } from "date-fns/locale";
import { Locale } from "date-fns/locale";

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

export { locale };