// import { useTranslation } from "react-i18next";
// import { FaChevronUp } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";
// import { useState } from "react";
// import { LuSendHorizonal } from "react-icons/lu";
// import { MdOutlineCancel } from "react-icons/md";
// import { FaCheck } from "react-icons/fa6";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import { MdOutlineStopCircle } from "react-icons/md";
// import { FaRegStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// const ButtomTrip = ({ setSelected, details }: any) => {
//   const { t, i18n } = useTranslation();
//   const [isOptionsOn, setIsOptionsOn] = useState(false);

//   return (
//     <div
//       className={`w-full absolute px-4 h-[60px] bg-creme shadowhoverShadow bottom-0 py-2 lg:h-[70px] flex justify-center items-center lg:ml-[0px] lg:w-auto  ${
//         i18n.language === "ar"
//           ? "lg:left-0 lg:right-[350px]"
//           : "lg:right-0 lg:left-[350px]"
//         }`}
//       style={{boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)"}}
//     >
//       <button
//         className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
//         onClick={() => setIsOptionsOn(!isOptionsOn)}
//       >
//         {t("options")}{" "}
//         {isOptionsOn ? (
//           <FaChevronDown className="inline-block ml-2" />
//         ) : (
//           <FaChevronUp className="inline-block ml-2" />
//         )}
//         {isOptionsOn && details.status !== "cancelled" && <Options setSelected={setSelected} details={details} />}
//       </button>
//     </div>
//   );
// };

// export default ButtomTrip;

// const Options = ({ setSelected, details }: any) => {

//   const { i18n, t } = useTranslation();
//   const url = import.meta.env.VITE_SERVER_URL_LISTING;
//   const { inboxId } = useParams();
//   const navigate = useNavigate();
//   const isBoatOwner = useSelector((state: RootState) => state.user.user.isBoatOwner);

//   // console.log(details);

//   const acceptInquiry = () => {
//     axios
//       .post(`${url}/api/bookings/from-inquiry/${inboxId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       })
//       .then(() => {
//         window.location.reload();
//       })
//       .catch((err) => {
//         if (err.message === "Network Error") {
//           Swal.fire({
//             icon: "error",
//             title: t("network_error"),
//             text: t("please_try_again"),
//             customClass: {
//               confirmButton: "custom-confirm-button",
//             },
//           });
//         }
//       });
//   }

//   const cancel = () => {
//   const isBoatOwner = useSelector(
//     (state: RootState) => state.user.user.isBoatOwner
//   );
//     if (isBoatOwner) {
//       axios
//         .patch(
//           `${url}/api/bookings/inquiries/${inboxId}/cancel`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//             },
//           }
//         )
//         .then(() => {
//           window.location.reload();
//           Swal.fire({
//             icon: "success",
//             title: t("inquiry_cancelled"),
//             customClass: {
//               confirmButton: "custom-confirm-button",
//             },
//           });
//         })
//         .catch((err) => {
//           if (err.message === "Network Error") {
//             Swal.fire({
//               icon: "error",
//               title: t("network_error"),
//               text: t("please_try_again"),
//               customClass: {
//                 confirmButton: "custom-confirm-button",
//               },
//             });
//           }
//         });
//     } else {
//       axios
//         .get(
//           `${url}/api/bookings/inquiries/${inboxId}/cancel/user`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//             },
//           }
//         )
//         .then(() => {
//           window.location.reload();
//           Swal.fire({
//             icon: "success",
//             title: t("inquiry_cancelled"),
//             customClass: {
//               confirmButton: "custom-confirm-button",
//             },
//           });
//         })
//         .catch((err) => {
//           if (err.message === "Network Error") {
//             Swal.fire({
//               icon: "error",
//               title: t("network_error"),
//               text: t("please_try_again"),
//               customClass: {
//                 confirmButton: "custom-confirm-button",
//               },
//             });
//           }
//         });
//      }
//   }

