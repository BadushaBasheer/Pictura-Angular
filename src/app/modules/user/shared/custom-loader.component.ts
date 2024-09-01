import {Component} from '@angular/core';

// @Component({
//     selector: 'custom-loader',
//     template: `
//         <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
//                     <stop offset="0%" stop-color="hsl(313,90%,55%)"/>
//                     <stop offset="100%" stop-color="hsl(223,90%,55%)"/>
//                 </linearGradient>
//                 <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stop-color="hsl(313,90%,55%)"/>
//                     <stop offset="100%" stop-color="hsl(223,90%,55%)"/>
//                 </linearGradient>
//             </defs>
//             <circle class="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36"
//                     stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round"
//                     transform="rotate(-90,100,100)"/>
//             <line class="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36"
//                   stroke-dasharray="1 165" stroke-linecap="round"/>
//         </svg>
//     `,
//     styles: [
//         `
//             * {
//                 border: 0;
//                 box-sizing: border-box;
//                 margin: 0;
//                 padding: 0;
//             }
//
//             :root {
//                 --hue: 223;
//                 --bg: hsl(var(--hue), 10%, 90%);
//                 --fg: hsl(var(--hue), 10%, 10%);
//                 font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1280 - 320));
//             }
//
//             body {
//                 background: var(--bg);
//                 color: var(--fg);
//                 font: 1em/1.5 sans-serif;
//                 height: 100vh;
//                 display: grid;
//                 place-items: center;
//             }
//
//             .pl {
//                 display: block;
//                 width: 6.25em;
//                 height: 6.25em;
//             }
//
//             .pl__ring, .pl__ball {
//                 animation: ring 2s ease-out infinite;
//             }
//
//             .pl__ball {
//                 animation-name: ball;
//             }
//
//             /* Dark theme  */
//             @media (prefers-color-scheme: dark) {
//                 :root {
//                     --bg: hsl(var(--hue), 10%, 10%);
//                     --fg: hsl(var(--hue), 10%, 90%);
//                 }
//             }
//
//             /* Animation */
//             @keyframes ring {
//                 from {
//                     stroke-dasharray: 0 257 0 0 1 0 0 258;
//                 }
//                 25% {
//                     stroke-dasharray: 0 0 0 0 257 0 258 0;
//                 }
//                 50%, to {
//                     stroke-dasharray: 0 0 0 0 0 515 0 0;
//                 }
//             }
//
//             @keyframes ball {
//                 from, 50% {
//                     animation-timing-function: ease-in;
//                     stroke-dashoffset: 1;
//                 }
//                 64% {
//                     animation-timing-function: ease-in;
//                     stroke-dashoffset: -109;
//                 }
//                 78% {
//                     animation-timing-function: ease-in;
//                     stroke-dashoffset: -145;
//                 }
//                 92% {
//                     animation-timing-function: ease-in;
//                     stroke-dashoffset: -157;
//                 }
//                 57%, 71%, 85%, 99%, to {
//                     animation-timing-function: ease-out;
//                     stroke-dashoffset: -163;
//                 }
//             }
//         `
//     ]
// })
// export class CustomLoaderComponent {
//
// }


