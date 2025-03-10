import { useTranslation } from "react-i18next";
import React from "react";
import axios from "axios";
import ModalComp from "@/components/ui/modals/ModalComp";
import InputText from "@/components/ui/inputs/InputText";
import InputEmail from "@/components/ui/inputs/InputEmail";
import MultiLine from "@/components/ui/inputs/MultiLine";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonFunc from "@/components/ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { axios_toast_error } from "@/functions/axios_toast_error";
import {toast} from "react-hot-toast";

interface ContactUsProps {
  setIsContactOpen: (value: boolean) => void;
}

const sendData = async (values: any) => {
  const url = import.meta.env.VITE_SERVER_URL_HELP;
  const res = await axios.post(`${url}/inquiries`, {
    email: values.email,
    subject: values.subject,
    content: values.description,
  });
  return res.data;
};

const ContactUs: React.FC<ContactUsProps> = ({ setIsContactOpen }) => {
  
  const { t } = useTranslation();
  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onError: (err) => {
      axios_toast_error(err, t);
    },
    onSuccess: () => {
      toast.success(t("great"));
      setIsContactOpen(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      description: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(t("email_is_required"))
        .email(t("enter_valid_email")),
      subject: Yup.string().required(t("enter_subject")),
      description: Yup.string().required(t("enter_description")),
    }),
    onSubmit: () => {
      mutate(formik.values);
    },
  });

  return (
    <ModalComp onClose={() => setIsContactOpen(false)}>
      <form onSubmit={formik.handleSubmit}>
        <div className="email w-full mb-3">
          <Title title={t("your_email_address")} />
          <InputEmail
            label={t("email")}
            value={formik.values.email}
            setValue={formik.handleChange("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        <div className="subject w-full mb-3">
          <Title title={t("subject")} />
          <InputText
            label={t("subject")}
            value={formik.values.subject}
            setValue={formik.handleChange("subject")}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
          />
        </div>

        <div className="description w-full mb-3">
          <Title title={t("description")} />
          <MultiLine
            label={t("description")}
            value={formik.values.description}
            setValue={formik.handleChange("description")}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <div className="w-full mt-5">
          <ButtonFunc type="submit" text={t("send")} loading={isPending} />
        </div>
      </form>
    </ModalComp>
  );
};

export default ContactUs;

const Title = ({ title }: { title: string }) => {
  return <p className="font-semibold text-sm mb-2 lg:text-base">{title}</p>;
};
