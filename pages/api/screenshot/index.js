import chromium from "chrome-aws-lambda";

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return;
    }

    const { body } = req;
    const { day, time, desc } = body;

    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    page.setViewport({ width: 1128, height: 600 });
    page.setContent(`  <html>
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
            height: 600px;
            justify-content: center;
            margin: 0;
            width: 1128px;
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

    const screenShotBuffer = await page.screenshot();
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": Buffer.byteLength(screenShotBuffer),
    });

    res.end(screenShotBuffer);
};
