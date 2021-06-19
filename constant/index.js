export const TIMEZONE = "Asia/Bangkok";
export const DATE_FORMAT = "DD MMMM YYYY";
export const MODE = {
    SUPATTHANAPONG: {
        key: "1",
        targetDay: 120,
        startTime: "2021-07-01T00:00:00",
        btnText: "นับแบบลูกน้องลุง",
        specialText: "",
        isSpecial: false,
    },
    LUNGTOO: {
        key: "2",
        targetDay: 120,
        startTime: "2021-06-16T18:00:00",
        btnText: "นับแบบลุง",
        specialText: "",
        isSpecial: false,
    },
    MERCURY: {
        key: "3",
        targetDay: 120 * 58.6,
        startTime: "2021-07-01T00:00:00",
        btnText: "นับแบบอยู่บนดาวพุธ",
        specialText: "",
        isSpecial: false,
    },
    VEUS: {
        key: "4",
        targetDay: 120 * 117,
        startTime: "2021-07-01T00:00:00",
        btnText: "นับแบบอยู่บนดาวศุกร์",
        isSpecial: false,
    },
    PR: {
        key: "5",
        targetDay: 0,
        startTime: "2021-06-01T00:00:00",
        btnText: "นับแบบโฆษกลุง",
        specialText:
            "อ่ะๆ ล้อเล่น~ อ่ะหยอกๆ~ \n 120 วันเปิดประเทศไม่ใช่เคานท์ดาวน์ แต่แค่ให้พื้นที่เตรียมตัว...",
        isSpecial: true,
    },
};
