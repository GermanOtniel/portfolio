import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { IUser, IUserDB } from "../../models";
import { db } from "../config";
import { v4 as uuidv4 } from 'uuid';

const create = async (user: IUser) => {
  const userToCreate = {
    id: uuidv4(),
    avatar: user.avatar,
    last_name: user.lastName,
    first_name: user.firstName,
    full_name: user.fullName,
    skills: user.skills,
    city: user.city,
    street: user.street,
    email: user.email,
    rating: user.rating,
    income: user.income
  };
  await addDoc(
    collection(db, 'portfolio_users'), 
    userToCreate
  );
  return userToCreate;
};

const getAll = async (page = 1, perPage = 30) => {
  const responseUsers = await getDocs(
    query(
      collection(db, "portfolio_users"),
      orderBy("first_name")
    )
  );
  const usersData = responseUsers.docs
    .map((doc) => ({ ...doc.data(), id: doc.data().id }) as IUserDB);
  const total = usersData.length;
  let startIndex = page === 1 ? ((perPage * page) - perPage) : ((perPage * page) - perPage);
  const resultsPage = usersData.slice(startIndex, perPage * page);

  return {
    page: page,
    pages: total / perPage,
    total,
    portfolioUsers: resultsPage,
  };
};

const update = async (user: IUser) => {
  const userToUpdate = {
    id: user.id,
    avatar: user.avatar,
    last_name: user.lastName,
    first_name: user.firstName,
    full_name: user.fullName,
    skills: user.skills,
    city: user.city,
    street: user.street,
    email: user.email,
    rating: user.rating,
    income: user.income
  };
  const dbUsersRef = doc(db, "portfolio_users", userToUpdate.id);      
  await setDoc(dbUsersRef, userToUpdate, { merge: true });
  return userToUpdate;
};

const remove = async (userId: string) => {
  await deleteDoc(
    doc(db, 'portfolio_users', userId)
  );
};

export const usersDB = {
  create,
  getAll,
  update,
  remove,
};