// import App from "../App.tsx";
// import { createBrowserRouter } from "react-router-dom";
// import LandingPage from "../pages/LandingPage.tsx";
// import OnluAuthLayout from "../Layout/OnlyAuthLayout.tsx";

// import Test from "../test.tsx";
// import ShipDetailsPage from "../pages/ShipDetailsPage.tsx";
// import Login from "../components/auth/Login.tsx";
// import Signup from "../components/auth/Signup.tsx";
// import ForgetPassword from "../components/auth/ForgetPassword.tsx";
// import LandingInquiry from "../components/inquiry forms/LandingInquiry.tsx";
// import InquiryLayout from "../Layout/InquiryLayout.tsx";
// import Groupe from "../components/inquiry forms/Groupe.tsx";
// import DateComp from "../components/inquiry forms/Date.tsx";
// import Duration from "../components/inquiry forms/Duration.tsx";
// import DepartureTime from "../components/inquiry forms/DepartureTime.tsx";
// import Extra from "../components/inquiry forms/Extra.tsx";
// import Contact from "../components/inquiry forms/Contact.tsx";
// import Done from "../components/inquiry forms/Done.tsx";
// import InboxList from "../pages/inbox/InboxList.tsx";
// import ListeBoatLayout from "../Layout/ListeBoatLayout.tsx";
// import WhoYoyAre from "../components/Listing/WhoYoyAre.tsx";
// import Region from "../components/Listing/Region.tsx";

// import WaterCraft from "../components/Listing/WaterCraft.tsx";
// import AlmostDone from "../components/Listing/AlmostDone.tsx";
// import ListingDone from "../components/Listing/ListingDone.tsx";
// import Account from "../pages/user/Account.tsx";
// import ChangePassword from "../pages/user/ChangePassword.tsx";
// import ChangeEmail from "../pages/user/ChangeEmail.tsx";
// import NewEmail from "../pages/user/NewEmail.tsx";
// import NewPassword from "../pages/user/NewPassword.tsx";
// import HelpLayout from "../Layout/HelpLayout.tsx";
// import Help from "../pages/help/Help.tsx";
// import HelpQuestions from "../pages/help/HelpQuestions.tsx";
// import Rental from "../pages/Rental.tsx";
// import AddDocuments from "../pages/user/AddDocuments.tsx";
// import MySubmissions from "../pages/owner/MySubmissions.tsx";
// import Title from "../components/listing details/Title.tsx";
// import ListeBoatDetailsLayout from "../Layout/ListBoatDetailsLayout.tsx";
// import Descrition from "../components/listing details/Descrition.tsx";
// import Location from "../components/listing details/Location.tsx";
// import Features from "../components/listing details/Features.tsx";
// import Images from "../components/listing details/Images.tsx";
// import Category from "../components/listing details/Category.tsx";
// import RegionsD from "../components/listing details/RegionsD.tsx";
// import Guests from "../components/listing details/Guests.tsx";
// import Prices from "../components/listing details/Prices.tsx";
// import SpeceficDates from "../components/listing details/SpeceficDates.tsx";
// import Availability from "../components/listing details/Available";
// import Myboats from "../pages/owner/MyBoats.tsx";
// import OwnerInboxPage from "../pages/owner/OwnerInboxPage.tsx";
// import NoPage from "../pages/NoPage.tsx";
// import ReviewMake from "../pages/user/ReviewMake.tsx";
// import MyTransactions from "../pages/user/MyTransactions.tsx";
// import Favorite from "../pages/user/Favorite.tsx";

// export const router = createBrowserRouter([
//   {
//     element: <App />,
//     children: [
//       { path: "/", element: <LandingPage /> },
//       { path: "/rental", element: <Rental /> },
//       { path: "/boat-details/:boatId", element: <ShipDetailsPage /> },
//       { path: "/account/change-password", element: <ChangePassword /> },
//       { path: "/account/change-email", element: <ChangeEmail /> },
//       { path: "/account/change-email/set-email", element: <NewEmail /> },
//       { path: "/account/change-email/set-password", element: <NewPassword /> },
//       { path: "/app/test", element: <Test /> },
//       { path: "/favorite", element: <Favorite /> },
//       {
//         path: "/boats-list/documents/:submissionId",
//         element: <AddDocuments />,
//       },
//       {
//         element: <OnluAuthLayout />,
//         children: [
//           { path: "/boats-list/my-submissions", element: <MySubmissions /> },
//           { path: "/inbox", element: <InboxList /> },
//           { path: "/inbox/:inboxId", element: <InboxList /> },
//           { path: "/account", element: <Account /> },
//           { path: "/my-boats", element: <Myboats /> },
//           { path: "/my-boats/:myBoatId", element: <Myboats /> },
//           { path: "/my-inquiries", element: <OwnerInboxPage /> },
//           { path: "/my-inquiries/:inqueryId", element: <OwnerInboxPage /> },
//           { path: "/review/:inboxId", element: <ReviewMake /> },
//           { path: "/my-transactions", element: <MyTransactions /> },
//         ],
//       },
//     ],
//   },