// @Component({
//     selector: 'custom-loader',
//     template: `
//         <div class="loader">
//             <svg viewBox="0 0 80 80">
//                 <circle id="test" cx="40" cy="40" r="32"></circle>
//             </svg>
//         </div>
//
//         <div class="loader triangle">
//             <svg viewBox="0 0 86 80">
//                 <polygon points="43 8 79 72 7 72"></polygon>
//             </svg>
//         </div>
//
//         <div class="loader">
//             <svg viewBox="0 0 80 80">
//                 <rect x="8" y="8" width="64" height="64"></rect>
//             </svg>
//         </div>
//
//         <!-- dribbble -->
//         <a class="dribbble" href="https://dribbble.com/shots/5878367-Loaders" target="_blank"><img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt=""></a>
//     `,
//     styles: [
//         `
//             .loader {
//                 --path: #ffffff;
//                 --dot: #5628EE;
//                 --duration: 3s;
//                 width: 44px;
//                 height: 44px;
//                 position: relative;
//
//                 &:before {
//                     content: '';
//                     width: 6px;
//                     height: 6px;
//                     border-radius: 50%;
//                     position: absolute;
//                     display: block;
//                     background: var(--dot);
//                     top: 37px;
//                     left: 19px;
//                     transform: translate(-18px, -18px);
//                     animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
//                 }
//
//                 svg {
//                     display: block;
//                     width: 100%;
//                     height: 100%;
//
//                     rect,
//                     polygon,
//                     circle {
//                         fill: none;
//                         stroke: var(--path);
//                         stroke-width: 10px;
//                         stroke-linejoin: round;
//                         stroke-linecap: round;
//                     }
//
//                     polygon {
//                         stroke-dasharray: 145 (221 - 145) 145 (221 - 145);
//                         stroke-dashoffset: 0;
//                         animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
//                     }
//
//                     rect {
//                         stroke-dasharray: (256 / 4 * 3) (256 / 4) (256 / 4 * 3) (256 / 4);
//                         stroke-dashoffset: 0;
//                         animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
//                     }
//
//                     circle {
//                         stroke-dasharray: (200 / 4 * 3) (200 / 4) (200 / 4 * 3) (200 / 4);
//                         stroke-dashoffset: 75;
//                         animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
//                     }
//                 }
//
//                 &.triangle {
//                     width: 48px;
//
//                     &:before {
//                         left: 21px;
//                         transform: translate(-10px, -18px);
//                         animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
//                     }
//                 }
//             }
//
//             @keyframes pathTriangle {
//                 33% {
//                     stroke-dashoffset: 74;
//                 }
//                 66% {
//                     stroke-dashoffset: 147;
//                 }
//                 100% {
//                     stroke-dashoffset: 221;
//                 }
//             }
//
//             @keyframes dotTriangle {
//                 33% {
//                     transform: translate(0, 0);
//                 }
//                 66% {
//                     transform: translate(10px, -18px);
//                 }
//                 100% {
//                     transform: translate(-10px, -18px);
//                 }
//             }
//
//             @keyframes pathRect {
//                 25% {
//                     stroke-dashoffset: 64;
//                 }
//                 50% {
//                     stroke-dashoffset: 128;
//                 }
//                 75% {
//                     stroke-dashoffset: 192;
//                 }
//                 100% {
//                     stroke-dashoffset: 256;
//                 }
//             }
//
//             @keyframes dotRect {
//                 25% {
//                     transform: translate(0, 0);
//                 }
//                 50% {
//                     transform: translate(18px, -18px);
//                 }
//                 75% {
//                     transform: translate(0, -36px);
//                 }
//                 100% {
//                     transform: translate(-18px, -18px);
//                 }
//             }
//
//             @keyframes pathCircle {
//                 25% {
//                     stroke-dashoffset: 125;
//                 }
//                 50% {
//                     stroke-dashoffset: 175;
//                 }
//                 75% {
//                     stroke-dashoffset: 225;
//                 }
//                 100% {
//                     stroke-dashoffset: 275;
//                 }
//             }
//
//             .loader {
//                 display: inline-block;
//                 margin: 0 16px;
//             }
//
//             html {
//                 -webkit-font-smoothing: antialiased;
//             }
//
//             * {
//                 box-sizing: border-box;
//
//                 &:before,
//                 &:after {
//                     box-sizing: border-box;
//                 }
//             }
//
//             // Center & dribbble
//             body {
//                 min-height: 100vh;
//                 background: #F5F9FF;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//
//                 .dribbble {
//                     position: fixed;
//                     display: block;
//                     right: 20px;
//                     bottom: 20px;
//
//                     img {
//                         display: block;
//                         height: 28px;
//                     }
//                 }
//             }
//
//         `
//     ]
// })
// export class CustomLoaderComponent {
//
// }


@Component({
    selector: 'custom-loader',
    template: `
        <div class="loader"></div>

    `,
    styles:[
        `
            html, body {
                height: 100%;
            }

            body {
                align-items: center;
                background-color: #1D1F20;
                display: flex;
                justify-content: center;
            }

            .loader  {
                animation: rotate 1s infinite;
                height: 50px;
                width: 50px;
            }

            .loader:before,
            .loader:after {
                border-radius: 50%;
                content: '';
                display: block;
                height: 20px;
                width: 20px;
            }
            .loader:before {
                animation: ball1 1s infinite;
                background-color: #cb2025;
                box-shadow: 30px 0 0 #f8b334;
                margin-bottom: 10px;
            }
            .loader:after {
                animation: ball2 1s infinite;
                background-color: #00a096;
                box-shadow: 30px 0 0 #97bf0d;
            }

            @keyframes rotate {
                0% {
                    -webkit-transform: rotate(0deg) scale(0.8);
                    -moz-transform: rotate(0deg) scale(0.8);
                }
                50% {
                    -webkit-transform: rotate(360deg) scale(1.2);
                    -moz-transform: rotate(360deg) scale(1.2);
                }
                100% {
                    -webkit-transform: rotate(720deg) scale(0.8);
                    -moz-transform: rotate(720deg) scale(0.8);
                }
            }

            @keyframes ball1 {
                0% {
                    box-shadow: 30px 0 0 #f8b334;
                }
                50% {
                    box-shadow: 0 0 0 #f8b334;
                    margin-bottom: 0;
                    -webkit-transform: translate(15px,15px);
                    -moz-transform: translate(15px, 15px);
                }
                100% {
                    box-shadow: 30px 0 0 #f8b334;
                    margin-bottom: 10px;
                }
            }

            @keyframes ball2 {
                0% {
                    box-shadow: 30px 0 0 #97bf0d;
                }
                50% {
                    box-shadow: 0 0 0 #97bf0d;
                    margin-top: -20px;
                    -webkit-transform: translate(15px,15px);
                    -moz-transform: translate(15px, 15px);
                }
                100% {
                    box-shadow: 30px 0 0 #97bf0d;
                    margin-top: 0;
                }
            }
        `
    ]
})
export class CustomLoaderComponent {

}
