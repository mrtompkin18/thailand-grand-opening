import chromium from "chrome-aws-lambda";
import { ogTemplateHtml } from "./ogTemplateHtml";

export async function generateOpenGrahpImage(day, time, desc) {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const html = ogTemplateHtml(day, time, desc);
    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport({ width: 1200, height: 627 });

    const file = await page.screenshot({ type: 'png' });
    await browser.close();

    return file;
}

































