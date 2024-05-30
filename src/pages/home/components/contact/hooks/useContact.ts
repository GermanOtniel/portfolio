import { useRef, useState } from "react";
import { IContactForm } from "../schemas";
import { FormInstance, useToaster } from "rsuite";
import { sleep } from "../../../../../utils";
import { useLoaderContext } from "../../../../../context/loaderContext/LoaderContext";
import { successMessage } from "../../../../../components/shared";
import { useTimer } from "../../../../../hooks";

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

  const handleSubmit = async () => {
    if (!formRef?.current?.check()) {
      return;
    }
    onShow(true);
    await sleep(5000);
    startTimer();
    onShow(false);
    toaster.push(
      successMessage("Thank you for your message! I will contact you shortly!"),
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