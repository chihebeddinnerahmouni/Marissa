import Swal from "sweetalert2";

export const axios_error_handler = (error: any, t: any) => {
  const axiosError = error as any;
  const message =
    axiosError.message === "Network Error"
      ? t("network_error")
      : t(axiosError.response.data.message) || t("something_went_wrong");
  Swal.fire({
    icon: "error",
    title: t("ops"),
    text: t(message),
    showConfirmButton: false,
  });
};
