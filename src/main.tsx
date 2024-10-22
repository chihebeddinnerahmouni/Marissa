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
import InboxList from './pages/InboxList.tsx';
import InboxDetails from './pages/InboxDetails.tsx';
import ListeBoatLayout from './Layout/ListeBoatLayout.tsx';
import WhoYoyAre from './components/Listing/WhoYoyAre.tsx';
import Region from './components/Listing/Region.tsx';
import WaterCraft from './components/Listing/WaterCraft.tsx';











const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/ana", element: <p>app</p> },
      { path: "/boat-details/:boatId", element: <ShipDetailsPage /> },
      { path: "/inbox", element: <InboxList /> },
      { path: "/inbox/:inboxId", element: <InboxDetails /> },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <Signup />
      </AuthLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthLayout>
        <ForgetPassword />
      </AuthLayout>
    ),
  },
  {
    path: "/inquiry/:boatId",
    element: (
      <AuthLayout>
        <LandingInquiry />
      </AuthLayout>
    ),
  },
  {
    path: "/inquiry/:boatId/duration",
    element: (
      <InquiryLayout>
        <Duration />
      </InquiryLayout>
    ),
  },
  {
    path: "/inquiry/:boatId/date",
    element: (
      <InquiryLayout>
        <DateComp />
      </InquiryLayout>
    ),
  },
  {
    path: "/inquiry/:boatId/departure",
    element: (
      <InquiryLayout>
        <DepartureTime />
      </InquiryLayout>
    ),
  },
  {
    path: "/inquiry/:boatId/groupe",
    element: (
      <InquiryLayout>
        <Groupe />
      </InquiryLayout>
    ),
  },
  // {
  //   path: "/inquiry/:boatId/captain",
  //   element: (
  //     <InquiryLayout>
  //       <Captain />
  //     </InquiryLayout>
  //   ),
  // },
  {
    path: "/inquiry/:boatId/extra",
    element: (
      <InquiryLayout>
        <Extra />
      </InquiryLayout>
    ),
  },
  {
    path: "/inquiry/:boatId/contact",
    element: (
      <InquiryLayout>
        <Contact />
      </InquiryLayout>
    ),
  },
  {
    path: "/inquiry/:boatId/done",
    element: (
      <AuthLayout>
        <Done />
      </AuthLayout>
    ),
  },
  {
    path: "/boats-list/who-are-you",
    element: (
      <ListeBoatLayout>
        <WhoYoyAre />
      </ListeBoatLayout>
    ),
  },
  {
    path: "/boats-list/region",
    element: (
      <ListeBoatLayout>
        <Region />
      </ListeBoatLayout>
    ),
  },
  {
    path: "/boats-list/water-craft",
    element: (
      <ListeBoatLayout>
        <WaterCraft />
      </ListeBoatLayout>
    ),
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