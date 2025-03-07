import { useTranslation } from "react-i18next"
import AuthLayout from "../../Layout/authLayout"
import InputEmail from "../ui/inputs/InputEmail"
import ButtonFunc from "../ui/buttons/Button"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation }from "@tanstack/react-query";


const sendData = async (values: any) => {
  console.log(values.email);
}

const ForgetPassword = () => {
  const { t } = useTranslation()
  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  })
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(t("email_is_required"))
        .email(t("enter_valid_email")),
    }),
    onSubmit: () => {
      mutate(formik.values);
    },
  });

    const send = () => {
       
    }

  return (
    <AuthLayout
      title={t("forgot_your_password?")}
      subTitle={t("send_reset_link")}
    >
      <div className="all flex flex-col items-center mt-5 w-[320px] space-y-5">
        <InputEmail
          value={formik.values.email}
          setValue={formik.handleChange("email")}
          label="email"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <ButtonFunc text={t("send_email")} onClick={send} loading={isPending} />
      </div>
    </AuthLayout>
  );
}

export default ForgetPassword
