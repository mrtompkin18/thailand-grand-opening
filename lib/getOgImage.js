import chromium from "chrome-aws-lambda";
import dayjs from "dayjs";
import { ogTemplateHtml } from "./ogTemplateHtml";

export async function generateOpenGrahpImage() {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const currentTime = dayjs();
    const eventTime = dayjs("2021-07-01T00:00:00").add(120, 'days');

    const d = (eventTime.diff(currentTime, "day")).toString();
    const h = (eventTime.diff(currentTime, "hour") % 24).toString();
    const m = (eventTime.diff(currentTime, "minute") % 60).toString();
    const s = (eventTime.diff(currentTime, "second") % 60).toString();

    const title = `${d} วัน`;
    const sub_title = `${h} ชั่วโมง ${m} นาที ${s} วินาที`;
    const desc = "เว็บนี้จัดทำเพื่อใช้ศึกษาการเขียนโปรแกรมเท่านั้น บุคคลอ้างอิงคือลุงหน้าปากซอย";

    const html = ogTemplateHtml(title, sub_title, desc);

    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport({ width: 1200, height: 627 });

    const file = await page.screenshot({ type: 'png' });
    await browser.close();

    return file;
}

































