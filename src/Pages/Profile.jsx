import React, { useContext, useEffect, useState } from "react";
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

  const [favsPetsArray, setFavsPetsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userFavorites || userFavorites.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const arrayOfPromises = userFavorites.map(async (favorite) => {
          const urlInfo = `https://api.petfinder.com/v2/animals/${favorite.cardId}`;
          const response = await fetchData(urlInfo);
          return response;
        });

        const resolvedFavorites = await Promise.all(arrayOfPromises);
        setFavsPetsArray(resolvedFavorites);
      } catch (error) {
        console.error("Error fetching favorite pets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [userFavorites]);

  const handleRemoveFavorite = async (cardId) => {
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
      <h1>Profile: {user ? user.email : "Guest"}</h1>
      <h2>Favorites:</h2>
      {isLoading ? (
        <div className="loading-container">
          <div className="lds-heart">
            <div></div>
          </div>
        </div>
      ) : favsPetsArray.length > 0 ? (
        <div className="fav-container">
          {favsPetsArray.map((fav) => {
            const photoUrl = fav.animal.photos[0]?.medium || "placeholder-url";
            return (
              <div className="favorites" key={fav.animal.id}>
                <h3>{fav.animal.name}</h3>
                <p>{fav.animal.age}</p>
                <img
                  className="fav-img"
                  src={photoUrl}
                  alt={`${fav.animal.name}`}
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
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
}
