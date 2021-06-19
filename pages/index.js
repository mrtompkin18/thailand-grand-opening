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

  const day = Math.floor(durationTime.asDays());
  const time = `${durationTime.hours()} hours ${durationTime.minutes()} minutes ${durationTime.seconds()} seconds | 120 day challange`;
  const desc = `For Educational Purposes Only.`;
  const ogImagePath = await generateOpenGrahpImage(day, time, desc);

  return { props: { ogImagePath }, revalidate: 1 }
}

export default function Home({ ogImagePath }) {

  const getButtonStyle = _mode => {
    return `flex items-center justify-center p-4 rounded-xl hover:opacity-50 text-gray-300 bg-gradient-to-r ${(_mode.key === selector.key ? 'bg-transparent ring-2 ring-gray-800' : 'from-gray-800 to-gray-600')}`;
  };

  const renderButtons = () => {
    return Object.values(TIME).map(item => {
      return <button key={item.key} className={getButtonStyle(item)} onClick={() => setCounterTime(item)} type="submit">{item.btnText}</button>
    })
  }

  const renderSpecialMsg = (selector) => {
    const { specialText, targetDay } = selector;
    if (targetDay < 0) {
      return <div className="flex justify-center m-10 text-green-500 text-6xl text-center font-bold">{specialText}</div>
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
  const description = `ตามแผนเปิดประเทศใน ${TARGET_NUMBER_DAY_DEFAULT} วัน ตามที่ลุงแถวบ้านประกาศออกมา`;

  return (
    <>
      <Header
        description={description}
        link={URL}
        type="web"
        image={ogImagePath}
      />
      <div className="w-screen h-screen flex flex-col justify-center p-4">
        <p className="flex justify-center py-3 text-gray-300 lg:text-5xl md:text-3xl text-3xl font-bold">กำลังจะเปิดประเทศในอีก</p>
        <p className="flex justify-center py-3 text-gray-300 lg:text-9xl md:text-7xl text-6xl font-bold">⌛ {numeral(day).format('###,###')} วัน</p>
        <p className="flex justify-center py-3 text-gray-600 lg:text-4xl md:text-4xl text-2xl font-normal">{`${hour} ชั่วโมง ${minute} นาที ${second} วินาที`}</p>
        <p className="flex flex-col md:flex-row justify-center text-center py-4">"เริ่มนับ <span className="text-gray-600 font-bold px-2">{eventStartTime} </span>ตามแผนเปิดประเทศใน {TARGET_NUMBER_DAY_DEFAULT} วัน ตามที่ลุงแถวบ้านบอกมา"</p>
        {renderSpecialMsg(selector)}
        <div className="flex flex-col md:flex-row justify-center m-10 md:space-x-3 space-y-3 md:space-y-0">{renderButtons()}</div>
        <div className="w-auto my-0 mx-auto">
          <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${URL}`}>
            <button className="flex items-center justify-center px-6 py-3 rounded-lg hover:opacity-90 text-white bg-blue-600">Share to Facebook</button>
          </a>
        </div>
      </div>
    </>
  );
}