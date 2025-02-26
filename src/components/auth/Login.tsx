import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputEmail from "../ui/inputs/InputEmail";
import InputPassword from "../ui/inputs/InputPassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ButtonFunc from "../ui/buttons/Button";


const url = import.meta.env.VITE_SERVER_URL_USERS;
const signInFunction = async (values: any) => {
  const { data } = await axios.post(`${url}/api/user/signin`, {
    email: values.email,
    password: values.password,
  });
  return data;
};


const Login = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

   const formik = useFormik({
     initialValues: {
       email: "",
       password: "",
     },
     validationSchema: Yup.object({
       email: Yup.string()
         .required("L'email est obligatoire")
         .email("Entrez un email valide"),
       password: Yup.string().required("Le mot de passe est obligatoire"),
     }),
     onSubmit: () => {
       refetch();
     },
   });

  const { isSuccess, data, isLoading, error, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: () => signInFunction(formik.values),
    enabled: false,
  });

  if (axios.isAxiosError(error)) {
    Swal.fire({
      icon: "error",
      title: t("oops"),
      text: t(error.response?.data?.message || t("something_went_wrong")),
      confirmButtonText: t("try_again"),
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
  }

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("jwt", data.token);
      navigate("/?page=1");
    }
  }, [isSuccess]);


  return (
    <div className="w-full h-[100vh] py-6 bg-white  shadow-hardShadow flex flex-col items-center justify-center md:rounded-10 md:w-[400px] md:h-auto">
      <div className="all flex flex-col items-center">
        <p className="text-lg font-semibold text-writingMainDark">
          {t("signin")}
        </p>

        <form
          className="all flex flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="email w-[320px] mt-5">
            <InputEmail
              value={formik.values.email}
              setValue={formik.handleChange("email")}
              label={t("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>

          <div className="password w-[320px] mt-5">
            <InputPassword
              value={formik.values.password}
              setValue={formik.handleChange("password")}
              label={t("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>

          <div className="buttons flex flex-col w-[320px]">
            <ForgotPassword />
            <div className="w-full mt-3">
              <ButtonFunc type="submit" text={t("login")} loading={isLoading} />
            </div>
          </div>
        </form>
        <SignupPart />
        <PrivacyPart />
      </div>
    </div>
  );
};

export default Login;


const ForgotPassword = () => { 
  const { t } = useTranslation();
  return (
    <Link
      to="/forgot-password"
      className="text-xs text-main mt-10 font-medium underline"
    >
      {t("forgotPassword")}
    </Link>
  );
}

const SignupPart = () => { 
  const { t } = useTranslation();
  return (
    <div className="text-xs mt-5 flex gap-1">
      <p>{t("dontHaveAccount")}</p>
      <Link to="/register" className="text-main font-medium underline">
        {t("create_account")}
      </Link>
    </div>
  );
}


const PrivacyPart = () => { 
  const { t } = useTranslation();
  return (
    <div className="policy">
      <p className="text-xs text-gray-400 mt-5">
        {t("by_continuing_you_agree_to_our")}{" "}
        <Link to="/terms" className="text-main underline">
          {t("terms")}
        </Link>{" "}
        {t("and")}{" "}
        <Link to="/privacy" className="text-main underline">
          {t("privacy")}
        </Link>
      </p>
    </div>
  );
}