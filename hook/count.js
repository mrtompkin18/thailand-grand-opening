import {
    useEffect,
    useState
} from "react";
import moment from "moment-timezone";

export default function useCount() {
    const TIMEZONE = "Asia/Bangkok";
    const INTERVAL = 1000;
    const TARGET_NUMBER_DAY_DEFAULT = 120;
    const CURRENT = moment.tz(TIMEZONE).format();

    const TIME = {
        SUPATTHANAPONG: { key: '1', targetDay: TARGET_NUMBER_DAY_DEFAULT, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบลูกน้องลุง', specialText: '', isSpecial: false },
        LUNGTOO: { key: '2', targetDay: TARGET_NUMBER_DAY_DEFAULT, startTime: "2021-06-16T18:00:00", btnText: 'นับแบบลุง', specialText: '', isSpecial: false },
        MERCURY: { key: '3', targetDay: TARGET_NUMBER_DAY_DEFAULT * 58.6, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบอยู่บนดาวพุธ', specialText: '', isSpecial: false },
        VEUS: { key: '4', targetDay: TARGET_NUMBER_DAY_DEFAULT * 117, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบอยู่บนดาวศุกร์', isSpecial: false },
        PR: { key: '5', targetDay: 0, startTime: CURRENT, btnText: 'นับแบบโฆษกลุง', specialText: 'อ่ะๆ ล้อเล่น~ อ่ะหยอกๆ~ \n 120 วันเปิดประเทศไม่ใช่เคานท์ดาวน์ แต่แค่ให้พื้นที่เตรียมตัว...', isSpecial: true },
    }

    const [selector, setSelector] = useState(TIME.SUPATTHANAPONG);
    const [duration, setDuration] = useState(null);
    const [isEventEnd, setIsEventEnd] = useState(false);

    const { targetDay, startTime, isSpecial } = selector;

    useEffect(() => {
        let intervalId = null;

        const currentTime = moment.tz(TIMEZONE);
        const eventTime = moment.tz(startTime, TIMEZONE).add(targetDay, 'days');
        let durationTime = moment.duration(eventTime.diff(currentTime));

        if (isSpecial) {
            setIsEventEnd(false);
            clearInterval(intervalId);
        } else if (durationTime.asSeconds() <= 0) {
            setIsEventEnd(true);
            clearInterval(intervalId);
        } else {
            setIsEventEnd(false);
            intervalId = setInterval(function () {
                durationTime = moment.duration(durationTime - INTERVAL, "milliseconds");
                setDuration(durationTime);
            }, INTERVAL);
        }

        console.log(isEventEnd);

        return () => intervalId && clearInterval(intervalId);

    }, [selector]);

    const setCounterTime = obj => {
        setDuration(null)
        setSelector(obj);
    };

    return {
        TIME, TIMEZONE, TARGET_NUMBER_DAY_DEFAULT, setCounterTime, duration, selector, isEventEnd
    }
}