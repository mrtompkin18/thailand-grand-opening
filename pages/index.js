import { useCallback } from 'react';
import ShareButton from 'react-social-share-buttons';
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

  const url = process.env.BASE_URL;
  const day = Math.floor(durationTime.asDays());
  const time = `${durationTime.hours()} ชั่วโมง ${durationTime.minutes()} นาที ${durationTime.seconds()} วินาที`;
  const desc = `เว็บนี้จัดทำเพื่อใช้ศึกษาการเขียนโปรแกรมเท่านั้น บุคคลอ้างอิงคือลุงหน้าปากซอย`;
  const ogImagePath = await generateOpenGrahpImage(day, time, desc);

  return { props: { ogImagePath, url }, revalidate: 1 }
}

export default function Home({ ogImagePath, url }) {

  const getButtonStyle = _mode => {
    return `flex items-center justify-center p-4 rounded-xl hover:opacity-50 text-gray-300 ${(_mode.key === selector.key ? 'bg-transparent ring-2 ring-gray-800' : 'bg-gradient-to-r from-gray-800 to-gray-600')}`;
  };

  const renderButtons = () => {
    return Object.values(TIME).map(item => {
      return <button key={item.key} className={getButtonStyle(item)} onClick={() => setCounterTime(item)} type="submit">{item.btnText}</button>
    })
  };

  const renderSpecialMsg = (selector) => {
    const { specialText, isSpecial } = selector;
    if (isSpecial) {
      return <div className="flex leading-normal justify-center m-8 text-green-500 text-2xl md:text-4xl text-center font-bold bg-gray-800 p-5 rounded-lg">{specialText}</div>
    }
  };

  const renderCountdown = ({ day, hour, minute, second, isEventEnd }) => {
    if (!isEventEnd) {
      return (
        <>
          <p className="flex justify-center py-3 text-gray-300 lg:text-5xl md:text-3xl text-3xl font-bold">กำลังจะเปิดประเทศในอีก</p>
          <p className="flex justify-center py-3 text-gray-300 lg:text-9xl md:text-7xl text-6xl font-bold">⌛ {numeral(day).format('###,###')} วัน</p>
          <p className="flex justify-center py-3 text-gray-600 lg:text-4xl md:text-4xl text-2xl font-normal">{`${hour} ชั่วโมง ${minute} นาที ${second} วินาที`}</p>
        </>
      );
    } else {
      return <p className="flex justify-center py-3 text-gray-300 lg:text-7xl md:text-7xl text-6xl font-bold text-center leading-normal">🥳 เปิดประเทศแล้ว</p>
    }
  };

  const renderSocialShare = useCallback((day) => {
    const socials = ['facebook', 'twitter'];
    return (
      <div className="flex flex-col md:flex-row justify-center">
        {socials.map((social, key) => {
          return (
            <div className="mt-2 md:mt-0" key={key}>
              <ShareButton
                compact
                socialMedia={social}
                text={`กำลังจะเปิดประเทศในอีก ${day} วัน`}
                url={url}
              />
            </div>
          );
        })}
      </div>
    )
  }, []);

  const { TARGET_NUMBER_DAY_DEFAULT, TIME, TIMEZONE, setCounterTime, duration, selector, isEventEnd } = useCount();
  const { startTime } = selector;

  const hour = duration?.hours() || '??';
  const minute = duration?.minutes() || '??';
  const second = duration?.seconds() || '??';
  const day = Math.floor(duration?.asDays()) || '??';
  const eventStartTime = moment.tz(startTime, TIMEZONE).format("DD-MM-YYYY HH:mm");
  const description = `ตามแผนเปิดประเทศใน ${TARGET_NUMBER_DAY_DEFAULT} วัน ตามที่ลุงแถวบ้านประกาศออกมา`;

  return (
    <div className="w-screen h-full md:h-screen flex flex-col justify-center">
      <div className="p-4">
        <Header
          description={description}
          link={url}
          type="web"
          image={ogImagePath}
        />
        {renderCountdown({ day, hour, minute, second, isEventEnd })}
        <p className="flex flex-col md:flex-row justify-center text-center py-4">"เริ่มนับ <span className="text-gray-600 font-bold px-2">{eventStartTime} น.</span> ตามแผนเปิดประเทศใน {TARGET_NUMBER_DAY_DEFAULT} วัน ตามที่ลุงแถวบ้านบอกมา"</p>
        {renderSpecialMsg(selector)}
        <div className="flex flex-col md:flex-row justify-center m-10 md:space-x-3 space-y-3 md:space-y-0">{renderButtons()}</div>
        {renderSocialShare(day)}
      </div>
    </div>
  );
}