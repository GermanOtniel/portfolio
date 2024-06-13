import { useRef, useState } from "react";
import { IContactForm } from "../schemas";
import { FormInstance, useToaster } from "rsuite";
import { sleep } from "../../../../../utils";
import { useLoaderContext } from "../../../../../context/loaderContext/LoaderContext";
import { successMessage } from "../../../../../components/shared";
import { useTimer } from "../../../../../hooks";
import { useThemeContext } from "../../../../../context/themeContext/Theme.Context";
import { CONTACT } from "../../../../../language";

export const useContact = () => {
  const formRef = useRef<FormInstance<HTMLFormElement>>(null);
  const [formValue, setFormValue] = useState<IContactForm>({
    email: "",
    subject: "",
  });
  const { timeLeft, startTimer, } = useTimer({
    seconds: 30
  });
  const { onShow } = useLoaderContext();
  const toaster = useToaster();
  const { language, } = useThemeContext();

  const handleSubmit = async () => {
    if (!formRef?.current?.check()) {
      return;
    }
    onShow(true);
    await sleep(5000);
    startTimer();
    onShow(false);
    toaster.push(
      successMessage(CONTACT[language].I),
      { placement: "bottomCenter", duration: 5000 }
    );
  };



  return {
    formValue,
    setFormValue,
    formRef,
    handleSubmit,
    timeLeft,
  };
};