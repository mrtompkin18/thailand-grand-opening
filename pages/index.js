import ShareButton from 'react-social-share-buttons';
import numeral from "numeral";
import dayjs from "dayjs";
import Header from "../component/Header";
import { Fragment } from "react";

import { useState, useEffect } from 'react';
import { DATE_FORMAT, MODE } from "../constant";

import "dayjs/locale/th";

dayjs.locale("th");

export function getStaticProps() {
  return {
    props: {
      url: process.env.BASE_URL
    }
  }
}

export default function Home({ url }) {
  const [selectedMode, setSelectedMode] = useState(MODE.SUPATTHANAPONG);
  const [timer, setTimer] = useState({ day: '', hour: '', minute: '', second: '' });

  useEffect(() => {
    const interval = setInterval(() => timerCount(selectedMode), 1000);
    return () => clearInterval(interval);
  }, [selectedMode]);

  function timerCount(mode) {
    const { eventTime } = mode;

    const now = dayjs();
    const second = (eventTime.diff(now, "second") % 60).toLocaleString();
    const minute = (eventTime.diff(now, "minute") % 60).toLocaleString();
    const hour = (eventTime.diff(now, "hour") % 24).toLocaleString();
    const day = (eventTime.diff(now, "day")).toLocaleString();

    setTimer({ day, hour, minute, second });
  }

  function onSelectedMode(mode) {
    timerCount(mode);
    setSelectedMode(mode);
  }

  function getButtonStyle(obj) {
    const activeBtn = obj.key === selectedMode.key ? 'bg-transparent ring-2 ring-gray-800' : 'bg-gradient-to-r from-gray-800 to-gray-600';
    return `flex items-center justify-center p-4 rounded-xl hover:opacity-50 text-gray-300 ${activeBtn}`;
  };

  function renderSocialShareButton() {
    const socials = ['facebook', 'twitter'];
    return (
      <div className="flex flex-col md:flex-row justify-center">
        {socials.map((social, key) => {
          return (
            <div className="mt-2 md:mt-0" key={key}>
              <ShareButton
                compact
                socialMedia={social}
                url={url} />
            </div>
          );
        })}
      </div>
    );
  };

  const { day, hour, minute, second } = timer;
  const { eventTime } = selectedMode;

  console.log(timer);

  return (
    <Fragment>
      <Header url={url} />
      <div className="w-screen h-full md:h-screen flex flex-col justify-center">
        <div className="p-4">
          <div>
            <p className="flex justify-center py-3 text-gray-300 lg:text-5xl md:text-3xl text-3xl font-bold">กำลังจะเปิดประเทศในอีก</p>
            <p className="flex justify-center py-3 text-gray-300 lg:text-9xl md:text-7xl text-6xl font-bold">⌛ {numeral(day).format('###,###')} วัน</p>
            <p className="flex justify-center py-3 text-gray-600 lg:text-4xl md:text-4xl text-2xl font-normal">{`${hour} ชั่วโมง ${minute} นาที ${second} วินาที`}</p>
          </div>
          <p className="flex flex-col md:flex-row justify-center text-center py-4">
            <span className="text-gray-600 font-bold">คาดการณ์เปิดประเทศวันที่ {eventTime.format(DATE_FORMAT)} &nbsp;</span> ตามแผนเปิดประเทศใน 120 วัน
          </p>
          {selectedMode.isSpecial && <div className="w-auto md:w-8/12 mx-auto my-5 p-5 text-green-500 text-2xl md:text-4xl text-center font-bold bg-gray-800 rounded-lg">{selectedMode.specialText}</div>}
          <div className="flex flex-col md:flex-row justify-center m-5 md:space-x-3 space-y-3 md:space-y-0">
            {Object.values(MODE).map((item, key) =>
              <button
                key={key}
                className={getButtonStyle(item)}
                onClick={() => onSelectedMode(item)}
                type="button">
                {item.btnText}
              </button>
            )}
          </div>
          {renderSocialShareButton()}
        </div>
      </div>
    </Fragment>
  );
}