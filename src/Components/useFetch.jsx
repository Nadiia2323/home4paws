import React, { useState } from "react";
import { useEffect } from "react";

const useFetch = (url) => {
  console.log("url useFecth:>> ", url);
  const [myData, setMyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getAccessToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append(
      "client_id",
      // VITE_CLIENT_ID
      // "8chWq1iNwVsKezFDLmw8d4N93envu0j7Xa7dMljqH7mafph213"
      // "ZXjyNDuuZAUVnf257xx4lj6PFYEv9T6MQl8A9iNOP3x47yUD3L"
      "fRde8D5bc5TDoJZzRcXP6xQVbLA3oPZ0ruUa1zjgiN63uAHYCk"
    );
    urlencoded.append(
      "client_secret",
      // VITE_CLIENT_SECRET
      // "zu5MOzBXJHYewOOrw9dZNT2x7dOd8R6BiIk1wO8U"
      // "LVg9fTLFhFk01qFZK4ZY95aOm9ttjT4PX7x2qCas"
      "qEuWZoQn2sVLhuCqaJBAH1Z0NAjObwUWbR5dQVJ7"
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

  const initController = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      if (accessToken) {
        try {
          const data = await fetchData(accessToken, url);
          console.log("data :>> ", data);
          setMyData(data);
          setIsLoading(false);
        } catch (error) {
          console.log("error fetching Pet :>> ", error);
        }
      } else {
        alert("no access token");
      }
    } catch (error) {
      console.log("error getting access token :>> ", error);
    }
  };

  useEffect(() => {
    if (url) {
      initController();
    }
  }, [url]);

  return { myData, isLoading };
};

export default useFetch;
