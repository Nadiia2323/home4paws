import React, { useState, useEffect } from "react";
import useFetch from "../Components/useFetch";
import Content from "../Components/Content";
import ContentContainer from "../Components/ContentContainer";

const defaultState = {
  dog: [],
  cat: [],
  bird: [],
};

function Config() {
  const typesUrl = "https://api.petfinder.com/v2/types";
  const dogBreedsUrl = "https://api.petfinder.com/v2/types/dog/breeds";
  const catBreedsUrl = "https://api.petfinder.com/v2/types/cat/breeds";
  const birdBreedsUrl = "https://api.petfinder.com/v2/types/bird/breeds";
  const smallAndFurryBreedsUrl =
    "https://api.petfinder.com/v2/types/small-furry/breeds";
  //  const smallAndFurryBreedsUrl= "https://api.petfinder.com/v2/animals?type=small-furry/breeds"

  // https://api.petfinder.com/v2/animals?type=small-furry&page=1

  const { myData: typesData, isLoading: isLoadingTypes } = useFetch(typesUrl);
  const { myData: dogBreedsData, isLoading: isLoadingDogs } =
    useFetch(dogBreedsUrl);
  const { myData: catBreedsData, isLoading: isLoadingCats } =
    useFetch(catBreedsUrl);
  const { myData: birdBreedsData, isLoading: isLoadingBirds } =
    useFetch(birdBreedsUrl);
  const { myData: sfBreedsData, isLoading: isLoadingsf } = useFetch(
    smallAndFurryBreedsUrl
  );
  console.warn("typesData :>> ", typesData);
  console.warn("dogBreedsData :>> ", dogBreedsData);

  // const [allBreedsState, setAllBreedsState] = useState({})
  const [typesState, setTypesState] = useState(null);
  const [dogBreeds, setDogBreeds] = useState(null);
  const [catBreeds, setCatBreeds] = useState(null);
  const [birdBreeds, setBirdBreeds] = useState(null);
  const [sfBreeds, setsfBreeds] = useState(null);

  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    setTypesState(typesData);
    setDogBreeds(dogBreedsData);
    setCatBreeds(catBreedsData);
    setBirdBreeds(birdBreeds);
    setsfBreeds(sfBreeds);

    if (
      !isLoadingCats &&
      !isLoadingBirds &&
      !isLoadingDogs &&
      !isLoadingTypes &&
      !isLoadingsf
    ) {
      setDataReady(true);
    }
  }, [dogBreedsData, catBreedsData, birdBreedsData, typesData, sfBreeds]);
  console.log(
    "dogBreeds, catBreeds, birdBreeds :>> ",
    dogBreeds,
    catBreeds,
    birdBreeds
  );

  console.log("dataReady :>> ", dataReady);

  console.log(
    "birdBreedsData, catBreedsData, dogBreedsData :>> ",
    birdBreedsData,
    catBreedsData,
    dogBreedsData
  );
  return (
    <>
      {dataReady && (
        <ContentContainer
          typesData={typesData}
          dogBreeds={dogBreeds}
          cat={catBreeds}
          birdBreeds={birdBreeds}
          sfBreeds={sfBreeds}
        />
      )}
    </>
  );
}

export default Config;
