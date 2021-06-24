export function ogTemplate(day, time, desc) {
    return `     
    <div class="main">
        <h4>กำลังเปิดประเทศในอีก</h4>
        <h1>${day}</h1>
        <p>${time}</p>
        <span>${desc}</span>
    </div> 
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Chonburi&display=swap');
        .main { 
            font-family: Chonburi;
            color: #FFFFFF;
            width: 100%;
            height: 100%;
            background-image: url('${process.env.BASE_URL}/images/uncle.png');
            background-size: cover;
            align-items: center;
            display: flex;
            margin: 0;
            padding: 0;
            left: 0;
            right: 0;
            top: 0;
            justify-content: center;
            text-align: center;
            flex-direction: column;
        }
        
        .main h1 {
            font-size: 220px !important; 
            font-weight: bold;
            margin: 6px 0;
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
    `
};