import { useEffect } from "react";
import { initializeRecaptcha } from "../../services/auth.service";

const Recaptcha = () => {
  useEffect(() => {
    initializeRecaptcha();
  }, []);

  return <div id="recaptcha-container"></div>;
};

export default Recaptcha;