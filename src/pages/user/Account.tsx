import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProfilePic from "@/components/Account/ProfilePic";
import Names from "@/components/Account/Names";
import Email from "@/components/Account/Email";
import Password from "@/components/Account/Password";
import Phone from "@/components/Account/Phone";
import { RootState } from "@/redux/store";
import ButtonFuc from "@/components/ui/buttons/Button";
import { axios_error_handler } from "@/functions/axios_error_handler";
import { toast } from "react-hot-toast";


interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
}

interface ResponseData {
  message: string;
}


 const updateUserProfile = async (userData: UserData) => {
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

const Account = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState<string>(user.name);
  const [lastName, setLastName] = useState<string>(user.surname);
  const [phone, setPhone] = useState<string>(user.phoneNumber);

  useEffect(() => {
    if (Object.keys(user).length === 0) return;
    setFirstName(user.name);
    setLastName(user.surname);
    setPhone(user.phoneNumber);
  }, [user]);

 

  const { mutate, isPending } = useMutation<ResponseData, Error, UserData>({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: any) => {
      axios_error_handler(error, t);
    }
  });


  const send = useCallback(() => {
    const array = [firstName, lastName, phone];
    if (array.some((item) => item === "")) return toast.error(t("please_fill_in_all_fields"), {
      style: {
        border: "1px solid black",
      },
    });
    mutate({ firstName, lastName, phone });
  }, [firstName, lastName, phone, mutate]);

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
          <ButtonFuc text={t("save")} onClick={send} loading={isPending} />
      </div>
    </div>
  );
};

export default Account;
