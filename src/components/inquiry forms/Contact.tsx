import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InquiryContext } from "../../Layout/InquiryLayout";
import axios from "axios";
// import Swal from "sweetalert2";
import InputText from "../ui/inputs/InputText";
import InputEmail from "../ui/inputs/InputEmail";
import InputTel from "../ui/inputs/InputTel";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonFunc from "../ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import {axios_error_handler} from "../../functions/axios_error_handler"
import { toast } from "react-hot-toast";

const sendData = async (data: any) => {
  const url = import.meta.env.VITE_SERVER_URL_INQUIRY;
  const response = await axios.post(`${url}/api/inquiry/inquiries`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response.data;
}


const Contact = () => {

  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setProgress } = useContext(InquiryContext);

  useEffect(() => {
    setProgress((100/6)*6);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      sessionStorage.clear();
      navigate(`/inquiry/${boatId}/done`);
    },
    onError: (error: any) => {
      axios_error_handler(error, t);
    }
    })
  

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t("name_is_required")),
      lastName: Yup.string().required(t("surname_is_required")),
      email: Yup.string()
        .email(t("enter_valid_email"))
        .required(t("email_is_required")),
      phone: Yup.string().required(t("phone_is_required")),
    }),
    onSubmit: () => {
      nextHandler();
    },
  });





  const nextHandler = () => { 
    const inquiry_duration_hours = sessionStorage.getItem("inquiry_duration_hours");
    const inquiry_duration_minutes = sessionStorage.getItem("inquiry_duration_minutes");
    const inquiry_duration_nights = sessionStorage.getItem("inquiry_duration_nights");
    const inquiry_date = sessionStorage.getItem("inquiry_date");
    const inquiry_departure = sessionStorage.getItem("inquiry_departure");
    const inquiry_groupe_adultes = sessionStorage.getItem("inquiry_groupe_adultes");
    const inquiry_groupe_childrens = sessionStorage.getItem("inquiry_groupe_childrens");
    const inquiry_groupe_infants = sessionStorage.getItem("inquiry_groupe_infants");
    const inquiry_extra = sessionStorage.getItem("inquiry_extra");
    
    const array = [inquiry_duration_hours, inquiry_duration_minutes, inquiry_duration_nights, inquiry_date, inquiry_departure, inquiry_groupe_adultes, inquiry_groupe_childrens, inquiry_groupe_infants];
    const check = array.some((item) => !item);
    if (check) return toast.error(t("please_fill_all_required_fields_in_previous_steps"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    const data = {
      listing_id: boatId,
      tripType: Number(inquiry_duration_nights) > 0 ? "overnight" : "same day",
      duration: {
        hours: inquiry_duration_hours,
        minutes: inquiry_duration_minutes,
        nights: inquiry_duration_nights,
      },
      preferredDate: inquiry_date,
      departureTime: inquiry_departure,
      groupSize: {
        adults: inquiry_groupe_adultes,
        seniors: 1,
        children: inquiry_groupe_childrens,
        infants: inquiry_groupe_infants,
      },
      additionalInfo: inquiry_extra,
      contactDetails: {
        name: formik.values.firstName + " " + formik.values.lastName,
        email: formik.values.email,
        phone: formik.values.phone,
      },
      status: "pending",
    };
    mutate(data);
    };


  return (
    <div className="all flex flex-col items-center">
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("your_contact_details")}*
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-5 mt-10">
        <div className="names flex w-[320px] gap-2">
          <InputText
            value={formik.values.firstName}
            setValue={formik.handleChange("firstName")}
            label={t("first_name")}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <InputText
            value={formik.values.lastName}
            setValue={formik.handleChange("lastName")}
            label={t("last_name")}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        <InputEmail
          value={formik.values.email}
          setValue={formik.handleChange("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          label={t("email")}
        />
        <InputTel
          value={formik.values.phone}
          setValue={formik.handleChange("phone")}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          label={t("phone")}
        />

        <div className="w-[320px] bg-mainBlue text-white bg-main rounded-[5px] mt-10">
          <ButtonFunc loading={isPending} text={t("done")} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Contact;
