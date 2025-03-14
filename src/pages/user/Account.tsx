import { useEffect, useState, useCallback } from "react";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProfilePic from "@/components/Account/ProfilePic";
import Names from "@/components/Account/Names";
import Email from "@/components/Account/Email";
import Password from "@/components/Account/Password";
import Phone from "@/components/Account/Phone";
import ButtonFuc from "@/components/ui/buttons/Button";
import { axios_error_handler } from "@/functions/axios_error_handler";
import { toast } from "react-hot-toast";
// import { useErrorBoundary } from "react-error-boundary";




interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
}

interface ResponseData {
  message: string;
}


const url = import.meta.env.VITE_SERVER_URL_USERS;
const token = localStorage.getItem("jwt");
 const updateUserProfile = async (userData: UserData) => {
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
         Authorization: `Bearer ${token}`,
       },
     }
   );
   return response.data;
 };

const fetchUser = async () => {
  const { data } = await axios.get(`${url}/api/user/auth-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};






const Account = () => {

  const { t } = useTranslation();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // const {showBoundary} = useErrorBoundary();
  const queryClient = useQueryClient();



   const { data } = useSuspenseQuery({
     queryKey: ["getUserAccout"],
     queryFn: fetchUser,
   });

  useEffect(() => {
    if (data) {
      setFirstName(data.name);
      setLastName(data.surname);
      setPhone(data.phoneNumber);
    }
   }, [data]);
  
 

  const { mutate, isPending } = useMutation<ResponseData, Error, UserData>({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success(t("great"), {
        style: { border: "1px solid #10B981", color: "#10B981" },
      });
    },
    onError: (error: any) => {
      axios_error_handler(error, t);
      // showBoundary(error);
    }
  });

 


  const send = useCallback(() => {
    const array = [firstName, lastName, phone];
    if (array.some((item) => item === "")) return toast.error(t("please_fill_in_all_fields"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    mutate({ firstName, lastName, phone });
  }, [firstName, lastName, phone, mutate]);



  return (
    <div className="w-full px-4 flex justify-center">
      <div className="content w-full mt-[100px] flex flex-col gap-4 pb-10 md:gap-6 md:w-[450px] lg:w-[550px] lg:mt-[170px]">
        <ProfilePic profilePic={data.profilePicture} />
        <Names
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <Email email={data.email ? data.email : ""} />
        <Password />
        <Phone phone={phone} setPhone={setPhone} />
        <ButtonFuc text={t("save")} onClick={send} loading={isPending} />
      </div>
    </div>
  );
};

export default Account;
