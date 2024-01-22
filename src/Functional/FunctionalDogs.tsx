import React from "react";
import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

export interface FunctionalDogsProps {
  dogs?: Dog[];
  updateDog: (dog: Dog) => void;
  deleteDog: (id: number) => void;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
}

export const FunctionalDogs: React.FC<FunctionalDogsProps> = ({
  dogs = [],
  deleteDog,
  onHeartClick,
  onEmptyHeartClick,
  isLoading,
}) => {
  const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
    console.log(
      "handleToggleFavorite called for dog ID:",
      id,
      "isFavorite:",
      isFavorite
    );

    if (!isFavorite) {
      console.log(
        "Calling onHeartClick with ID:",
        id,
        "isFavorite:",
        isFavorite
      );
      await onEmptyHeartClick(id, !isFavorite);
    } else {
      console.log(
        "Calling onEmptyHeartClick with ID:",
        id,
        "isFavorite:",
        !isFavorite
      );
      await onHeartClick(id, isFavorite);
    }
  };
  return (
    <>
      <section id="main-section">
        <div className="content-container">
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onTrashIconClick={() => deleteDog(dog.id)}
              onHeartClick={() => handleToggleFavorite(dog.id, dog.isFavorite)}
              onEmptyHeartClick={() =>
                handleToggleFavorite(dog.id, !dog.isFavorite)
              }
              isLoading={isLoading}
            />
          ))}
        </div>
      </section>
    </>
  );
};
