import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputEmail from "../ui/inputs/InputEmail";
import InputPassword from "../ui/inputs/InputPassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ButtonFunc from "../ui/buttons/Button";
import InputText from "../ui/inputs/InputText";
import InputTel from "../ui/inputs/InputTel";
import AuthLayout from "../../Layout/authLayout";
import { axios_error_handler } from "../../functions/axios_error_handler";


const url = import.meta.env.VITE_SERVER_URL_USERS;
const signInFunction = async (values: any) => {
  const { data } = await axios.post(`${url}/api/user/register`, {
    email: values.email,
    password: values.password,
    phoneNumber: values.phone,
    name: values.name,
    surname: values.surname,
  });
  return data;
};

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signInFunction,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.token);
      navigate("/?page=1");
    },
    onError: (error: any) => {
      axios_error_handler(error, t);
    }
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("name_is_required")),
      surname: Yup.string().required(t("surname_is_required")),
      phone: Yup.string().required(t("phone_is_required")),
      email: Yup.string()
        .required(t("email_is_required"))
        .email(t("enter_valid_email")),
      password: Yup.string().required(t("password_is_required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("passwords_do_not_match"))
        .required(t("confirm_password_is_required")),
    }),
    onSubmit: () => {
      mutate(formik.values);
    },
  });

  return (
    <AuthLayout title={t("register")}>
        <form
          className="all flex flex-col items-center w-full px-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="fields grid grid-cols-2 gap-5 mt-5 mdgrid-cols-2">
            <FieldComp
              Component={InputText}
              value={formik.values.name}
              setValue={formik.handleChange("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              label="name"
            />
            <FieldComp
              Component={InputText}
              value={formik.values.surname}
              setValue={formik.handleChange("surname")}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
              label="surname"
            />
            <FieldComp
              Component={InputEmail}
              value={formik.values.email}
              setValue={formik.handleChange("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              label="email"
            />
            <FieldComp
              Component={InputTel}
              value={formik.values.phone}
              setValue={formik.handleChange("phone")}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              label="phone"
            />
            <FieldComp
              Component={InputPassword}
              value={formik.values.password}
              setValue={formik.handleChange("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="password"
            />
            <FieldComp
              Component={InputPassword}
              value={formik.values.confirmPassword}
              setValue={formik.handleChange("confirmPassword")}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              label="confirm_password"
            />
            <div className="buttons flex flex-col w-full col-span-2">
              <ButtonFunc type="submit" text={t("login")} loading={isPending} />
            </div>
          </div>
        </form>
      <SignInPart />
    </AuthLayout>

  );
};

export default Signup;

const SignInPart = () => {
  const { t } = useTranslation();
  return (
    <div className="login text-xs w-[370px] mt-5 flex justify-center gap-1">
      <p className="text-writingMainDark">{t("you_already_have_account")}</p>
      <Link to="/login" className="text-main font-semibold underline">
        {t("login")}
      </Link>
    </div>
  );
};

const FieldComp = ({
  Component,
  value,
  setValue,
  error,
  helperText,
  label,
}: any) => {
  const { t } = useTranslation();
  return (
    <Component
      label={t(label)}
      value={value}
      setValue={setValue}
      error={error}
      helperText={helperText}
    />
  );
};
