import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "@/lib/isLogedin";

const MySubmissions = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
            //swal
            return;
        }
        const url = import.meta.env.VITE_SERVER_URL_LISTING;
        axios
          // .get(`${url}/api/submit/user-submissions`, {
          .get(`${url}/api/submit/mysubmissions`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then((res) => {
            // console.log(res.data.submissions);
            setSubmissions(res.data.submissions);
            setLoading(false);
          })
          
    }, []);
  
  
  const go = (status: string) => {
    if(status === "Approved"){
      navigate("/boats-list/title");
    }

    if (status === "Document") {
      navigate("/boats-list/documents");
    } 
   }
  
  
//for loading
    if (loading) {
        return <LoadingLine />;
    }

    return (
      <div className="w-full px-4 mt-[100px] md:px-[120px] lg:flex lg:flex-col lg:items-center lg:mt-[130px] 2xl:max-w-[1700px] 2xl:mx-auto">
        <h1 className="text-[18px] font-semibold text-writingMainDark lg:text-[22px] lg:self-start">
          {t("all_submissions")}
        </h1>
        <p className="text-[14px] font-normal text-writingGrey lg:text-[16px] lg:self-start">
          {t("view_and_manage_submissions")}
        </p>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white mt-5 border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-writingGrey font-medium">
                  {t("business")}
                </th>
                <th className="py-3 px-4 border-b text-left text-writingGrey font-medium">
                  {t("city")}
                </th>
                <th className="py-3 px-4 border-b text-left text-writingGrey font-medium">
                  {t("category")}
                </th>
                <th className="py-3 px-4 border-b text-left text-writingGrey font-medium lg:text-center">
                  {t("status")}
                </th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              {submissions.map((submission: any, index: number) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-left text-nowrap">
                    {t(submission.business_type)}
                  </td>
                  <td className="py-3 px-4 border-b text-left text-nowrap">
                    {t(submission.city)}
                  </td>
                  <td className="py-3 px-4 border-b text-left">
                    {t(submission.category)}
                  </td>
                  <td
                    className={`py-3 px-4 border-b text-left lg:flex lg:justify-center`}
                  >
                    <p
                      className={`p-1 flex items-center justify-center lg:w-[50%] rounded-md text-center text-nowrap ${
                        submission.status === "Approved"
                          ? "bg-green-100 text-[#008767] border-1 border-[#008767] cursor-pointer"
                          : ""
                      } ${
                        submission.status === "Rejected"
                          ? "bg-red-100 text-[#DF0404] border-1 border-[#DF0404]"
                          : ""
                      } 
                      ${
                        submission.status === "Document"
                          ? "bg-orange-100 text-orange-400 border-1 border-orange-400 cursor-pointer"
                          : ""
                      }
                        `}
                      onClick={() => go(submission.status)}
                    >
                      {submission.status === "Approved"
                        ? t("list_your_boat")
                        : t(submission.status)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MySubmissions;


