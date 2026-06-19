import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const authCheck = () => {
      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
        navigate("/");
      }

      setLoader(false);
    };

    authCheck();
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <h1 className="text-center text-2xl font-bold">Loading...</h1>
  ) : (
    <>{children}</>
  );
}
