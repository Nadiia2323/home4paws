import React, { useState, useEffect, useContext } from "react";
import Cards from "./Cards";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "./Cards.css";
import "../Pages/Profile.css";
import { FilterContext } from "./Context/FIlterContext";

function Content({ typesData: unreliableLinks }) {
  const typesData = unreliableLinks.types.filter((link) => {
    return !link.name.includes(" ");
  });

  const navigate = useNavigate();

  const handleAnimalClick = (animalId) => {
    navigate(`/animals/${animalId}`);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedCoat, setSelectedCoat] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const defaultUrl = `https://api.petfinder.com/v2/animals?type=${selectedAnimal}&coat=${selectedCoat}&color=${selectedColor}&page=${currentPage}`;
  const { myData, isLoading } = useFetch(defaultUrl);

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

  const generateCoatOptions = () => {
    const selectedAnimalData = typesData.find(
      (animal) => animal.name === selectedAnimal
    );

    if (selectedAnimalData) {
      return selectedAnimalData.coats.map((coat, index) => (
        <option
          key={`${selectedAnimal.toLowerCase()}Coat${index}`}
          value={coat}
        >
          {coat}
        </option>
      ));
    } else {
      return null;
    }
  };
  const generateColorOptions = () => {
    const selectedAnimalData = typesData.find(
      (animal) => animal.name === selectedAnimal
    );

    if (selectedAnimalData) {
      return selectedAnimalData.colors.map((color, index) => (
        <option
          key={`${selectedAnimal.toLowerCase()}Color${index}`}
          value={color}
        >
          {color}
        </option>
      ));
    } else {
      return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="filters-container">
        <label htmlFor="animalType">Select animal:</label>
        <select
          id="animalType"
          name="animalType"
          onChange={(e) => {
            setSelectedAnimal(e.target.value);
            setSelectedCoat("");
            setSelectedColor("");
          }}
          value={selectedAnimal}
        >
          <option value="">All</option>
          {typesData.map((animal, index) => (
            <option key={index} value={animal.name}>
              {animal.name}
            </option>
          ))}
        </select>

        <label htmlFor="coats">Select coat type:</label>
        <select
          id="coats"
          name="coats"
          value={selectedCoat}
          onChange={(e) => setSelectedCoat(e.target.value)}
        >
          <option value="">All</option>
          {generateCoatOptions()}
        </select>
        <label htmlFor="colors">Select color:</label>
        <select
          name="color"
          id="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">All</option>
          {generateColorOptions()}
        </select>
      </div>

      <Outlet />
      {isLoading ? (
        <div className="loading-container">
          <div className="lds-heart">
            <div></div>
          </div>
        </div>
      ) : (
        !isLoading &&
        myData && <Cards myData={myData} onClick={handleAnimalClick} />
      )}
      <div className="container-for-pagination">
        <button className="pagination" onClick={prevPage}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
        <p>Current Page: {currentPage}</p>
      </div>
    </>
  );
}

export default Content;