//   { path: "/inquiry/:boatId", element: <LandingInquiry /> },
//   {
//     element: <InquiryLayout />,
//     children: [
//       { path: "/inquiry/:boatId/duration", element: <Duration /> },
//       { path: "/inquiry/:boatId/date", element: <DateComp /> },
//       { path: "/inquiry/:boatId/departure", element: <DepartureTime /> },
//       { path: "/inquiry/:boatId/groupe", element: <Groupe /> },
//       { path: "/inquiry/:boatId/extra", element: <Extra /> },
//       { path: "/inquiry/:boatId/contact", element: <Contact /> },
//     ],
//   },
//   { path: "/inquiry/:boatId/done", element: <Done /> },

//   {
//     element: <ListeBoatLayout />,
//     children: [
//       { path: "/boats-list/who-are-you", element: <WhoYoyAre /> },
//       { path: "/boats-list/region", element: <Region /> },
//       { path: "/boats-list/water-craft", element: <WaterCraft /> },
//       { path: "/boats-list/conditions", element: <AlmostDone /> },
//       { path: "/boats-list/done", element: <ListingDone /> },
//     ],
//   },
//   {
//     element: <ListeBoatDetailsLayout />,
//     children: [
//       { path: "/boats-list/title", element: <Title /> },
//       { path: "/boats-list/description", element: <Descrition /> },
//       { path: "/boats-list/location", element: <Location /> },
//       { path: "/boats-list/features", element: <Features /> },
//       { path: "/boats-list/images", element: <Images /> },
//       { path: "/boats-list/category", element: <Category /> },
//       { path: "/boats-list/regions", element: <RegionsD /> },
//       { path: "/boats-list/guests", element: <Guests /> },
//       { path: "/boats-list/prices", element: <Prices /> },
//       { path: "/boats-list/specific-dates", element: <SpeceficDates /> },
//       { path: "/boats-list/availability", element: <Availability /> },
//     ],
//   },
//   {
//     element: <HelpLayout />,
//     children: [
//       { path: "/help", element: <Help /> },
//       { path: "/help/:category", element: <HelpQuestions /> },
//       { path: "/help/:category/:questionId", element: <HelpQuestions /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Signup /> },
//   { path: "/forgot-password", element: <ForgetPassword /> },

//   {
//     path: "/test",
//     element: <Test />,
//   },
//   {
//     path: "*",
//     element: <NoPage />,
//   },
// ]);
import App from "../App.tsx";
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/ui/LazyLoading.tsx";

