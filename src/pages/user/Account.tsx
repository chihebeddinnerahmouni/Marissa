import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import ProfilePic from "@/components/Account/ProfilePic";
import Names from "@/components/Account/Names";
import Email from "@/components/Account/Email";
import Password from "@/components/Account/Password";
import Phone from "@/components/Account/Phone";
import LoadingButton from "@/components/ui/LoadingButton";
import { RootState } from "@/redux/store";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
}

interface ResponseData {
  message: string;
}


const Account = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.surname || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");

  useEffect(() => {
    if (!user) return;
    setFirstName(user?.name || "");
    setLastName(user?.surname || "");
    setPhone(user?.phoneNumber || "");
  }, [user]);

  const updateUserProfile = async (
    userData: UserData
  ) => {
      const url = import.meta.env.VITE_SERVER_URL_USERS;
    const response = await axios.put<ResponseData>(
      `${url}/api/user/profile`,
      {
        name: userData.firstName,
        surname: userData.lastName,
        phoneNumber: `+${userData.phone}`,
        languageSpoken: "arabic",
        description: "I am a user, hi!",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation<ResponseData, Error, UserData>({
    mutationFn: updateUserProfile,
    onSuccess: (data: ResponseData) => {
      Swal.fire({
        icon: "success",
        title: t(data.message),
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.reload();
    },
    onError: (error: any) => {
      const message = error.response === "Network Error" ? "network_error" : "something_went_wrong";
      if (error.message === "Network Error") {
        Swal.fire({
          icon: "error",
          title: t(message),
          // text: t("please_try_again"),
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      }
    },
  });


  const send = useCallback(() => {
    const check = !firstName || !lastName || !phone;
    if (check) return;
    mutate({ firstName, lastName, phone });
  }, [firstName, lastName, phone, mutate]); // Fixed missing dependencies

  return (
    <div className="w-full px-4 flex justify-center">
      <div className="content w-full mt-[100px] flex flex-col gap-4 pb-10 md:gap-6 md:w-[450px] lg:w-[550px] lg:mt-[170px]">
        <ProfilePic profilePic={user?.profilePicture} />
        <Names
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <Email email={user.email ? user.email : ""} />
        <Password />
        <Phone phone={phone} setPhone={setPhone} />
        <button
          className={`w-[80px] h-[40px] bg-main rounded-[5px] text-white hover:bg-mainHover ${
            i18n.language === "ar" ? "self-end" : ""
          }`}
          onClick={send}
          disabled={isPending}
        >
          {isPending ? <LoadingButton /> : t("save")}
        </button>
      </div>
    </div>
  );
};

export default Account;
