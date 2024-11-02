import ProfilePic from "@/components/Account/ProfilePic"
import Names from "@/components/Account/Names"
import Email from "@/components/Account/Email"
import Password from "@/components/Account/Password"
import Phone from "@/components/Account/Phone"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingLine from "@/components/ui/LoadingLine"
import Swal from "sweetalert2"
import isLoggedIn from "@/lib/isLogedin"
import { useNavigate } from "react-router-dom"


const Account = () => {

  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const navigate = useNavigate()
    const url = import.meta.env.VITE_SERVER_URL_USERS;
  const token = localStorage.getItem("jwt");

  useEffect(() => {

    if (!isLoggedIn()) {
     return navigate("/")
    }

        axios
          .get(`${url}/api/user/auth-user`, {
            headers: {
              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbXJhemFrYXJpYTRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMjI0MDQ2LCJleHAiOjE3MzAyMjc2NDZ9.zWKGJVTBMXYopubVbo4qTb6KHMgdFhsS2Mty5-msIaQ`,
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // console.log(res.data);
            setFirstName(res.data.name);
            setLastName(res.data.surname);
            setEmail(res.data.email);
            setPhone(res.data.phoneNumber);
            setProfilePic(res.data.profilePicture);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [])

  const send = () => { 
    const check = !firstName || !lastName || !phone;
    if (check) return;

    axios
      .put(
        `${url}/profile`,
        {
          name: firstName,
          surname: lastName,
          phoneNumber: `+${phone}`,
          languageSpoken: "arabic",
          description: "I am a user, hi!",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
                Swal.fire({
          icon: "success",
          title: t(res.data.message),
          showConfirmButton: false,
          timer: 3000,
        })
      })
      .catch
      // console.log(err);
      ();

  }

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    ) }


  return (
    <div className="w-full px-4 flex justify-center">
      <div className="content w-full mt-[100px] flex flex-col gap-4 pb-10 md:gap-6 md:w-[450px] lg:w-[550px] lg:mt-[170px]">
        <ProfilePic profilePic={profilePic} />
        <Names firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} />
        <Email email={email} />
        <Password />
        <Phone phone={phone} setPhone={setPhone} />
        <button
          className="w-[80px] h-[40px] bg-main rounded-[5px] text-white hover:bg-mainHover"
        onClick={send}
        >
          {t("save")}
        </button>
      </div>
    </div>
  )
}

export default Account
