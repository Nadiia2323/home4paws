import React from "react";

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import useIsAuth from "../useIsAuth";

const AuthInContext = {
  setUser: (user) => console.log(" conslole:>> "),
};

export const AuthContext = createContext(AuthInContext);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(false);
  const [userFavorites, setUserFavorites] = useState(null);

  const signup = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user :>> ", user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed in user:", user);
      setUser(user);
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  };
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {}
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserFavorites = async (currentUser) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", currentUser.email, "favorites")
      );
      const favoritesArray = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        favoritesArray.push(doc.data());
      });

      setUserFavorites(favoritesArray);
    } catch (error) {}
  };
  const getActiveUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        if (user.email) {
          getUserFavorites(user);
        }
      } else {
        setUser(null);
      }
      setUserChecked(true);
    });
  };
  useEffect(() => {
    setUserChecked(false);
    getActiveUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        resetPassword,
        userChecked,
        logout,
        userFavorites,
        setUserFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
