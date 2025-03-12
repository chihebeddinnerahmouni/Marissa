import {toast} from "react-hot-toast";

export const axios_toast_error = (error: any, t: any) => {
  const axiosError = error as any;
  const message =
    axiosError.message === "Network Error"
      ? t("network_error")
      : t(axiosError.response.data.message) || t("something_went_wrong");
    toast.error(message, {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });   
};
