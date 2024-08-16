import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { IPlayer, IPlayerDB, IUser, IUserDB } from "../../models";
import { db } from "../config";
import { v4 as uuidv4 } from 'uuid';

const create = async (user: IPlayer) => {
  const userToCreate = {
    id: user.id,
    avatar: user.avatar,
    nick_name: user.nickName,
    points: user.points,
  };
  await addDoc(
    collection(db, 'players'), 
    userToCreate
  );

  return userToCreate;
};

const getAll = async (page = 1, perPage = 30) => {
  const responseUsers = await getDocs(
    query(
      collection(db, "players"),
      orderBy("points")
    )
  );
  const usersData = responseUsers.docs
    .map((doc) => ({ ...doc.data(), id: doc.data().id }) as IPlayerDB);
  const total = usersData.length;
  let startIndex = page === 1 ? ((perPage * page) - perPage) : ((perPage * page) - perPage);
  const resultsPage = usersData.slice(startIndex, perPage * page);

  return {
    page: page,
    pages: total / perPage,
    total,
    players: resultsPage,
  };
};

const findOne = async (id: string) => {
  const responseUsers = await getDocs(
    query(
      collection(db, "players"),
      where("id", "==", id),
    )
  );
  const usersData = responseUsers.docs
    .map((doc) => ({ ...doc.data(), id: doc.data().id }) as IPlayerDB);
  console.log(usersData[0]);

  if (usersData[0]) {
    return { ...usersData[0] };
  }
  return undefined;
};

const update = async (user: IPlayer) => {
  const userToUpdate = {
    id: user.id,
    avatar: user.avatar,
    nick_name: user.nickName,
    points: user.points,
  };
  console.log(userToUpdate);
  const dbUsersRef = doc(db, "players", userToUpdate.id);      
  await setDoc(dbUsersRef, userToUpdate, { merge: true });
  return userToUpdate;
};

export const playersDB = {
  create,
  getAll,
  findOne,
  update,
};