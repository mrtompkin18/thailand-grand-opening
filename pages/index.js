import {
  useEffect,
  useState
} from "react";
import numeral from "numeral";
import moment from "moment-timezone";
import * as BlobUtil from 'blob-util';
import Header from "../component/Header";
import ShareButton from 'react-social-share-buttons';

export default function Home() {
  const URL = "https://thailand-grand-opening.vercel.app";
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

  useEffect(async () => {
    const url = await generateImage();
    console.log(url);
  }, []);

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

  const generateImage = async () => {
    const data = {
      "day": "1245 วัน",
      "time": "18 ชั่วโมง 55 นาที 20 วินาที",
      "desc": "\"เริ่มนับ 16-06-2021 ตามแผนเปิดประเทศใน 120 วัน ตามที่ พล.อ.ประยุทธ์ จันทร์โอชา นายกรัฐมนตรีประกาศออกมา\""
    }

    const respone = await fetch("http://localhost:3000/api/screenshot", {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const blob = await respone.blob();
    const url = await BlobUtil.blobToDataURL(blob);

    return url;
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
        image={'http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg'}
        link={URL}
        type="web"
        domain={URL}
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
          <ShareButton
            socialMedia={'facebook'}
            url={URL}
            media={"https://imgs.xkcd.com/comics/error_code.png"}
            text={description}
          />
        </div>
      </div>
    </>
  );
}