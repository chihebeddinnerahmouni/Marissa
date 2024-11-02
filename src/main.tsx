import App from './App.tsx'
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './pages/LandingPage.tsx';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/english/english.json"
import arTranslation from "./locales/arabic/arabe.json";
import Test from './pages/test.tsx';
import ShipDetailsPage from './pages/ShipDetailsPage.tsx';
import AuthLayout from './Layout/authLayout.tsx';
import Login from './components/auth/Login.tsx';
import Signup from './components/auth/Signup.tsx';
import ForgetPassword from './components/auth/ForgetPassword.tsx';
import LandingInquiry from './components/inquiry forms/LandingInquiry.tsx';
import InquiryLayout from './Layout/InquiryLayout.tsx';
import Groupe from './components/inquiry forms/Groupe.tsx';
import DateComp from './components/inquiry forms/Date.tsx';
import Duration from './components/inquiry forms/Duration.tsx';
import DepartureTime from './components/inquiry forms/DepartureTime.tsx';
// import Captain from './components/inquiry forms/Captain.tsx';
import Extra from './components/inquiry forms/Extra.tsx';
import Contact from './components/inquiry forms/Contact.tsx';
import Done from './components/inquiry forms/Done.tsx';
import InboxList from './pages/inbox/InboxList.tsx';
// import InboxDetails from './pages/inbox/InboxDetails.tsx';
import ListeBoatLayout from './Layout/ListeBoatLayout.tsx';
import WhoYoyAre from './components/Listing/WhoYoyAre.tsx';
import Region from './components/Listing/Region.tsx';
import WaterCraft from './components/Listing/WaterCraft.tsx';
import AlmostDone from './components/Listing/AlmostDone.tsx';
import ContactDetails from './components/Listing/contactDetails.tsx';
import ListingDone from './components/Listing/ListingDone.tsx';
import Account from './pages/user/Account.tsx';
import ChangePassword from './pages/user/ChangePassword.tsx';
import ChangeEmail from './pages/user/ChangeEmail.tsx';
import NewEmail from './pages/user/NewEmail.tsx';
import NewPassword from './pages/user/NewPassword.tsx';
import HelpLayout from './Layout/HelpLayout.tsx';
import Help from './pages/help/Help.tsx';
import HelpQuestions from './pages/help/HelpQuestions.tsx';
import Rental from './pages/Rental.tsx';
import AddDocuments from './pages/user/AddDocuments.tsx';
import MySubmissions from './pages/user/MySubmissions.tsx';
import Title from './components/listing details/Title.tsx';
import ListeBoatDetailsLayout from './Layout/ListBoatDetailsLayout.tsx';
import Descrition from './components/listing details/Descrition.tsx';
import Location from './components/listing details/Location.tsx';
import Features from './components/listing details/Features.tsx';
import Images from './components/listing details/Images.tsx';
import Category from './components/listing details/Category.tsx';
import RegionsD from './components/listing details/RegionsD.tsx';
import Guests from './components/listing details/Guests.tsx';
import Prices from './components/listing details/Prices.tsx';
import SpeceficDates from './components/listing details/SpeceficDates.tsx';
import Availability from './components/listing details/Available'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/rental", element: <Rental /> },
      { path: "/boat-details/:boatId", element: <ShipDetailsPage /> },
      { path: "/inbox", element: <InboxList /> },
      { path: "/inbox/:inboxId", element: <InboxList /> },
      { path: "/account", element: <Account /> },
      { path: "/account/change-password", element: <ChangePassword /> },
      { path: "/account/change-email", element: <ChangeEmail /> },
      { path: "/account/change-email/set-email", element: <NewEmail /> },
      { path: "/account/change-email/set-password", element: <NewPassword /> },
      { path: "/boats-list/my-submissions", element: <MySubmissions /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
      { path: "/inquiry/:boatId", element: <LandingInquiry /> },
      { path: "/inquiry/:boatId/done", element: <Done /> },
    ],
  },
  {
    element: <InquiryLayout />,
    children: [
      { path: "/inquiry/:boatId/duration", element: <Duration /> },
      { path: "/inquiry/:boatId/date", element: <DateComp /> },
      { path: "/inquiry/:boatId/departure", element: <DepartureTime /> },
      { path: "/inquiry/:boatId/groupe", element: <Groupe /> },
      { path: "/inquiry/:boatId/extra", element: <Extra /> },
      { path: "/inquiry/:boatId/contact", element: <Contact /> },
    ],
  },
  {
    element: <ListeBoatLayout />,
    children: [
      { path: "/boats-list/who-are-you", element: <WhoYoyAre /> },
      { path: "/boats-list/region", element: <Region /> },
      { path: "/boats-list/water-craft", element: <WaterCraft /> },
      { path: "/boats-list/conditions", element: <AlmostDone /> },
      { path: "/boats-list/contact", element: <ContactDetails /> },
      { path: "/boats-list/done", element: <ListingDone /> },
      { path: "/boats-list/documents", element: <AddDocuments /> },
    ],
  },
  {
    element: <ListeBoatDetailsLayout />,
    children: [
      { path: "/boats-list/title", element: <Title /> },
      { path: "/boats-list/description", element: <Descrition /> },
      { path: "/boats-list/location", element: <Location /> },
      { path: "/boats-list/features", element: <Features /> },
      { path: "/boats-list/images", element: <Images /> },
      { path: "/boats-list/category", element: <Category /> },
      { path: "/boats-list/regions", element: <RegionsD /> },
      { path: "/boats-list/guests", element: <Guests /> },
      { path: "/boats-list/prices", element: <Prices /> },
      { path: "/boats-list/specific-dates", element: <SpeceficDates /> },
      { path: "/boats-list/availability", element: <Availability /> },
    ],
  },
  {
    element: <HelpLayout />,
    children: [
      { path: "/help", element: <Help /> },
      { path: "/help/:category", element: <HelpQuestions /> },
      { path: "/help/:category/:questionId", element: <HelpQuestions /> },
    ],
  },

  {
    path: "/test",
    element: <Test />,
  },
]);



// i18n for translation
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    lng: localStorage.getItem("i18nextLng") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );

    i18n.on("languageChanged", (lng) => {
      document.documentElement.setAttribute(
        "dir",
        lng === "ar" ? "rtl" : "ltr"
      );
    });
  });




ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);