//   const serviceEnd = () => {
//     // Cannot finish booking as the end date has not yet passed
//     axios
//       .patch(
//         `${url}/api/bookings/inquiries/${inboxId}/finish`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       )
//       .then(() => {
//         window.location.reload();
//         Swal.fire({
//           icon: "success",
//           title: t("service_ended"),
//           customClass: {
//             confirmButton: "custom-confirm-button",
//           },
//         });
//       })
//       .catch((err) => {
//         if (err.message === "Network Error") {
//           Swal.fire({
//             icon: "error",
//             title: t("network_error"),
//             text: t("please_try_again"),
//             customClass: {
//               confirmButton: "custom-confirm-button",
//             },
//           });
//         }
//         if (err.response.data.message === "Cannot finish booking as the end date has not yet passed") {
//           Swal.fire({
//             icon: "error",
//             title: t("ops"),
//             text: t("cannot_finish_booking_as_the_end_date_has_not_yet_passed"),
//             showConfirmButton: false,
//           });
//         }
//       });
//   }

//   return (
//     <div
//       className={`options absolute p-3 rounded-10 bg-white shadow-hardShadow text-writingMainDark bottom-[50px] flex flex-col gap-3 items-start lg:bottom-[60px] ${
//         i18n.language === "en" ? "left-0" : "right-0"
//       }`}
//     >
//       {/* messages */}
//       {/* {details.status !== "cancelled" && ( */}
//         <div
//         className="flex items-center h-full px-4 cursor-pointer gap-3"
//         onClick={() => setSelected("messages")}
//       >
//         <LuSendHorizonal className="text-2xl" />
//         <p className="">{t("send_message")}</p>
//       </div>
//       {/* )} */}

//       {/* accept */}
//       {isBoatOwner && details.status === "pending" && (
//         <>
//           <hr className="w-full border-1 border-gray-200" />

//           <div
//             className="flex items-center h-full px-4 cursor-pointer gap-3"
//             onClick={acceptInquiry}
//           >
//             <FaCheck className="text-2xl" />
//             <p className="">{t("accept_inquiry")}</p>
//           </div>
//         </>
//       )}

//       {/* cancel inquiry */}

//       {details.status === "pending" || details.status === "confirmed" ? (
//         <>
//           <hr className="w-full border-1 border-gray-200" />
//           <div
//             className="flex items-center h-full px-4 cursor-pointer gap-3"
//             onClick={cancel}
//           >
//             <MdOutlineCancel className="text-2xl" />
//             <p className="">{t("cancel_inquiry")}</p>
//           </div>
//         </>
//       ) : null}

//       {details.status === "ongoing" && isBoatOwner && (
//         <>
//           <hr className="w-full border-1 border-gray-200" />
//           <div
//             className="flex items-center h-full px-4 cursor-pointer gap-3"
//             onClick={serviceEnd}
//           >
//             <MdOutlineStopCircle className="text-2xl" />
//             <p className="">{t("end_of_service")}</p>
//           </div>
//         </>
//       )}

//       {details.status === "finished" && !isBoatOwner && (
//         <>
//           <hr className="w-full border-1 border-gray-200" />
//           <div
//             className="flex items-center h-full px-4 cursor-pointer gap-3"
//             onClick={() => navigate(`/review/${details.listingDetails.id}`)}
//           >
//             <FaRegStar className="text-2xl" />
//             <p className="">{t("evaluate")}</p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

import { useTranslation } from "react-i18next";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
// import { useTranslation } from "react-i18next";
import { LuSendHorizonal } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineStopCircle } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { axios_error_handler } from "@/functions/axios_error_handler";
import { IAuthUser } from "@/types/auth-user";

const url = import.meta.env.VITE_SERVER_URL_LISTING;
interface Props {
  setSelected: any;
  details: any;
}

const OptionsButton = ({ setSelected, details }: Props) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.user.user);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = anchorEl ? FaChevronUp : FaChevronDown;

  return (
    <div
      className={`w-full absolute px-4 h-[60px] bg-creme bottom-[-2px] py-2 lg:h-[70px] flex justify-center items-center lg:w-auto ${
        i18n.language === "ar"
          ? "lg:left-0 lg:right-[350px]"
          : "lg:right-0 lg:left-[350px]"
      }`}
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <button
        className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
        onClick={handleOpen}
      >
        {t("options")} <Icon className="inline-block ml-2" />
      </button>

      <Options
        anchorEl={anchorEl}
        handleClose={handleClose}
        details={details}
        setSelected={setSelected}
        user={user}
      />
    </div>
  );
};
export default OptionsButton;

