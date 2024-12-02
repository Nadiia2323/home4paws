import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import NavBar from "./NavBar";

function Content({
  typesData: unreliableLinks,
  dogBreeds,
  catBreeds,
  birdBreeds,
  sfBreeds,
}) {
  const typesData = unreliableLinks.types.filter((link) => {
    return !link.name.includes(" ");
  });
  const navigate = useNavigate();

  const handleAnimalClick = (animalId) => {
    navigate(`/animals/${animalId}`);
    console.log("navigate :>> ", animalId);
  };

  const defaultUrl = `https://api.petfinder.com/v2/animals`;

  const [currentPage, setCurrentPage] = useState(10);
  const [myUrl, setMyUrl] = useState(defaultUrl);

  //! dropdown options
  const [animalType, setAnimalType] = useState("");
  const [coats, setCoats] = useState([]);
  const [colors, setColors] = useState([]);

  //! chosen filters
  const [selectedAnimal, setSelectedAnimal] = useState("all");
  const [selectedCoat, setSelectedCoat] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");

  const { myData, isLoading } = useFetch(myUrl);

  const formatUrl = (pageNumberToFetch) => {
    const urlToFetch = `https://api.petfinder.com/v2/animals?type=${animalType}&page=${pageNumberToFetch}`;
    return urlToFetch;
  };
  const removeDupes = (myData) => {
    const noDupes = new Set();
    for (item of myData) {
      noDupes.add(item);
    }
    return Array.from(noDupes);
  };
  useEffect(() => {
    setMyUrl(defaultUrl);
  }, []);

  useEffect(() => {
    const formattedUrl = formatUrl(currentPage);
    setMyUrl(formattedUrl);
  }, [currentPage, animalType]);
  // useEffect(() => {

  //   const uniqueData = removeDupes(myData);
  //   setMyData(uniqueData);
  // }, [myData]);

  const nextPage = () => {
    if (currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const handleSelect = (e) => {
  //   e.preventDefault();

  //   const chosenAnimal = e.target.value;
  //   setAnimalType(chosenAnimal);
  //   const selectedAnimal = typesData.find(
  //     (animal) => animal.name === chosenAnimal
  //   );
  //   if (selectedAnimal) {
  //     setCoats(selectedAnimal.coats);
  //     setColors(selectedAnimal.colors);
  //     setSelectedCoat(selectedAnimal.coats[0]);

  //     const filteredData = filterData(selectedCoat, myData);

  //     setFilteredData(filteredData);
  //   } else {
  //     setColors([]);
  //     setCoats([]);
  //     setFilteredData([]);
  //   }
  // };

  // const filterData = (selectedCoat, myData) => {
  //   if (!selectedCoat) {
  //     return myData;
  //   }

  //   const filteredCoats = myData.filter((item) => item.coat === selectedCoat);
  //   const filteredColors = myData.filter((item) => {
  //     let hasMatchingColor = false
  //     for (let color in colors) {
  //       if (color === selectedColor) {
  //         hasMatchingColor = true
  //       }
  //     }
  //     if (hasMatchingColor) {
  //       return hasMatchingColor
  //     }
  //   });
  //   return filteredCoats && filteredColors;
  // };

  // function arrHasValue(arr, value) {
  //   return
  // }

  useEffect(() => {
    if (selectedAnimal != "all") {
          const newAnimalChoice = typesData.find(
      (animal) => animal.name === selectedAnimal
    );
    setCoats(newAnimalChoice.coats);

    // const newCoatChoices = typesData
    // console.log('newCoatChoices :>> ', newCoatChoices);
    }

  }, [selectedAnimal]);




  // const filteredColorOptions =

  // useEffect(() => {
      // console.log('coats, colors :>> ', coats, colors);
    // const newChoice = colors.filter(
    //   (color) => animal.colors === selectedCoat
    //   );
      // console.log("newChoice of color", newChoice)
    // setColors(newChoice.coats);
  // }, [selectedCoat]);

  function combinedFilters() {
    if (!myData.animals) {
      return;
    }

    const filteredCoats = myData.animals.filter(
      (item) => item.coat === selectedCoat || selectedCoat === "all"
    );
    const filteredColors = myData.animals.filter((item) => {
      let hasMatchingColor = false;
      let colors = item.colors;
      for (let property in colors) {
        // console.log('value, property :>> ', property, colors[property]);
        if (colors[property] === selectedColor || selectedColor === "all") {
          hasMatchingColor = true;
        }
      }
      if (hasMatchingColor) {
        // console.log("item has matcing color", item)
        return hasMatchingColor;
      }
    });
    console.warn("filteredColors :>> ", filteredColors);
    console.warn("filteredCoats :>> ", filteredCoats);
    return filteredCoats && filteredColors;
  }

  const pleaseWork = combinedFilters();

  console.warn("pleaseWork :>> ", pleaseWork);

  console.log("myData :>> ", myData);

  console.log("selectedAnimal", selectedAnimal);

  return (
    <>
      <NavBar />

      <label htmlFor="animalType">Select animal:</label>
      <select
        id="animalType"
        name="animalType"
        // onChange={handleSelect}
        onChange={(e) => {
          setSelectedAnimal(e.target.value);
        }}
        value={selectedAnimal}
      >
        <option value="all">All</option>
        {typesData.map((animal, index) => (
          <option key={index} value={animal.name}>
            {animal.name}
          </option>
        ))}
      </select>
      <label htmlFor="breeds">Select breed:</label>
      <select name="breeds" id="breeds"></select>
      <label htmlFor="coats">Select coat type:</label>
      <select
        id="coats"
        name="coats"
        value={selectedCoat}
        onChange={(e) => setSelectedCoat(e.target.value)}
      >
        <option value="all">All</option>

        {coats.map((coat, index) => (
          <option key={index} value={coat}>
            {coat}
          </option>
        ))}
      </select>
      <label htmlFor="colors">Select color:</label>
      <select
        name="color"
        id="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        <option value="all">All</option>

        {colors.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>

      <Outlet />

      {!isLoading && myData && (
        <Cards myData={myData} onClick={handleAnimalClick} />
      )}
      <button onClick={prevPage}>Previous Page</button>
      <button onClick={nextPage}>Next Page</button>
      <p>Current Page: {currentPage}</p>
    </>
  );
}

export default Content;
