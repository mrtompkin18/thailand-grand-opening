import ShareButton from 'react-social-share-buttons';
import numeral from "numeral";
import dayjs from "dayjs";
import Header from "../component/Header";

import { useState, useEffect } from 'react';
import { generateOpenGrahpImage } from "../lib/getOgImage";
import { DATE_FORMAT, MODE } from "../constant";
import "dayjs/locale/th";

dayjs.locale("th");

export async function getStaticProps() {
  const currentTime = dayjs();
  const eventTime = dayjs("2021-07-01T00:00:00").add(120, 'days');

  const d = eventTime.diff(currentTime, "day")
  const h = eventTime.diff(currentTime, "hour") % 24
  const m = eventTime.diff(currentTime, "minute") % 60
  const s = eventTime.diff(currentTime, "second") % 60

  const url = process.env.BASE_URL;
  const time = `${h} ชั่วโมง ${m} นาที ${s} วินาที`;
  const desc = "เว็บนี้จัดทำเพื่อใช้ศึกษาการเขียนโปรแกรมเท่านั้น บุคคลอ้างอิงคือลุงหน้าปากซอย";

  const ogImagePath = await generateOpenGrahpImage(numeral(d).format('###,###'), time, desc);

  return {
    props: { ogImagePath, url },
    revalidate: 10
  }
}

export default function Home({ ogImagePath, url }) {

  const [mode, setMode] = useState(MODE.SUPATTHANAPONG);
  const [day, setDay] = useState("??");
  const [hour, setHour] = useState("??");
  const [minute, setMinute] = useState("??");
  const [second, setSecond] = useState("??");
  const [eventDate, setEventDate] = useState("??");

  useEffect(() => {
    const eventTime = dayjs(mode.startTime).add(mode.targetDay, 'days');

    const intervalId = setInterval(function () {
      const now = dayjs();
      setDay(eventTime.diff(now, "day"));
      setHour(eventTime.diff(now, "hour") % 24);
      setMinute(eventTime.diff(now, "minute") % 60);
      setSecond(eventTime.diff(now, "second") % 60);
      setEventDate(eventTime.format(DATE_FORMAT));
    }, 10);

    return () => clearInterval(intervalId);

  }, [mode]);

  const getButtonStyle = (obj) => {
    const activeBtn = obj.key === mode.key ? 'bg-transparent ring-2 ring-gray-800' : 'bg-gradient-to-r from-gray-800 to-gray-600';
    return `flex items-center justify-center p-4 rounded-xl hover:opacity-50 text-gray-300 ${activeBtn}`;
  };

  const renderButtons = () => {
    return (
      <div className="flex flex-col md:flex-row justify-center m-5 md:space-x-3 space-y-3 md:space-y-0">
        {Object.values(MODE).map((item, key) => {
          return <button key={key} className={getButtonStyle(item)} onClick={() => setMode(item)} type="submit">{item.btnText}</button>
        })}
      </div>
    );
  };

  const renderSpecialMsg = () => {
    const { specialText, isSpecial } = mode;
    if (isSpecial) {
      return <div className="w-auto md:w-8/12 mx-auto my-5 p-5 text-green-500 text-2xl md:text-4xl text-center font-bold bg-gray-800 rounded-lg">{specialText}</div>
    }
  };

  const renderCountdown = () => {
    if (second < 0) {
      return <p className="flex justify-center py-3 text-gray-300 lg:text-7xl md:text-7xl text-6xl font-bold text-center leading-normal">🥳 เปิดประเทศแล้ว</p>
    }
    return (
      <div>
        <p className="flex justify-center py-3 text-gray-300 lg:text-5xl md:text-3xl text-3xl font-bold">กำลังจะเปิดประเทศในอีก</p>
        <p className="flex justify-center py-3 text-gray-300 lg:text-9xl md:text-7xl text-6xl font-bold">⌛ {numeral(day).format('###,###')} วัน</p>
        <p className="flex justify-center py-3 text-gray-600 lg:text-4xl md:text-4xl text-2xl font-normal">{`${hour} ชั่วโมง ${minute} นาที ${second} วินาที`}</p>
      </div>
    );
  };

  const renderSocialShareButton = () => {
    const socials = ['facebook', 'twitter'];
    const text = second < 0 ? `🥳 ประเทศเปิดแล้ว` : `กำลังจะเปิดประเทศในอีก ${day} วัน`;
    return (
      <div className="flex flex-col md:flex-row justify-center">
        {socials.map((social, key) => {
          return (
            <div className="mt-2 md:mt-0" key={key}>
              <ShareButton compact socialMedia={social} text={`${text} (${mode.btnText})`} url={url} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Header link={url} type="website" image={ogImagePath} />
      <div className="w-screen h-full md:h-screen flex flex-col justify-center">
        <div className="p-4">
          {renderCountdown()}
          <p className="flex flex-col md:flex-row justify-center text-center py-4">
            <span className="text-gray-600 font-bold">เริ่มนับ {dayjs(mode.startTime).format(DATE_FORMAT)}, คาดการณ์เปิดประเทศวันที่ {eventDate} &nbsp;</span> ตามแผนเปิดประเทศใน 120 วัน
          </p>
          {renderSpecialMsg()}
          {renderButtons()}
          {renderSocialShareButton()}
        </div>
      </div>
    </>
  );
}