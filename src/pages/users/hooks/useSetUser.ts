import { useEffect, useRef, useState } from "react";
import { FormInstance, useToaster } from "rsuite";
import { IUser } from "../../../models";
import { useLoaderContext } from "../../../context/loaderContext/LoaderContext";
import { errorMessage, successMessage } from "../../../components/shared";
import { faker } from '@faker-js/faker/locale/en';
import { mockUsers } from "../../../mocks";
import { create, update } from "../../../api";

interface IUseSetUser {
  onOpenDrawer: (open: boolean) => void;
  user?: IUser;
  open: boolean;
  onReload: () => Promise<void>;
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
  
  const handleSubmit = async () => {
    if (!formRef?.current?.check()) {
      return;
    }
    try {
      onShow(true);
      let isCreating = true;
      if (formValue.id) {
        isCreating = false;
        await update({ ...formValue, fullName: `${formValue.firstName} ${formValue.lastName}` });
      } 
      if (!formValue.id) {
        await create({ ...formValue, fullName: `${formValue.firstName} ${formValue.lastName}` });
      }
      toaster.push(
        successMessage(`El registro ha sido ${isCreating ? "creado" : "actualizado"} correctamente`),
        { placement: "bottomCenter", duration: 5000 }
      );
      params.onOpenDrawer(false);
    } catch (error) {
      toaster.push(
        errorMessage(`Ha ocurrido un error inesperado \n ${String(error)}`),
        { placement: "bottomCenter", duration: 5000 }
      );
    } finally {
      params.onReload();
      onShow(false);
    }
  };

  useEffect(() => {
    if (params?.user) {
      setFormValue({ 
        id: params.user.id,
        avatar: params.user.avatar,
        firstName: params.user.firstName,
        lastName: params.user.lastName,
        fullName: params.user.fullName,
        skills: params.user.skills,
        city: params.user.city,
        street: params.user.street,
        rating: params.user.rating,
        income: params.user.income,
        email: params.user.email,
       });
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
  }, [params?.user, params.open]);

  const onAutoFill = () => {
    const users = mockUsers(1);
    const user = users[0];
    setFormValue({ ...user, id: "" });
  };

  return {
    formRef,
    formValue,
    setFormValue,
    handleSubmit,
    onAutoFill,
  };
};