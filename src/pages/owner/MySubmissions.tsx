import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useCallback } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {useQuery} from "@tanstack/react-query";


const MySubmissions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => { 
    if (Object.keys(user).length !== 0) {
      if (!user.hasSubmissions) {
          navigate("/login");
        }
    }
  }, [user]);
  

  const fetchSubmissions = useCallback(async () => {
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    const { data } = await axios.get(`${url}/api/submit/mysubmissions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return data;
  }, []);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["mySubmissions"],
    queryFn: fetchSubmissions,
    enabled: user.hasSubmissions,
  })

  
    if (isLoading) {
      return (
        <div className="w-full h-screen">
          <LoadingLine />
        </div>)
  }
  if (error) { 
    const message =
      error.message === "Network Error"
        ? t("network_error")
        : t("something_went_wrong");
    Swal.fire({
      icon: "error",
      title: t("ops"),
      text: message,
      showConfirmButton: false,
    });
    return <div className="h-screen"></div>;
  }



    return (
      <div className="w-full min-h-screen px-4 mt-[100px] md:px-[120px] lg:flex lg:flex-col lg:items-center lg:mt-[130px] 2xl:max-w-[1700px] 2xl:mx-auto">
        <h1 className="text-[18px] font-semibold text-writingMainDark lg:text-[22px] lg:self-start">
          {t("all_submissions")}
        </h1>
        <p className="text-[14px] font-normal text-writingGrey lg:text-[16px] lg:self-start">
          {t("view_and_manage_submissions")}
        </p>
        <TableComponent submissions={data.submissions} />
      </div>
    );
};

export default MySubmissions;


const TableComponent = ({ submissions }: { submissions : any[]}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  console.log(submissions);

  const go = useCallback((status: string, id: number) => {
    switch (status) { 
      case "Approved":
        navigate("/boats-list/title");
        break;
      case "Document":
        navigate(`/boats-list/documents/${id}`);
        break;
      default:
        break;
    }
  }, []);

  return (
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
              <td className="py-3 px-4 border-b text-left text-nowrap">
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
                  onClick={() => go(submission.status, submission.id)}
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
  );
};