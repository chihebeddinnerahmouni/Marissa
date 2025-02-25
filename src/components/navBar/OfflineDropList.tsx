// import Language from "./Mobile/Language";
// import { IoIosHelpCircleOutline } from "react-icons/io";
// // import { IoBoatSharp } from "react-icons/io5";
// import { IoBoatOutline } from "react-icons/io5";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// // import { FaHome } from "react-icons/fa";
// import { AiOutlineHome } from "react-icons/ai";
// import { FaRegUserCircle } from "react-icons/fa";
// import { PiSignIn } from "react-icons/pi";
// import Swal from "sweetalert2";
// import isLoggedIn from "@/lib/isLogedin";
// import { useNavigate } from "react-router-dom";


// // not used


// const OfflineDropList = ({setIsMenuOpen}: any) => {

//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col gap-3">
//       {/* <Explore /> */}

//       {/* <hr className="lg:hidden" /> */}

//       <Language />

//       <hr className="lg:hidden" />

//       <Link
//         to={"/?page=1"}
//         onClick={() => setIsMenuOpen(false)}
//         className="w-full flex items-center gap-2 text-writingMainDark"
//       >
//         <AiOutlineHome className="text-[20px]" />
//         <p>{t("home")}</p>
//       </Link>

//       <hr />

//       <a
//         className="w-full flex items-center gap-2 text-writingMainDark cursor-pointer"
//         onClick={() => {
//           if (!isLoggedIn()) {
//             Swal.fire({
//               icon: "error",
//               title: t("ops"),
//               text: t("you_need_to_login_first"),
//               timer: 5000,
//               timerProgressBar: true,
//               showConfirmButton: true,
//               confirmButtonText: "Login",
//               customClass: {
//                 confirmButton: "custom-confirm-button",
//               },
//               preConfirm: () => {
//                 navigate(`/login`);
//               },
//             });
//             setIsMenuOpen(false);
//             return;
//           }
//           window.open(`/boats-list/who-are-you`, "_blank");
//           setIsMenuOpen(false);
//         }}
//       >
//         <IoBoatOutline className="text-[20px]" />
//         <p>{t("list_your_boats")}</p>
//       </a>

//       <hr />

//       <a
//         href={"/help"}
//         target="_blank"
//         onClick={() => setIsMenuOpen(false)}
//         className="w-full flex items-center gap-2 text-writingMainDark cursor-pointer"
//       >
//         <IoIosHelpCircleOutline className="text-[20px]" />
//         <span>{t("help")}</span>
//       </a>

//       <hr />

//       <Link
//         to={"/register"}
//         className="w-full flex items-center gap-2 text-writingMainDark"
//         onClick={() => setIsMenuOpen(false)}
//       >
//         <FaRegUserCircle className="text-[20px]" />
//         <span>{t("register")}</span>
//       </Link>

//       <hr />

//       <Link
//         to={"/login"}
//         onClick={() => setIsMenuOpen(false)}
//         className="w-full flex items-center gap-2 text-writingMainDark"
//       >
//         <PiSignIn className="text-[20px]" />
//         <span>{t("login")}</span>
//       </Link>
//     </div>
//   );
// };

// export default OfflineDropList;
