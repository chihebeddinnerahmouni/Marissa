import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useCallback } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "@/functions/axios_error_handler";

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
  });

  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return <div className="h-screen"></div>;

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
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

const TableComponent = ({ submissions }: { submissions: any[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        <tbody className="divide-y divide-gray-200">
          {submissions.map((submission: any, index: number) => (
            <tr
              key={index}
              className="bg-white hover:bg-gray-50 transition duration-200"
            >
              <td className="py-3 px-4 text-left whitespace-nowrap">
                {t(submission.business_type)}
              </td>
              <td className="py-3 px-4 text-left whitespace-nowrap">
                {t(submission.city)}
              </td>
              <td className="py-3 px-4 text-left whitespace-nowrap">
                {t(submission.category)}
              </td>
              <td className="py-3 px-4 text-left lg:flex lg:justify-center">
                <p
                  className={`p-1 flex items-center justify-center lg:w-[50%] rounded-md text-center whitespace-nowrap cursor-pointer transition duration-200 ${
                    submission.status === "Approved"
                      ? "bg-green-100 text-green-700 border border-green-700"
                      : submission.status === "Rejected"
                      ? "bg-red-100 text-red-700 border border-red-700"
                      : submission.status === "Document"
                      ? "bg-orange-100 text-orange-700 border border-orange-700"
                      : "bg-gray-100 text-gray-700 border border-gray-700"
                  }`}
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