const LandingPage = lazy(() => import("../pages/LandingPage.tsx"));
const OnluAuthLayout = lazy(() => import("../Layout/OnlyAuthLayout.tsx"));
const Rental = lazy(() => import("../pages/Rental.tsx"));
const Favorite = lazy(() => import("../pages/user/Favorite.tsx"));
const ShipDetailsPage = lazy(() => import("../pages/ShipDetailsPage.tsx"));
const Login = lazy(() => import("../components/auth/Login.tsx"));
const Signup = lazy(() => import("../components/auth/Signup.tsx"));
const ForgetPassword = lazy(() => import("../components/auth/ForgetPassword.tsx"));
const Test = lazy(() => import("../test.tsx"));
const Help = lazy(() => import("../pages/help/Help.tsx"));
const HelpQuestions = lazy(() => import("../pages/help/HelpQuestions.tsx"));
const ChangeEmail = lazy(() => import("../pages/user/ChangeEmail.tsx"));
const ChangePassword = lazy(() => import("../pages/user/ChangePassword.tsx"));
const NewEmail = lazy(() => import("../pages/user/NewEmail.tsx"));
const NewPassword = lazy(() => import("../pages/user/NewPassword.tsx"));
const Account = lazy(() => import("../pages/user/Account.tsx"));
const AddDocuments = lazy(() => import("../pages/user/AddDocuments.tsx"));
const MySubmissions = lazy(() => import("../pages/owner/MySubmissions.tsx"));
const Myboats = lazy(() => import("../pages/owner/MyBoats.tsx"));
const OwnerInboxPage = lazy(() => import("../pages/owner/OwnerInboxPage.tsx"));
const ReviewMake = lazy(() => import("../pages/user/ReviewMake.tsx"));
const MyTransactions = lazy(() => import("../pages/user/MyTransactions.tsx"));
const InboxList = lazy(() => import("../pages/inbox/InboxList.tsx"));
const LandingInquiry = lazy(() => import("../components/inquiry forms/LandingInquiry.tsx"));
const InquiryLayout = lazy(() => import("../Layout/InquiryLayout.tsx"));
const Groupe = lazy(() => import("../components/inquiry forms/Groupe.tsx"));
const DateComp = lazy(() => import("../components/inquiry forms/Date.tsx"));
const Duration = lazy(() => import("../components/inquiry forms/Duration.tsx"));
const DepartureTime = lazy(() => import("../components/inquiry forms/DepartureTime.tsx"));
const Extra = lazy(() => import("../components/inquiry forms/Extra.tsx"));
const Contact = lazy(() => import("../components/inquiry forms/Contact.tsx"));
const Done = lazy(() => import("../components/inquiry forms/Done.tsx"));
const ListeBoatLayout = lazy(() => import("../Layout/ListeBoatLayout.tsx"));
const WhoYouAre = lazy(() => import("../components/Listing/WhoYoyAre.tsx"));
const Region = lazy(() => import("../components/Listing/Region.tsx"));
const WaterCraft = lazy(() => import("../components/Listing/WaterCraft.tsx"));
const AlmostDone = lazy(() => import("../components/Listing/AlmostDone.tsx"));
const ListingDone = lazy(() => import("../components/Listing/ListingDone.tsx"));
const HelpLayout = lazy(() => import("../Layout/HelpLayout.tsx"));
const Title = lazy(() => import("../components/listing details/Title.tsx"));
const ListeBoatDetailsLayout = lazy(() => import("../Layout/ListBoatDetailsLayout.tsx"));
const Description = lazy(() => import("../components/listing details/Descrition.tsx"));
const Location = lazy(() => import("../components/listing details/Location.tsx"));
const Features = lazy(() => import("../components/listing details/Features.tsx"));
const Images = lazy(() => import("../components/listing details/Images.tsx"));
const Category = lazy(() => import("../components/listing details/Category.tsx"));
const RegionsD = lazy(() => import("../components/listing details/RegionsD.tsx"));
const Guests = lazy(() => import("../components/listing details/Guests.tsx"));
const Prices = lazy(() => import("../components/listing details/Prices.tsx"));
const SpecificDates = lazy(() => import("../components/listing details/SpeceficDates.tsx"));
const Availability = lazy(() => import("../components/listing details/Available"));
const NoPage = lazy(() => import("../pages/NoPage.tsx"));



