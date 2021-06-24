import dayjs from "dayjs";

import "dayjs/locale/th";

dayjs.locale("th");

export const DATE_FORMAT = "DD MMMM YYYY";
export const MODE = {
    SUPATTHANAPONG: {
        key: "1",
        eventTime: dayjs("2021-07-01T00:00:00").add(120, 'days'),
        btnText: "นับแบบลูกน้องลุง",
        specialText: "",
        isSpecial: false,
    },
    LUNGTOO: {
        key: "2",
        eventTime: dayjs("2021-06-16T18:00:00").add(120, 'days'),
        btnText: "นับแบบลุง",
        specialText: "",
        isSpecial: false,
    },
    MERCURY: {
        key: "3",
        eventTime: dayjs("2021-07-01T00:00:00").add(120 * 58.6, 'days'),
        btnText: "นับแบบอยู่บนดาวพุธ",
        specialText: "",
        isSpecial: false,
    },
    VEUS: {
        key: "4",
        eventTime: dayjs("2021-07-01T00:00:00").add(120 * 117, 'days'),
        btnText: "นับแบบอยู่บนดาวศุกร์",
        isSpecial: false,
    },
    PR: {
        key: "5",
        eventTime: dayjs(),
        btnText: "นับแบบโฆษกลุง",
        specialText:
            "อ่ะๆ ล้อเล่น~ อ่ะหยอกๆ~ \n 120 วันเปิดประเทศไม่ใช่เคานท์ดาวน์ แต่แค่ให้พื้นที่เตรียมตัว...",
        isSpecial: true,
    },
};
