import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import isLoggedIn from "@/lib/isLogedin";

const OnlyAuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const isLogedIn = isLoggedIn();
  useEffect(() => {
    if (!isLogedIn) {
      navigate("/login");
    }
  }, []);
    
  return isLogedIn ? <Outlet /> : null;
};

export default OnlyAuthLayout;
