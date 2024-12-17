import React, { useState } from "react";
import { useEffect } from "react";

const useFetch = (url) => {
  // console.log("url useFecth:>> ", url);
  const [myData, setMyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getAccessToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "ВАШ_CLIENT_ID");
    urlencoded.append("client_secret", "ВАШ_CLIENT_SECRET");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    return fetch("/api/v2/oauth2/token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result.access_token;
      })
      .catch((error) => console.error("Error fetching access token:", error));
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
        // alert("no access token");
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