const Options = ({
  anchorEl,
  handleClose,
  details,
  setSelected,
  user,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  details: any;
  setSelected: any;
  user: IAuthUser;
}) => {
  const { t } = useTranslation();
  const { inboxId } = useParams<{ inboxId: string }>();

  return (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Messages setSelected={setSelected} t={t} handleClose={handleClose} />
      {user.isBoatOwner && details.status === "pending" && (
        <Accept t={t} inboxId={inboxId} handleClose={handleClose} />
      )}
      {details.status === "pending" ||
        ("confirmed" && (
          <Cancel
            t={t}
            inboxId={inboxId}
            handleClose={handleClose}
            isBoatOwner={user.isBoatOwner}
          />
        ))}
      {details.status === "ongoing" && user.isBoatOwner && <ServiceEnd t={t} inboxId={inboxId} handleClose={handleClose} />}
      {details.status === "finished" && !user.isBoatOwner && <Finished t={t} details={details} />}
    </Menu>
  );
};

// options buttons
const Messages = ({
  t,
  setSelected,
  handleClose,
}: {
  t: any;
  setSelected: any;
  handleClose: any;
}) => {
  return (
    <MenuItem
      onClick={() => {
        handleClose();
        setSelected("messages");
      }}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <LuSendHorizonal className="text-2xl" />
        <p className="">{t("send_message")}</p>
      </div>
    </MenuItem>
  );
};

const Accept = ({
  t,
  inboxId,
  handleClose,
}: {
  t: any;
  inboxId: any;
  handleClose: any;
}) => {
  const acceptInquiry = () => {
    handleClose();
    acceptRefuse("post", `${url}/api/bookings/from-inquiry/${inboxId}`, t);
  };

  return (
    <MenuItem
      onClick={acceptInquiry}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <FaCheck className="text-2xl" />
        <p className="">{t("accept_inquiry")}</p>
      </div>
    </MenuItem>
  );
};

const Cancel = ({
  t,
  inboxId,
  handleClose,
  isBoatOwner,
}: {
  t: any;
  inboxId: any;
  handleClose: any;
  isBoatOwner: any;
}) => {
  const cancel = () => {
    handleClose();
    const route = isBoatOwner
      ? `${url}/api/bookings/inquiries/${inboxId}/cancel`
      : `${url}/api/bookings/inquiries/${inboxId}/cancel/user`;
    const method = isBoatOwner ? "patch" : "get";
    acceptRefuse(method, route, t);
  };

  return (
    <MenuItem
      onClick={cancel}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <MdOutlineCancel className="text-2xl" />
        <p className="">{t("cancel_inquiry")}</p>
      </div>
    </MenuItem>
  );
};

const ServiceEnd = ({
  t,
  inboxId,
  handleClose,
}: {
  t: any;
  inboxId: any;
  handleClose: any;
}) => {
  const serviceEnd = () => {
    handleClose();
    axios
      .patch(
        `${url}/api/bookings/inquiries/${inboxId}/finish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            showConfirmButton: false,
          });
        }
        if (
          err.response.data.message ===
          "Cannot finish booking as the end date has not yet passed"
        ) {
          Swal.fire({
            icon: "error",
            title: t("ops"),
            text: t("cannot_finish_booking_as_the_end_date_has_not_yet_passed"),
            showConfirmButton: false,
          });
        }
      });
  };

  return (
    <MenuItem
      onClick={serviceEnd}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <MdOutlineStopCircle className="text-2xl" />
        <p className="">{t("end_of_service")}</p>
      </div>
    </MenuItem>
  );
};

const Finished = ({ t, details }: { t: any; details: any }) => {
  const navigate = useNavigate();

  return (
    <MenuItem
      onClick={() => navigate(`/review/${details.listingDetails.id}`)}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <FaRegStar className="text-2xl" />
        <p className="">{t("evaluate")}</p>
      </div>
    </MenuItem>
  );
};

// helpers
const acceptRefuse = (method: any, route: string, t: any) => {
  axios({
    method: method,
    url: route,
    data: {},
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      axios_error_handler(error, t);
    });
};
