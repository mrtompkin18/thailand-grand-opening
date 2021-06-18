import numeral from "numeral";
import moment from "moment-timezone";
import Header from "../component/Header";
import useCount from "../hook/count";
import { generateOpenGrahpImage } from "../lib/getOgImage";

export async function getStaticProps() {
  const TIMEZONE = "Asia/Bangkok";
  const currentTime = moment.tz(TIMEZONE);
  const eventTime = moment.tz("2021-07-01T00:00:00", TIMEZONE).add(120, 'days');
  const durationTime = moment.duration(eventTime.diff(currentTime));

  const day = `${Math.floor(durationTime.asDays())} Days`;
  const time = `${durationTime.hours()} hours ${durationTime.minutes()} minutes ${durationTime.seconds()} seconds | \n for 120 day challange`;
  const desc = `for educate only`;
  const ogImagePath = await generateOpenGrahpImage(day, time, desc);

  return { props: { ogImagePath }, revalidate: 10 }
}

export default function Home({ ogImagePath }) {

  const getButtonStyle = _mode => {
    return `flex items-center justify-center p-4 rounded-xl hover:opacity-50 text-gray-300 bg-gradient-to-r ${(_mode.key === selector.key ? 'bg-transparent ring-2 ring-gray-800' : 'from-gray-800 to-gray-600')}`;
  };

  const renderButton = () => {
    return Object.values(TIME).map(item => {
      return <button key={item.key} className={getButtonStyle(item)} onClick={() => setCounterTime(item)} type="submit">{item.btnText}</button>
    })
  }

  const renderSpecialMsg = (selector) => {
    const { specialText, targetDay } = selector;
    if (targetDay < 0) {
      return <div className="flex justify-center m-10 text-green-500 text-8xl text-center">{specialText}</div>
    }
  }

  const { TARGET_NUMBER_DAY_DEFAULT, TIME, TIMEZONE, setCounterTime, duration, selector } = useCount();
  const { startTime } = selector;
  const URL = process.env.BASE_URL;

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
        <p className="flex justify-center py-4">"เริ่มนับ <span className="text-gray-600 font-bold px-2">{eventStartTime} </span>ตามแผนเปิดประเทศใน {TARGET_NUMBER_DAY_DEFAULT} วัน ตามที่ลุงแถวบ้านบอกมา"</p>
        {renderSpecialMsg(selector)}
        <div className="flex justify-center m-10 space-x-3">{renderButton()}</div>
        <div className="w-auto my-0 mx-auto">
          <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${URL}`}>
            <button className="flex items-center justify-center px-6 py-3 rounded-lg hover:opacity-90 text-white bg-blue-600">Share to Facebook</button>
          </a>
        </div>
      </div>
    </>
  );
}