import { axios_error_handler } from "@/functions/axios_error_handler";
import { FallbackProps } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    axios_error_handler(error, t);
  }, [error]);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      resetErrorBoundary();
    }
    prevPath.current = location.pathname;
  }, [location.pathname, resetErrorBoundary]);

  return <div className="w-full h-screen"></div>;
};

export default ErrorFallback;
