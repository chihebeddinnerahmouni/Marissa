
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";


const Pay = ({ details }: any) => {

    const { t } = useTranslation();


    const pay = () => {
      const url = import.meta.env.VITE_SERVER_URL_LISTING;
      axios
        .patch(
          `${url}/api/payment/inquiry/${details[0].conversationId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then(() => {
          // console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            Swal.fire({
              icon: "error",
              title: t("network_error"),
              text: t("please_try_again"),
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
          }
        });
    };
  return (
    <>
      <div
        className="w-full"
        style={{
          minHeight: "calc(100vh - 270px)",
        }}
      >
        <button onClick={pay}>pay</button>
      </div>
    </>
  );
}

export default Pay
