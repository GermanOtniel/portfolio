import { useEffect, useId, useRef, useState } from "react";
import { FormInstance, useToaster } from "rsuite";
import { IUser } from "../../../models";
import { useLoaderContext } from "../../../context/loaderContext/LoaderContext";
import { sleep } from "../../../utils";
import { successMessage } from "../../../components/shared";
import { faker } from '@faker-js/faker/locale/en';

interface IUseSetUser {
  onOpenDrawer: (open: boolean) => void;
  user?: IUser;
}

export const useSetUser = (params: IUseSetUser) => {
  const formRef = useRef<FormInstance<HTMLFormElement>>(null);
  const [formValue, setFormValue] = useState<IUser>({
    id: "",
    avatar: "",
    firstName: "",
    lastName: "",
    fullName: "",
    skills: 0,
    city: "",
    street: "",
    rating: 0,
    income: "",
    email: "",
  });
  const { onShow } = useLoaderContext();
  const toaster = useToaster();
  const newUserId = useId();

  const handleSubmit = async () => {
    if (!formRef?.current?.check()) {
      return;
    }
    onShow(true);
    let userToSend = { ...formValue };
    await sleep(5000);
    if (!userToSend.id) {
      userToSend.id = newUserId;
    }
    onShow(false);
    toaster.push(
      successMessage("exitosos!!!"),
      { placement: "bottomCenter", duration: 5000 }
    );
    params.onOpenDrawer(false);
  };

  useEffect(() => {
    if (params?.user) {
      setFormValue({ ...params.user });
    }
    if (!params?.user) {
      setFormValue({
        id: "",
        avatar: faker.image.avatar(),
        firstName: "",
        lastName: "",
        fullName: "",
        skills: 0,
        city: "",
        street: "",
        rating: 0,
        income: "",
        email: "",
      });
    }
  }, [params?.user]);

  return {
    formRef,
    formValue,
    setFormValue,
    handleSubmit,
  };
};