import {
  useEffect,
  useState
} from "react";
import numeral from "numeral";
import moment from "moment-timezone";
import Header from "../component/Header";
import { generateOpenGrahpImage } from "../lib/getOgImage";

export async function getServerSideProps() {
  const ogImagePath = await generateOpenGrahpImage();
  return { props: { ogImagePath } }
}

export default function Home({ ogImagePath }) {
  const URL = process.env.BASE_URL;
  const TIMEZONE = "Asia/Bangkok";
  const INTERVAL = 1000;
  const TARGET_NUMBER_DAY_DEFAULT = 120;

  const TIME = {
    LUNGTOO: { key: 'LUNGTOO', targetDay: TARGET_NUMBER_DAY_DEFAULT, startTime: "2021-06-16T18:00:00", btnText: 'นับแบบลุงตู่' },
    SUPATTHANAPONG: { key: 'SUPATTHANAPONG', targetDay: TARGET_NUMBER_DAY_DEFAULT, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบลูกน้องลุงตู่' },
    MERCURY: { key: 'MERCURY', targetDay: TARGET_NUMBER_DAY_DEFAULT * 58.6, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบอยู่บนดาวพุธ' },
    VEUS: { key: 'VEUS', targetDay: TARGET_NUMBER_DAY_DEFAULT * 117, startTime: "2021-07-01T00:00:00", btnText: 'นับแบบอยู่บนดาวศุกร์' },
  }

  const [selector, setSelector] = useState(TIME.LUNGTOO);
  const [duration, setDuration] = useState(null);

  const { targetDay, startTime } = selector;

  useEffect(() => {
    const currentTime = moment.tz(TIMEZONE);
    const eventTime = moment.tz(startTime, TIMEZONE).add(targetDay, 'days');
    let durationTime = moment.duration(eventTime.diff(currentTime));

    const intervalId = setInterval(function () {
      durationTime = moment.duration(durationTime - INTERVAL, "milliseconds");
      setDuration(durationTime);
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, [selector]);

  const setCounterTime = obj => {
    setDuration(null)
    setSelector(obj);
  };

  const getButtonStyle = _mode => {
    return `flex items-center justify-center p-4 rounded-xl hover:opacity-50 text-gray-300 bg-gradient-to-r ${(_mode.key === selector.key ? 'bg-transparent ring-2 ring-gray-800' : 'from-gray-800 to-gray-600')}`;
  };

  const renderButton = () => {
    return Object.values(TIME).map(item => {
      return <button key={item.key} className={getButtonStyle(item)} onClick={() => setCounterTime(item)} type="submit">{item.btnText}</button>
    })
  }

  const onClickShareToFacebook = () => {

  }

  const hour = duration?.hours() || 0;
  const minute = duration?.minutes() || 0;
  const second = duration?.seconds() || 0;
  const day = Math.floor(duration?.asDays()) || 0;
  const eventStartTime = moment.tz(startTime, TIMEZONE).format("DD-MM-YYYY");
  const description = `จะเปิดประเทศในอีก ${day} วัน ${hour} ชั่วโมง ${minute} นาที ${second} วินาที \n ตามแผนเปิดประเทศใน ${TARGET_NUMBER_DAY_DEFAULT} วัน ตามที่ พล.อ.ประยุทธ์ จันทร์โอชา นายกรัฐมนตรีประกาศออกมา`;

  return (
    <>
      <Header
        title={`จะเปิดประเทศในอีก ${day} วัน ${hour} ชั่วโมง ${minute} นาที ${second} วินาที`}
        description={description}
        link={URL}
        type="web"
        image={ogImagePath}
      />
      <div className="w-screen h-screen flex flex-col justify-center">
        <p className="flex justify-center py-3 text-gray-300 text-5xl font-bold">กำลังจะเปิดประเทศในอีก</p>
        <p className="flex justify-center py-3 text-gray-300 text-9xl font-bold">⌛ {numeral(day).format('###,###')} วัน</p>
        <p className="flex justify-center py-3 text-gray-600 text-4xl font-normal">{`${hour} ชั่วโมง ${minute} นาที ${second} วินาที`}</p>
        <p className="flex justify-center py-4">"เริ่มนับ <span className="text-gray-600 font-bold px-2">{eventStartTime} </span>ตามแผนเปิดประเทศใน {TARGET_NUMBER_DAY_DEFAULT} วัน ตามที่ พล.อ.ประยุทธ์ จันทร์โอชา นายกรัฐมนตรีประกาศออกมา"</p>
        <div className="flex justify-center space-x-3">
          <a className="underline text-gray-500" target="_blank" href="https://www.sanook.com/news/8398414/">#อ้างอิง1</a>
          <a className="underline text-gray-500" target="_blank" href="https://www.bangkokbiznews.com/news/detail/944091">#อ้างอิง2</a>
        </div>
        <div className="flex justify-center m-10 space-x-3">{renderButton()}</div>
        <div className="w-auto my-0 mx-auto">
          <button className="flex items-center justify-center px-6 py-3 rounded-lg hover:opacity-90 text-white bg-blue-600">Share to Facebook</button>
        </div>
      </div>
    </>
  );
}