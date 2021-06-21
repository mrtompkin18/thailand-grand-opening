import chromium from "chrome-aws-lambda";
import dayjs from "dayjs";

export async function generateOpenGrahpImage(day = '??', time = '??', desc = '????') {
    const imageName = `thailand-grand-opening-og`;
    const imagePath = `./public/images/og/${imageName}.png`;
    const publicPath = `${process.env.BASE_URL}/images/og/${imageName}.png`;

    const url = 'https://thailand-grand-opening.vercel.app/';

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: imagePath });

    await browser.close();

    // const config = {
    //     templateBody: `
    //         <div class="main">
    //             <h4>กำลังเปิดประเทศในอีก</h4>
    //             <h1>${day} วัน</h1>
    //             <p>${time}</p>
    //             <span>${desc}</span>
    //         </div> 
    //         <style>
    //             .main { 
    //                 color: #FFFFFF;
    //                 width: 100%;
    //                 height: 100vh;
    //                 background-image: url('${process.env.BASE_URL}/images/uncle.png');
    //                 background-size: cover;
    //                 align-items: center;
    //                 display: flex;
    //                 margin: 0;
    //                 justify-content: center;
    //                 text-align: center;
    //                 flex-direction: column;
    //             }

    //             .main h1 {
    //                 font-size: 220px !important; 
    //                 font-weight: bold;
    //                 margin: 6px 0;
    //             }

    //             .main h4 {
    //                 font-size: 60px !important; 
    //                 margin: 6px 0;
    //             }

    //             .main p {
    //                 font-size: 60px !important; 
    //                 margin: 10px 0;
    //                 opacity: 0.8;
    //             }
    //         </style>
    //     `,
    //     output: imagePath,
    //     size: "facebook"
    // }

    // renderSocialImage(config);

    return `${publicPath}?id=${dayjs().valueOf()}`;
};