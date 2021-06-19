import chromium from "chrome-aws-lambda";
import moment from "moment-timezone";
const fs = require('fs');
import renderSocialImage from "puppeteer-social-image";

//--save "puppeteer-core": "^10.0.0",
//--dav "puppeteer": "^10.0.0",

export async function generateOpenGrahpImage(day = '??', time = '??', desc = '????') {
    const imageName = `thailand-grand-opening-og`;
    const ogImageDir = `./public/images/og`;
    const imagePath = `${ogImageDir}/${imageName}.png`;
    const publicPath = `${process.env.BASE_URL}/images/og/${imageName}.png`;

    renderSocialImage({
        template: "basic",
        templateParams: {
            imageUrl: `${process.env.BASE_URL}/images/uncle.png`,
            title: "เทสภาษาไทย"
        },
        output: imagePath,
        size: "facebook"
    });

    // const imageName = `thailand-grand-opening-og.png`;
    // const ogImageDir = `./public/images/og`;
    // const imagePath = `${ogImageDir}/${imageName}`;
    // const publicPath = `${process.env.BASE_URL}/images/og/${imageName}`;

    // const browser = await chromium.puppeteer.launch({
    //     args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath,
    //     headless: true,
    //     ignoreHTTPSErrors: true,
    // });

    // const page = await browser.newPage();
    // page.setViewport({ width: 1200, height: 630 });
    // page.setContent(`<html>
    //         <head>
    //             <meta http-equiv="Content-Type" content="text/html; charset=tis-620" />
    //         </head> 
    //         <body>
    //             <div class="social-image-content">
    //                 <h4>Thailand Grand Opening</h4>
    //                 <h1>${day}</h1>
    //                 <h3>days left</h3>
    //                 <p>${time}</p>
    //                 <span>${desc}</span>
    //             </div>
    //         </body>
    //         <style>

    //             html, body {
    //                 height : 100%;
    //                 color: #FFFFFF;
    //             }

    //             body {
    //                 align-items: center;
    //                 display: flex;
    //                 width: 1200px;
    //                 height: 630px;
    //                 margin: 0;
    //                 justify-content: center;
    //                 background: #00bf8f;  /* fallback for old browsers */
    //                 background: -webkit-linear-gradient(to right, #001510, #00bf8f);  /* Chrome 10-25, Safari 5.1-6 */
    //                 background: linear-gradient(to right, #001510, #00bf8f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    //                 // background: url('${process.env.BASE_URL}/images/uncle.png');
    //                 // background-size: cover;
    //                 text-align: center;
    //             }

    //             .social-image-content h1 {
    //                 font-size: 220px !important; 
    //                 font-weight: bold;
    //                 margin: 10px 0;
    //             }

    //             .social-image-content h3 {
    //                 font-size: 60px !important; 
    //                 margin: 10px 0;
    //             }

    //             .social-image-content h4 {
    //                 font-size: 40px !important; 
    //                 margin: 10px 0;
    //             }

    //             .social-image-content p {
    //                 font-size: 30px !important; 
    //                 margin: 10px 0;
    //                 opacity: 0.5;

    //             }

    //             .social-image-content span {
    //                 font-size: 20px !important; 
    //                 margin: 20px 0;
    //                 opacity: 0.5;
    //             }

    //             * {
    //                 font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    //             }
    //         </style>
    //     </html>`);

    // const buffer = await page.screenshot({ type: 'png' });
    // fs.mkdirSync(ogImageDir, { recursive: true });
    // fs.writeFileSync(imagePath, buffer);

    return `${publicPath}?id=${moment.tz('Asia/Bangkok').valueOf()}`;
};