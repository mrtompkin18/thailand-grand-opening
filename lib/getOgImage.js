import chromium from "chrome-aws-lambda";
import moment from "moment-timezone";
const fs = require('fs');

export async function generateOpenGrahpImage(day = '??', time = '??', desc = '????') {
    const imageName = `thailand-grand-opening-og.png`;
    const ogImageDir = `./public/images/og`;
    const imagePath = `${ogImageDir}/${imageName}`;
    const publicPath = `${process.env.BASE_URL}/images/og/${imageName}`;

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
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=tis-620" />
            </head> 
            <body>
                <div class="social-image-content">
                    <h4>Thailand Grand Opening</h4>
                    <h1>${day}</h1>
                    <p>${time}</p>
                    <span>${desc}</span>
                </div>
            </body>
            <style>

                html, body {
                    height : 100%;
                    color: #FFFFFF;
                }
            
                body {
                    align-items: center;
                    display: flex;
                    width: 1200px;
                    height: 630px;
                    margin: 0;
                    justify-content: center;
                    background: rgb(2,0,36);
                    background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
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
                    font-size: 30px !important; 
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

    return `${publicPath}?id=${moment.tz('Asia/Bangkok').valueOf()}`;
};