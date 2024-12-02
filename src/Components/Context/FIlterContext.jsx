import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export const FilterContext = createContext();
export const FilterContextProvider = ({ children }) => {
  const test = "testing";

  return (
    <FilterContext.Provider value={{ test }}>{children}</FilterContext.Provider>
  );
};
