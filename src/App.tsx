import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar.tsx";
import "react-toastify/dist/ReactToastify.css";
import Bounce from "./components/ui/Bounce.tsx";
import Footer from "./components/ui/Footer.tsx"
import {useLocation} from "react-router-dom"

const array = ["inbox, my-boats"]

function App() {
  const location = useLocation()
  const isFooter = array.some((el) => location.pathname.includes(el))

  return (
    <>
      <NavBar />
      <Outlet />
      {isFooter && <Footer />}
      <Bounce />
    </>
  );
}

export default App;

