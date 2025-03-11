import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/ui/NavBar.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bounce from "./components/ui/Bounce.tsx";
import Footer from "./components/ui/Footer.tsx"


function App() {

  const location = useLocation();


  return (
    <>
      <NavBar />
      <Outlet />
      {!location.pathname.includes("inbox")&&<Footer />}
      <Bounce />
      <ToastContainer />
    </>
  );
}

export default App;