export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/rental",
        element: (
          <Suspense fallback={<Loading />}>
            <Rental />
          </Suspense>
        ),
      },
      {
        path: "/boat-details/:boatId",
        element: (
          <Suspense fallback={<Loading />}>
            <ShipDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/account/change-password",
        element: (
          <Suspense fallback={<Loading />}>
            <ChangePassword />
          </Suspense>
        ),
      },
      {
        path: "/account/change-email",
        element: (
          <Suspense fallback={<Loading />}>
            <ChangeEmail />
          </Suspense>
        ),
      },
      {
        path: "/account/change-email/set-email",
        element: (
          <Suspense fallback={<Loading />}>
            <NewEmail />
          </Suspense>
        ),
      },
      {
        path: "/account/change-email/set-password",
        element: (
          <Suspense fallback={<Loading />}>
            <NewPassword />
          </Suspense>
        ),
      },
      {
        path: "/app/test",
        element: (
          <Suspense fallback={<Loading />}>
            <Test />
          </Suspense>
        ),
      },
      {
        path: "/favorite",
        element: (
          <Suspense fallback={<Loading />}>
            <Favorite />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/documents/:submissionId",
        element: (
          <Suspense fallback={<Loading />}>
            <AddDocuments />
          </Suspense>
        ),
      },
      {
        element: (
          <Suspense fallback={<Loading />}>
            <OnluAuthLayout />
          </Suspense>
        ),
        children: [
          {
            path: "/boats-list/my-submissions",
            element: (
              <Suspense fallback={<Loading />}>
                <MySubmissions />
              </Suspense>
            ),
          },
          {
            path: "/inbox",
            element: (
              <Suspense fallback={<Loading />}>
                <InboxList />
              </Suspense>
            ),
          },
          {
            path: "/inbox/:inboxId",
            element: (
              <Suspense fallback={<Loading />}>
                <InboxList />
              </Suspense>
            ),
          },
          {
            path: "/account",
            element: (
              <Suspense fallback={<Loading />}>
                <Account />
              </Suspense>
            ),
          },
          {
            path: "/my-boats",
            element: (
              <Suspense fallback={<Loading />}>
                <Myboats />
              </Suspense>
            ),
          },
          {
            path: "/my-boats/:myBoatId",
            element: (
              <Suspense fallback={<Loading />}>
                <Myboats />
              </Suspense>
            ),
          },
          {
            path: "/my-inquiries",
            element: (
              <Suspense fallback={<Loading />}>
                <OwnerInboxPage />
              </Suspense>
            ),
          },
          {
            path: "/my-inquiries/:inqueryId",
            element: (
              <Suspense fallback={<Loading />}>
                <OwnerInboxPage />
              </Suspense>
            ),
          },
          {
            path: "/review/:inboxId",
            element: (
              <Suspense fallback={<Loading />}>
                <ReviewMake />
              </Suspense>
            ),
          },
          {
            path: "/my-transactions",
            element: (
              <Suspense fallback={<Loading />}>
                <MyTransactions />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "/inquiry/:boatId",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingInquiry />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<Loading />}>
        <InquiryLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/inquiry/:boatId/duration",
        element: (
          <Suspense fallback={<Loading />}>
            <Duration />
          </Suspense>
        ),
      },
      {
        path: "/inquiry/:boatId/date",
        element: (
          <Suspense fallback={<Loading />}>
            <DateComp />
          </Suspense>
        ),
      },
      {
        path: "/inquiry/:boatId/departure",
        element: (
          <Suspense fallback={<Loading />}>
            <DepartureTime />
          </Suspense>
        ),
      },
      {
        path: "/inquiry/:boatId/groupe",
        element: (
          <Suspense fallback={<Loading />}>
            <Groupe />
          </Suspense>
        ),
      },
      {
        path: "/inquiry/:boatId/extra",
        element: (
          <Suspense fallback={<Loading />}>
            <Extra />
          </Suspense>
        ),
      },
      {
        path: "/inquiry/:boatId/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/inquiry/:boatId/done",
    element: (
      <Suspense fallback={<Loading />}>
        <Done />
      </Suspense>
    ),
  },

  {
    element: (
      <Suspense fallback={<Loading />}>
        <ListeBoatLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/boats-list/who-are-you",
        element: (
          <Suspense fallback={<Loading />}>
            <WhoYouAre />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/region",
        element: (
          <Suspense fallback={<Loading />}>
            <Region />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/water-craft",
        element: (
          <Suspense fallback={<Loading />}>
            <WaterCraft />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/conditions",
        element: (
          <Suspense fallback={<Loading />}>
            <AlmostDone />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/done",
        element: (
          <Suspense fallback={<Loading />}>
            <ListingDone />
          </Suspense>
        ),
      },
    ],
  },

  {
    element: (
      <Suspense fallback={<Loading />}>
        <ListeBoatDetailsLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/boats-list/title",
        element: (
          <Suspense fallback={<Loading />}>
            <Title />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/description",
        element: (
          <Suspense fallback={<Loading />}>
            <Description />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/location",
        element: (
          <Suspense fallback={<Loading />}>
            <Location />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/features",
        element: (
          <Suspense fallback={<Loading />}>
            <Features />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/images",
        element: (
          <Suspense fallback={<Loading />}>
            <Images />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/category",
        element: (
          <Suspense fallback={<Loading />}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/regions",
        element: (
          <Suspense fallback={<Loading />}>
            <RegionsD />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/guests",
        element: (
          <Suspense fallback={<Loading />}>
            <Guests />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/prices",
        element: (
          <Suspense fallback={<Loading />}>
            <Prices />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/specific-dates",
        element: (
          <Suspense fallback={<Loading />}>
            <SpecificDates />
          </Suspense>
        ),
      },
      {
        path: "/boats-list/availability",
        element: (
          <Suspense fallback={<Loading />}>
            <Availability />
          </Suspense>
        ),
      },
    ],
  },

  {
    element: (
      <Suspense fallback={<Loading />}>
        <HelpLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/help",
        element: (
          <Suspense fallback={<Loading />}>
            <Help />
          </Suspense>
        ),
      },
      {
        path: "/help/:category",
        element: (
          <Suspense fallback={<Loading />}>
            <HelpQuestions />
          </Suspense>
        ),
      },
      {
        path: "/help/:category/:questionId",
        element: (
          <Suspense fallback={<Loading />}>
            <HelpQuestions />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loading />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: "/test",
    element: (
      <Suspense fallback={<Loading />}>
        <Test />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NoPage />
      </Suspense>
    ),
  },
]);
