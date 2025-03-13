import App from "../App.tsx";
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/ui/LazyLoading.tsx";
import InquiryLayout from "../Layout/InquiryLayout.tsx";
import Groupe from "../components/inquiry forms/Groupe.tsx";
import DateComp from "../components/inquiry forms/Date.tsx";
import Duration from "../components/inquiry forms/Duration.tsx";
import DepartureTime from "../components/inquiry forms/DepartureTime.tsx";
import Extra from "../components/inquiry forms/Extra.tsx";
import Contact from "../components/inquiry forms/Contact.tsx";
import Done from "../components/inquiry forms/Done.tsx";
import ListeBoatLayout from "../Layout/ListeBoatLayout.tsx";
import WhoYouAre from "../components/Listing/WhoYoyAre";
import Region from "../components/Listing/Region.tsx";
import WaterCraft from "../components/Listing/WaterCraft.tsx";
import AlmostDone from "../components/Listing/AlmostDone.tsx";
import ListeBoatDetailsLayout from "../Layout/ListBoatDetailsLayout.tsx";
import Title from "../components/listing details/Title.tsx";
import Description from "../components/listing details/Descrition.tsx";
import Location from "../components/listing details/Location.tsx";
import Features from "../components/listing details/Features.tsx";
import Images from "../components/listing details/Images.tsx";
import Category from "../components/listing details/Category.tsx";
import RegionsD from "../components/listing details/RegionsD.tsx";
import Guests from "../components/listing details/Guests.tsx";
import Prices from "../components/listing details/Prices.tsx";
import SpecificDates from "../components/listing details/SpeceficDates.tsx";
import Availability from "../components/listing details/Available";
import { ErrorBoundary } from "react-error-boundary";
import FetshError from "../errors/FetshError.tsx";

const LandingPage = lazy(() => import("../pages/LandingPage.tsx"));
const OnluAuthLayout = lazy(() => import("../Layout/OnlyAuthLayout.tsx"));
const Rental = lazy(() => import("../pages/Rental.tsx"));
const Favorite = lazy(() => import("../pages/user/Favorite.tsx"));
const ShipDetailsPage = lazy(() => import("../pages/ShipDetailsPage.tsx"));
const Login = lazy(() => import("../components/auth/Login.tsx"));
const Signup = lazy(() => import("../components/auth/Signup.tsx"));
const ForgetPassword = lazy(
  () => import("../components/auth/ForgetPassword.tsx")
);
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
const LandingInquiry = lazy(
  () => import("../components/inquiry forms/LandingInquiry.tsx")
);
const ListingDone = lazy(() => import("../components/Listing/ListingDone.tsx"));
const HelpLayout = lazy(() => import("../Layout/HelpLayout.tsx"));
const NoPage = lazy(() => import("../pages/NoPage.tsx"));

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary FallbackComponent={FetshError}>
            <Suspense fallback={<Loading />}>
              <LandingPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/rental",
        element: (
          <ErrorBoundary FallbackComponent={FetshError}>
            <Suspense fallback={<Loading />}>
              <Rental />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/boat-details/:boatId",
        element: (
          <ErrorBoundary FallbackComponent={FetshError}>
            <Suspense fallback={<Loading />}>
              <ShipDetailsPage />
            </Suspense>
          </ErrorBoundary>
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
              <ErrorBoundary FallbackComponent={FetshError}>
              <Suspense fallback={<Loading />}>
                <MySubmissions />
              </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            path: "/favorite",
            element: (
              <ErrorBoundary FallbackComponent={FetshError}>
              <Suspense fallback={<Loading />}>
                <Favorite />
              </Suspense>
             </ErrorBoundary>
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
              <ErrorBoundary FallbackComponent={FetshError}>
              <Suspense fallback={<Loading />}>
                <MyTransactions />
              </Suspense>
               </ErrorBoundary>
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
    element: <InquiryLayout />,
    children: [
      {
        path: "/inquiry/:boatId/duration",
        element: <Duration />,
      },
      {
        path: "/inquiry/:boatId/date",
        element: <DateComp />,
      },
      {
        path: "/inquiry/:boatId/departure",
        element: <DepartureTime />,
      },
      {
        path: "/inquiry/:boatId/groupe",
        element: <Groupe />,
      },
      {
        path: "/inquiry/:boatId/extra",
        element: <Extra />,
      },
      {
        path: "/inquiry/:boatId/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/inquiry/:boatId/done",
    element: <Done />,
  },

  {
    element: <ListeBoatLayout />,
    children: [
      {
        path: "/boats-list/who-are-you",
        element: <WhoYouAre />,
      },
      {
        path: "/boats-list/region",
        element: <Region />,
      },
      {
        path: "/boats-list/water-craft",
        element: <WaterCraft />,
      },
      {
        path: "/boats-list/conditions",
        element: <AlmostDone />,
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
    element: <ListeBoatDetailsLayout />,
    children: [
      {
        path: "/boats-list/title",
        element: <Title />,
      },
      {
        path: "/boats-list/description",
        element: <Description />,
      },
      {
        path: "/boats-list/location",
        element: <Location />,
      },
      {
        path: "/boats-list/features",
        element: <Features />,
      },
      {
        path: "/boats-list/images",
        element: <Images />,
      },
      {
        path: "/boats-list/category",
        element: <Category />,
      },
      {
        path: "/boats-list/regionsD",
        element: <RegionsD />,
      },
      {
        path: "/boats-list/guests",
        element: <Guests />,
      },
      {
        path: "/boats-list/prices",
        element: <Prices />,
      },
      {
        path: "/boats-list/specific-dates",
        element: <SpecificDates />,
      },
      {
        path: "/boats-list/availability",
        element: <Availability />,
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
