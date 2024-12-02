import { useState } from "react";

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
  


const fetchData = async (url) => {
    
    const accessToken = await getAccessToken()
    // console.log('accessToken :>> ', accessToken);
    const options = {
      headers: {
        Authorization: `Bearer  ${accessToken}`,
      },
    };
    return fetch(url, options)
      .then((res) => res.json())
        .then((data) => {
        //   console.log('data :>> ', data);
        return data;
      });
  };

  export {fetchData}