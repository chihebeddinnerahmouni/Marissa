import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

ReactModal.setAppElement("#root");

const UserNotifs = ({
    setIsCongratsOpen,
    userNotifs,
}: {
    setIsCongratsOpen: (isOpen: boolean) => void;
    userNotifs: any[];
}) => {
    const { t } = useTranslation();
    const urlUsers = import.meta.env.VITE_SERVER_URL_USERS;
    const navigate = useNavigate();

    console.log(userNotifs);

    return (
      <ReactModal
        isOpen={true}
        onRequestClose={() => setIsCongratsOpen(false)}
        className="z-50 outline-none bg-white w-[90%] max-w-[600px] py-6 px-8 rounded-20 shadow-lg flex flex-col items-center"
        overlayClassName="z-10 fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[7px] flex justify-center items-center"
      >
        <div className="w-full max-h-[400px] overflow-y-auto">
          {userNotifs.length === 0 ? (
            <p className="text-center text-gray-600">
              {t("No notifications available")}
            </p>
          ) : (
            userNotifs.map((notif, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/inbox/${notif.inquiryId}`),
                    setIsCongratsOpen(false);
                }}
                className="mb-4 p-4 border-b border-gray-200 transition duration-300 hover:bg-gray-100"
              >
                <div className="flex items-center mb-2">
                  <img
                    // src={
                    //   notif.data.isBoatOwner
                    //     ? `${urlUsers}/${notif.data.boatOwnerDetails.image}`
                    //     : `${urlUsers}/${notif.data.clientDetails.image}`
                    // }
                    src={
                      notif.data.isBoatOwner
                        ? notif.data.boatOwnerDetails.image ? `${urlUsers}/${notif.data.boatOwnerDetails.image}` : "/anonyme.jpg"
                        : notif.data.clientDetails.image
                        ? `${urlUsers}/${notif.data.clientDetails.image}`
                        : "/anonyme.jpg"
                    }
                    alt={`${notif.data.boatOwnerDetails.name} ${notif.data.boatOwnerDetails.surname}`}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-main object-cover object-center"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-main">
                      {notif.data.isBoatOwner
                        ? `${notif.data.boatOwnerDetails.name} ${notif.data.boatOwnerDetails.surname}`
                        : `${notif.data.clientDetails.name} ${notif.data.clientDetails.surname}`}
                    </h3>
                    <p className="text-sm text-gray-600">{notif.data.status}</p>
                  </div>
                </div>
                <div className="mb-2 text-sm">
                  <p>
                    <strong>{t("Departure Time")}:</strong>{" "}
                    {notif.data.booking_info.departureTime}
                  </p>
                  <p>
                    <strong>{t("Duration")}:</strong>{" "}
                    {notif.data.booking_info.duration.hours}h{" "}
                    {notif.data.booking_info.duration.minutes}m
                  </p>
                  <p>
                    <strong>{t("Total Cost")}:</strong> $
                    {notif.data.offer.total_cost}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => setIsCongratsOpen(false)}
          className="bg-main text-white py-2 px-6 rounded-full hover:bg-mainHover transition duration-300 mt-4 shadow-md hover:shadow-lg"
        >
          {t("Close")}
        </button>
      </ReactModal>
    );
};

export default UserNotifs;