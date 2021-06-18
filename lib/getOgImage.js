import chromium from "chrome-aws-lambda";
import moment from "moment-timezone";
const fs = require('fs');

export async function generateOpenGrahpImage(day = '1 วัน', time = '10 ชั่วโมง', desc = 'เทสๆ') {
    const imageName = "thailand-grand-opening-og.png";
    const ogImageDir = `./public/images/og`;
    const imagePath = `${ogImageDir}/${imageName}`;
    const publicPath = `${process.env.BASE_URL}/images/og/${imageName}`;
    time = moment.tz('Asia/Bangkok').format('HH:mm:ss:SSS');

    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 630 });
    page.setContent(`<html>
            <body>
                <div class="social-image-content">
                    <h4>กำลังจะเปิดประเทศในอีก</h4>
                    <h1>⌛ ${day}</h1>
                    <p>${time}</p>
                    <span>${desc}</span>
                </div>
            </body>
            <style>
                html, body {
                    height : 100%;
                    color: #D1D5DA;
                }
            
                body {
                    align-items: center;
                    display: flex;
                    width: 1200px;
                    height: 630px;
                    margin: 0;
                    justify-content: center;
                    background-color: #111927;
                    text-align: center;
                }
            
                .social-image-content h1 {
                    font-size: 180px !important; 
                    font-weight: bold;
                    margin: 10px 0;
                }
            
                .social-image-content h4 {
                    font-size: 40px !important; 
                    margin: 10px 0;
                }
            
                .social-image-content p {
                    font-size: 35px !important; 
                    margin: 10px 0;
                    opacity: 0.5;
                
                }
            
                .social-image-content span {
                    font-size: 20px !important; 
                    margin: 20px 0;
                    opacity: 0.5;
                }
            
                * {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }
            </style>
        </html>`);

    const buffer = await page.screenshot({ type: 'png' });
    fs.mkdirSync(ogImageDir, { recursive: true });
    fs.writeFileSync(imagePath, buffer);

    return publicPath;
};