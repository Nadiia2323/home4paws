import React, { useState } from "react";
import { useEffect } from "react";


const useFetch = (url) => {
    const [myData, setMyData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [animalTypes, setAnimalTypes] = useState([]);
const [breeds, setBreeds] = useState([]);

  const getAccessToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append(
      "client_id",
      
      "8chWq1iNwVsKezFDLmw8d4N93envu0j7Xa7dMljqH7mafph213"
    );
    urlencoded.append(
      "client_secret",
      
      "zu5MOzBXJHYewOOrw9dZNT2x7dOd8R6BiIk1wO8U"
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    return fetch("https://api.petfinder.com/v2/oauth2/token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result.access_token;
      })
      .catch((error) => console.log("error", error));
  };

  const fetchData = async (access_token, url) => {
    const options = {
      headers: {
        Authorization: `Bearer  ${access_token}`,
      },
    };
    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    };
   
   

 const getAnimalTypes = async (access_token) => {
  const options = {
    headers: {
      Authorization: `Bearer  ${access_token}`,
    },
  };
  return fetch("https://api.petfinder.com/v2/types", options)
    .then((res) => res.json())
    .then((data) => data.types);
};

 const getBreeds = async (access_token, type) => {
  const options = {
    headers: {
      Authorization: `Bearer  ${access_token}`,
    },
  };
  return fetch(`https://api.petfinder.com/v2/types/${type}/breeds`, options)
    .then((res) => res.json())
    .then((data) => data.breeds);
};


    const initController = async () => {
  setIsLoading(true);

  const accessToken = await getAccessToken();
  const animalData = await fetchData(accessToken, url);
        const typesData = await getAnimalTypes(accessToken);
        const breedsData = await getBreeds(accessToken);

  setMyData(animalData);
        setAnimalTypes(typesData);
        setBreeds(breedsData);
        console.log('breedsData :>> ', breedsData);
        console.log('typesData :>> ', typesData);
        console.log('animalData :>> ', animalData);
                console.log('animalData :>> ', myData);


  setIsLoading(false);
};

    

    useEffect(() => {
        if (url)
        {
    initController();
            
            }
    }, [url]);
    
   
    
    return {myData, isLoading, animalTypes}
};

export default useFetch;
