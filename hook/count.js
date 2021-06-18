import {
    useEffect,
    useState
} from "react";
import moment from "moment-timezone";

export default function useCount() {
    const TIMEZONE = "Asia/Bangkok";
    const INTERVAL = 1000;
    const TARGET_NUMBER_DAY_DEFAULT = 120;

    const TIME = {
        LUNGTOO: { key: '1', targetDay: TARGET_NUMBER_DAY_DEFAULT, startTime: "2021-06-16T18:00:00", btnText: 'นับแบบลุง', specialText: '' },
        SUPATTHANAPONG: { key: '2', targetDay: TARGET_NUMBER_DAY_DEFAULT, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบลูกน้องลุง', specialText: '' },
        MERCURY: { key: '3', targetDay: TARGET_NUMBER_DAY_DEFAULT * 58.6, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบอยู่บนดาวพุธ', specialText: '' },
        VEUS: { key: '4', targetDay: TARGET_NUMBER_DAY_DEFAULT * 117, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบอยู่บนดาวศุกร์' },
        PR: { key: '5', targetDay: -1, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบโฆษกลุง', specialText: 'อ่ะๆ ล้อเล่น~ อ่ะหยอกๆ~' },
    }

    const [selector, setSelector] = useState(TIME.LUNGTOO);
    const [duration, setDuration] = useState(null);

    const { targetDay, startTime } = selector;

    useEffect(() => {
        let intervalId = null;
        if (targetDay > 0) {
            const currentTime = moment.tz(TIMEZONE);
            const eventTime = moment.tz(startTime, TIMEZONE).add(targetDay, 'days');
            let durationTime = moment.duration(eventTime.diff(currentTime));

            intervalId = setInterval(function () {
                durationTime = moment.duration(durationTime - INTERVAL, "milliseconds");
                setDuration(durationTime);
            }, INTERVAL);
        }
        return () => intervalId && clearInterval(intervalId);
    }, [selector]);

    const setCounterTime = obj => {
        setDuration(null)
        setSelector(obj);
    };

    return {
        TIME, TIMEZONE, TARGET_NUMBER_DAY_DEFAULT, setCounterTime, duration, selector
    }
}