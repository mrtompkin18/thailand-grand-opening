import dayjs from "dayjs";
import { generateOpenGrahpImage } from "../../../lib/getOgImage";

export default async function handler(req, res) {

    const currentTime = dayjs();
    const eventTime = dayjs("2021-07-01T00:00:00").add(120, 'days');

    const d = (eventTime.diff(currentTime, "day")).toString();
    const h = (eventTime.diff(currentTime, "hour") % 24).toString();
    const m = (eventTime.diff(currentTime, "minute") % 60).toString();
    const s = (eventTime.diff(currentTime, "second") % 60).toString();

    const title = `${d} วัน`;
    const sub_title = `${h} ชั่วโมง ${m} นาที ${s} วินาที`;
    const desc = "เว็บนี้จัดทำเพื่อใช้ศึกษาการเขียนโปรแกรมเท่านั้น บุคคลอ้างอิงคือลุงหน้าปากซอย";

    const file = await generateOpenGrahpImage(title, sub_title, desc);

    res.status(200).end(file);
}