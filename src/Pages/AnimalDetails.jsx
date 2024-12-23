import { Outlet, useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import useFetch from "../Components/useFetch";
import "./AnimalDetails.css";
import "./Profile.css";
import { app, db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../Components/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function AnimalDetails() {
  const { user, setUserFavorites, userFavorites } = useContext(AuthContext);
  const [cardId, setCardId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { animalId } = useParams();

  const urlInfo = `https://api.petfinder.com/v2/animals/${animalId}`;

  const { myData: animalInfo, isLoading: isLoadingInfo } = useFetch(urlInfo);

  const handelFavorites = async () => {
    try {
      const favoriteObject = {
        cardId: animalInfo.animal.id,
      };

      const favoritesCollection = collection(
        db,
        "users",
        user.email,
        "favorites"
      );

      const docRef = await addDoc(favoritesCollection, favoriteObject);
      setCardId(null);
      setIsFavorite(true);
      setUserFavorites([...userFavorites, favoriteObject]);
      console.log("Favorite saved successfully with ID: ", docRef.id);
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const favoritesCollection = collection(
        db,
        "users",
        user.email,
        "favorites"
      );

      const querySnapshot = await getDocs(
        query(favoritesCollection, where("cardId", "==", animalInfo.animal.id))
      );

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        setIsFavorite(false);
        console.log("Favorite removed successfully");
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const buttonLabel = !isFavorite
    ? "Add to favorites"
    : "Remove from favorites";
  const handleClick = () => {
    if (!isFavorite) {
      handelFavorites();
    } else {
      handleRemoveFavorite();
    }
  };

  return (
    <div>
      <NavBar />
      {!isLoadingInfo && animalInfo ? (
        <div>
          <h5 className="title-name">Name: {animalInfo.animal.name}</h5>
          <div className="container-for-all">
            <div className="container-photo">
              {animalInfo.animal.photos.length > 0 ? (
                <img
                  src={animalInfo.animal.photos[0].large}
                  alt={`${animalInfo.animal.name}`}
                />
              ) : (
                <p className="info-text">No photo available</p>
              )}
            </div>
            <div className="container-info">
              <p className="info-text">Species: {animalInfo.animal.species}</p>
              <p className="info-text">Age: {animalInfo.animal.age}</p>
              <p className="info-text">
                Breed: {animalInfo.animal.breeds.primary || "Unknown"}
              </p>
              <p className="info-text">Gender: {animalInfo.animal.gender}</p>
              <p className="info-text">
                Coat: {animalInfo.animal.coat || "Not specified"}
              </p>
              <p className="info-text">
                Color: {animalInfo.animal.colors.primary || "Unknown"}
              </p>
              <p className="info-text">
                Description:{" "}
                {animalInfo.animal.description || "No description available."}
              </p>
              <button className="fav-btn" onClick={handleClick}>
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <div className="lds-heart">
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimalDetails;
