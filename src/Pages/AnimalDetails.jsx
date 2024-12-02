import { Outlet, useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import useFetch from "../Components/useFetch";
import "./AnimalDetails.css";
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
  console.log("animalId :>> ", animalId);

  const urlInfo = `https://api.petfinder.com/v2/animals/${animalId}`;
  console.log("urlInfo :>> ", urlInfo);

  const { myData: animalInfo, isLoading: isLoadingInfo } = useFetch(urlInfo);

  if (!isLoadingInfo) {
    console.log("animalInfo :>> ", animalInfo);
    console.log(" someinfo:>> ", animalInfo.animal.name);
  }

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

      {!isLoadingInfo && animalInfo && (
        <div>
          <h5 className="title-name">Name: {animalInfo.animal.name}</h5>
          <div className="container-for-all">
            <div className="container-photo">
              <img src={animalInfo.animal.photos[0].large} alt="" />
            </div>
            <div className="container-info">
              <p clas>Species: {animalInfo.animal.species}</p>
              <p>Age: {animalInfo.animal.age}</p>
              <p>Beed: {animalInfo.animal.breeds.primary}</p>
              <p>Gender: {animalInfo.animal.gender}</p>
              <p>Coat: {animalInfo.animal.coat}</p>
              <p>Color: {animalInfo.animal.colors.primary}</p>
              <p>Description: {animalInfo.animal.description}</p>
              <button onClick={handleClick}> {buttonLabel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimalDetails;
