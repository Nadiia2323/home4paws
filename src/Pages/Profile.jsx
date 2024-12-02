import React, { useContext, useEffect, useMemo, useState } from "react";

import NavBar from "../Components/NavBar";
import { AuthContext } from "../Components/Context/AuthContext";
import { fetchData } from "../utils/apiFetch";
import "./Profile.css";
import {
  query,
  where,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Profile() {
  const { user, userFavorites } = useContext(AuthContext);
  console.log("user :>> ", user);

  const [favsPetsArray, setFavsPetsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const arrayOfPromises = userFavorites?.map(async (favorite) => {
    const urlInfo = `https://api.petfinder.com/v2/animals/${favorite.cardId}`;
    const response = await fetchData(urlInfo);
    return response;
  });
  console.log("arrayOfPromises :>> ", arrayOfPromises);
  const favArrayOfPets = useMemo(
    () =>
      Promise.all(arrayOfPromises).then((arrayResolved) => {
        console.log("arrayResolved :>> ", arrayResolved);
        setFavsPetsArray(arrayResolved);
        setIsLoading(false);
      }),
    [userFavorites]
  );
  console.warn("favArrayOfPets :>> ", favArrayOfPets);
  const handleRemoveFavorite = async (cardId) => {
    console.log("cardId :>> ", cardId);
    try {
      const favoritesCollection = collection(
        db,
        "users",
        user.email,
        "favorites"
      );

      const querySnapshot = await getDocs(
        query(favoritesCollection, where("cardId", "==", cardId))
      );

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);

        setFavsPetsArray((prevArray) =>
          prevArray.filter((fav) => fav.animal.id !== cardId)
        );
        console.log("Favorite removed successfully");
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="profile-container">
      <NavBar />
      <h1>Profile: {user ? user.email : ""}</h1>
      <h2>Favorites:</h2>
      {isLoading ? (
        <div class="lds-heart">
          <div></div>
        </div>
      ) : (
        <div className="fav-container">
          {favsPetsArray &&
            favsPetsArray.map((fav) => {
              console.log("fav :>> ", fav);
              return (
                <div className="favorites">
                  <h3>{fav.animal.name}</h3>
                  <p>{fav.animal.age}</p>
                  <img
                    className="fav-img"
                    src={fav.animal.photos[0].medium}
                    alt=""
                  />
                  <button
                    onClick={() => {
                      handleRemoveFavorite(fav.animal.id);
                    }}
                  >
                    Remove from Favorites
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
