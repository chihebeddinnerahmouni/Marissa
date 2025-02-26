import { useTranslation } from "react-i18next";
import TransTable from "../../components/transactions/TransactionsTable";
import UserTrans from "../../components/transactions/UserTransactions";
import axios from "axios";
import { useEffect, useCallback } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import { useNavigate } from "react-router-dom";
import BalanceSection from "@/components/transactions/Balance";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";



const MyTransactions = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  
  useEffect(() => {
    if(Object.keys(user).length !== 0 && !user.isBoatOwner) {
      navigate("/login");
    }
  }, [user]);

  const fetshData = useCallback(async () => { 
    const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;
    const response = await axios.get(`${urlListing}/api/transactions/my-transactions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  }, []);

  const { data, isLoading, isError, error } = useQuery<{
    transactions: any[];
    releasedBalance: number;
    unreleasedBalance: number;
  }>({
    queryKey: ["my-transactions"],
    queryFn: fetshData,
  });

  if (isLoading) { 
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  if (isError) { 
    const message = error.message === "Network Error" ? t("network_error") : t("something_went_wrong");
    Swal.fire({
      icon: "error",
      title: t("ops"),
      text: message,
      showConfirmButton: false,
    });
  }


  return (
    <div className="w-full mt-[75px] pt-7 inboxListCss px-[20px] pb-10 md:px-[60px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px] bg-creme">
      <div className="content max-w-[1100px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
          {t("my_transactions")}
        </h1>

        {user.isBoatOwner && (
          <BalanceSection
            released={data!.releasedBalance}
            unreleased={data!.unreleasedBalance}
          />
        )}
        {data?.transactions.length === 0 ? (
          <div className="no-transactions text-center p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-700">
              {t("no_transactions")}
            </h2>
            <p className="text-lg text-yellow-600">
              {t("you_have_no_transactions_yet")}
            </p>
          </div>
        ) : user.isBoatOwner ? (
          <TransTable rows={data!.transactions} />
        ) : (
          <UserTrans rows={data!.transactions} />
        )}
      </div>
    </div>
    // <div
    //   className={`w-full mt-[75px] pt-7 inboxListCss px-[20px] pb-10 md:px-[60px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px] bg-creme`}
    // >
    //   <div className="content max-w-[1100px] mx-auto">
    //     <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
    //       {t("my_transactions")}
    //     </h1>

    //     {user.isBoatOwner && (
    //       <BalanceSection
    //         released={data!.releasedBalance}
    //         unreleased={data!.unreleasedBalance}
    //       />
    //     )}
    //     {data?.transactions.length === 0 ? (
    //       <div className="no-transactions text-center p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
    //         <h2 className="text-xl font-bold text-yellow-700">
    //           {t("no_transactions")}
    //         </h2>
    //         <p className="text-lg text-yellow-600">
    //           {t("you_have_no_transactions_yet")}
    //         </p>
    //       </div>
    //     ) : user.isBoatOwner ? (
    //       <TransTable rows={data?.transactions} />
    //     ) : (
    //       <UserTrans rows={data?.transactions} />
    //     )}
    //   </div>
    // </div>
  );
}

export default MyTransactions

