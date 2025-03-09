// import { CiFacebook } from "react-icons/ci";
// import { FaInstagram } from "react-icons/fa";
// // import { IoShieldCheckmarkOutline } from "react-icons/io5";

// const mainColor = "#199B8A";
// const socialMedia = [
//   {
//     name: "Facebook",
//     url: "#",
//     icon: CiFacebook,
//   },
//   {
//     name: "Instagram",
//     url: "#",
//     icon: FaInstagram,
//   },
// ];

// const urls = [
//   {
//     name: "About",
//     url: "#",
//   },
//   {
//     name: "Support",
//     url: "#",
//   },
//   {
//     name: "Services",
//     url: "#",
//   },
//   {
//     name: "History",
//     url: "#",
//   },
//   {
//     name: "Sponsor",
//     url: "#",
//   },
//   {
//     name: "Blog",
//     url: "#",
//   },
// ];

// function Footer() {
//   return (
//     <footer className="shield-container relative mt-20  bg-red200 w-full text-white h-[500px] md:h-[440px]">
//       <CurvedShape />
//       <ShieldComp />
//       <FooterInfos />
//     </footer>
//   );
// }

// export default Footer;

// const ShieldComp = () => {
//   return (
//     <div className="absolute bg-red200 w-[100px] flex justify-center items-center top-[-30px] left-1/2 -translate-x[70px] -translate-x-1/2">
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//         {/* <defs>
//   <linearGradient id="gradientShield" x1="0%" y1="0%" x2="0%" y2="100%">
//     <stop offset="0%" stopColor="rgb(255, 255, 255)" />
//     <stop offset="25%" stopColor="rgb(255, 200, 200)" />
//     <stop offset="50%" stopColor="rgb(255, 150, 150)" />
//     <stop offset="75%" stopColor="rgb(255, 100, 100)" />
//     <stop offset="100%" stopColor={mainColor} />
//   </linearGradient>
// </defs> */}
//         <path
//           d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"
//           // fill="url(#gradientShield)"
//           fill={mainColor}
//           stroke="white"
//           strokeWidth="10"
//         />
//       </svg>
//       {/* <div className="absolute">
//       <p className="text-black ">nf,</p>
//     </div> */}
//     </div>
//   );
// };

// const CurvedShape = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 -200 2332 1145"
//       preserveAspectRatio="none"
//       className="absolute w-full h-full"
//       stroke={mainColor}
//       strokeWidth="1"
//     >
//       <defs>
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor={"#FFFFFF"} />
//           <stop offset="100%" stopColor={mainColor} />
//         </linearGradient>
//       </defs>
//       <path
//         d="M0 0 3 940 2332 940 2332 0C1781-27 1373-88 1166-173 955-89 420-26-1 1"
//         fill="url(#gradient)"
//       />
//     </svg>
//   );
// };

// const FooterInfos = () => {
//   return (
//     <div className="footerInfos max-w-[800px] mx-auto absolute bottom-[20px] left-0 right-0 wfull bg-red200 px-4 md:px-20">
//       <div className="flex w-full flex-col items-center justify-center gap-4">
//         <img
//           src="/logo.png"
//           alt="logo"
//           width={200}
//           height={100}
//           className="mb-4"
//         />
//         <p className="mx-auto max-wmd text-center leading-relaxed text-mainDark">
//           Nous sommes une équipe de professionnels passionnés par ce que nous
//           faisons. Notre objectif est de fournir le meilleur service à nos
//           clients.
//         </p>
//       </div>

//       <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
//         {urls.map((url) => (
//           <li key={url.name}>
//             <a
//               className="text-gray-700 transition hover:text-gray-700/75"
//               href={url.url}
//             >
//               {url.name}
//             </a>
//           </li>
//         ))}
//       </ul>

//       <ul className="mt-12 flex justify-center gap-6 md:gap-8">
//         {socialMedia.map((social) => {
//           const Icon = social.icon;
//           return (
//             <li key={social.name}>
//               <button>
//                 <Icon className="text-xl text-gray-600 hover:text-mainHover transition-all duration-300 ease-in-out" />
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//       <p className="mt-8 text-center text-xs text-black">
//         &copy; {new Date().getFullYear()} Medicare. All rights reserved.
//       </p>
//     </div>
//   );
// };




import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
// import { IoShieldCheckmarkOutline } from "react-icons/io5";

// const mainColor = "#199B8A";
const socialMedia = [
  {
    name: "Facebook",
    url: "#",
    icon: CiFacebook,
  },
  {
    name: "Instagram",
    url: "#",
    icon: FaInstagram,
  },
];

// const urls = [
//   {
//     name: "About",
//     url: "#",
//   },
//   {
//     name: "Support",
//     url: "#",
//   },
//   {
//     name: "Services",
//     url: "#",
//   },
//   {
//     name: "History",
//     url: "#",
//   },
//   {
//     name: "Sponsor",
//     url: "#",
//   },
//   {
//     name: "Blog",
//     url: "#",
//   },
// ];

function Footer() {
  return (
    <footer
      className="w-full text-writingMainDark mt10 pb-10 bg-creme pt-5"
    >
      <div className="footerInfos bg-red200 w-full px-4 md:px-20">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <img
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="mx-auto max-wmd text-center leading-relaxed text-mainDark">
            We are a team of professionals passionate about what we do. Our goal
            is to provide the best service to our customers.
          </p>
        </div>

        {/* <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {urls.map((url) => (
            <li key={url.name}>
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href={url.url}
              >
                {url.name}
              </a>
            </li>
          ))}
        </ul> */}

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {socialMedia.map((social) => {
            const Icon = social.icon;
            return (
              <li key={social.name}>
                <button>
                  <Icon className="text-xl text-gray-600 hover:text-mainHover transition-all duration-300 ease-in-out" />
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-xs text-black">
          &copy; {new Date().getFullYear()} Marisa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;


// const FooterInfos = () => {
//   return (
//     <div className="footerInfos bg-red-200 w-full px-4 md:px-20">
//       <div className="flex w-full flex-col items-center justify-center gap-4">
//         <img
//           src="/logo.png"
//           alt="logo"
//           width={100}
//           height={100}
//           className="mb-4"
//         />
//         <p className="mx-auto max-wmd text-center leading-relaxed text-mainDark">
//           Nous sommes une équipe de professionnels passionnés par ce que nous
//           faisons. Notre objectif est de fournir le meilleur service à nos
//           clients.
//         </p>
//       </div>

//       <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
//         {urls.map((url) => (
//           <li key={url.name}>
//             <a
//               className="text-gray-700 transition hover:text-gray-700/75"
//               href={url.url}
//             >
//               {url.name}
//             </a>
//           </li>
//         ))}
//       </ul>

//       <ul className="mt-12 flex justify-center gap-6 md:gap-8">
//         {socialMedia.map((social) => {
//           const Icon = social.icon;
//           return (
//             <li key={social.name}>
//               <button>
//                 <Icon className="text-xl text-gray-600 hover:text-mainHover transition-all duration-300 ease-in-out" />
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//       <p className="mt-8 text-center text-xs text-black">
//         &copy; {new Date().getFullYear()} Medicare. All rights reserved.
//       </p>
//     </div>
//   );
// };
