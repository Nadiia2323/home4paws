import React from "react";
import "./Cards.css";

function Cards({ myData, onClick }) {
  return (
    <div>
      <div className="cards-container">
        {myData &&
          myData.animals.map((pet, index) => (
            <div className="card" key={index}>
              <div className="pet-info">
                <h3 className="pet-name">{pet.name}</h3>
                <p className="pet-age">Age: {pet.age}</p>
              </div>

              {pet.photos.length > 0 && (
                <img
                  className="cards-img"
                  src={pet.photos[0].full}
                  alt={pet.name}
                />
              )}
              <button className="details" onClick={() => onClick(pet.id)}>
                View Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cards;
