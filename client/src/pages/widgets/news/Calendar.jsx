import React from 'react';
import { Fundamentals } from './Fundamentals';

const Calendar = () => {

    return (
        <div className='max-w-full w-full h-screen'>
            <Fundamentals />
        </div>
    );
};

// const temp = () => {
//     return (
//         <>
//             <div class="tradingview-widget-container">
//                 <div class="tradingview-widget-container__widget"></div>
//                 <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
//                 <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>
//                     {
//                         "width": "100%",
//                     "height": "100%",
//                     "colorTheme": "light",
//                     "isTransparent": true,
//                     "locale": "en",
//                     "importanceFilter": "-1,0,1",
//                     "countryFilter": "us,ca,eu,ru,de,gb,ch,sa,au,nz,cn,in,jp,kr"
// }
//                 </script>
//             </div>
//         </>
//     )
// }

export default Calendar;
