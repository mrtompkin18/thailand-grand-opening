import moment from "moment-timezone";
const fs = require('fs');
import renderSocialImage from "puppeteer-social-image";

//--save "puppeteer-core": "^10.0.0",
//--save "chrome-aws-lambda": "^10.0.0",
//--dav "puppeteer": "^10.0.0",

export async function generateOpenGrahpImage(day = '??', time = '??', desc = '????') {
    const imageName = `thailand-grand-opening-og`;
    const ogImageDir = `./public/images/og`;
    const imagePath = `${ogImageDir}/${imageName}.png`;
    const publicPath = `${process.env.BASE_URL}/images/og/${imageName}.png`;

    const config = {
        templateBody: `
            <div class="main">
                <h4>กำลังเปิดประเทศในอีก</h4>
                <h1>${day} วัน</h1>
                <p>${time}</p>
                <span>${desc}</span>
            </div> 
            <style>
                .main { 
                    color: #FFFFFF;
                    width: 100%;
                    height: 100vh;
                    background-image: url('${process.env.BASE_URL}/images/uncle.png');
                    background-size: cover;
                    align-items: center;
                    display: flex;
                    margin: 0;
                    justify-content: center;
                    text-align: center;
                    flex-direction: column;
                }

                .main h1 {
                    font-size: 220px !important; 
                    font-weight: bold;
                    margin: 10px 0;
                }
                     
                .main h4 {
                    font-size: 60px !important; 
                    margin: 6px 0;
                }
                
                .main p {
                    font-size: 60px !important; 
                    margin: 10px 0;
                    opacity: 0.8;
                }
            </style>
        `,
        output: imagePath,
        size: "facebook"
    }

    console.log(config);

    renderSocialImage(config);

    return `${publicPath}?id=${moment.tz('Asia/Bangkok').valueOf()}`;
};