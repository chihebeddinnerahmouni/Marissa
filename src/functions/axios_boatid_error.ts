import Swal from "sweetalert2";

export const axios_boatid_error = (error: any, t: any) => {
  const axiosError = error as any;
  if (axiosError.status === 404) {
    return Swal.fire({
      icon: "error",
      title: t("ops"),
      text: t("theres_no_boat_match_this_id"),
      showConfirmButton: false,
    });
    }
    const message = axiosError.message === "Network Error" ? t("network_error") : axiosError.response.data.message;
    Swal.fire({
      icon: "error",
      title: t("ops"),
      text: t(message),
      showConfirmButton: false,
    });
};
