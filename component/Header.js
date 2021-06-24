import Head from 'next/head';
import dayjs from 'dayjs';

function Header({ url }) {
    const description = "ตามแผนเปิดประเทศใน 120 วัน ตามที่ลุงแถวบ้านประกาศออกมา";

    const currentTime = dayjs();
    const eventTime = dayjs("2021-07-01T00:00:00").add(120, 'days');

    const d = eventTime.diff(currentTime, "day")
    const h = eventTime.diff(currentTime, "hour") % 24
    const m = eventTime.diff(currentTime, "minute") % 60
    const s = eventTime.diff(currentTime, "second") % 60

    const title = `${d} วัน`;
    const sub_title = `${h} ชั่วโมง ${m} นาที ${s} วินาที`;
    const desc = "เว็บนี้จัดทำเพื่อใช้ศึกษาการเขียนโปรแกรมเท่านั้น บุคคลอ้างอิงคือลุงหน้าปากซอย";

    return (
        <Head>
            <title>เหลืออีกกี่วันกันนะ ? ถึงเปิดประเทศตามที่ลุงแถวบ้านบอก</title>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"></link>
            <meta charSet="UTF-8" />
            <meta name="description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content="เหลืออีกกี่วันกันนะ ? ถึงเปิดประเทศตามที่ลุงแถวบ้านบอก" />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${url}/api/og?title=${title}&sub_title=${sub_title}&desc=${desc}`} />
            <meta property="og:type" content="website" />
        </Head>
    );
}

export default Header;