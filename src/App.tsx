import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import NavBar from "./components/ui/NavBar.tsx";
import Footer from "./components/ui/Footer.tsx";
import Bounce from "./components/ui/Bounce.tsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <FooterContent />
      <Bounce />
    </>
  );
}

export default App;




const FooterContent = () => {
  const location = useLocation();
  const excludedRoutes = useMemo(() => ["inbox", "my-boats"], []);
  const isFooterHidden = useMemo(
    () => excludedRoutes.some((el) => location.pathname.includes(el)),
    [location.pathname, excludedRoutes]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isFooterHidden && <Footer />}
    </>
  )
 }