import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog } from "../types";
import { SectionLayout } from "../Layouts/SectionalLayout";
import { DogCard } from "../Shared/DogCard";

interface FunctionalSectionProps {
  favoritedCount: number;
  unfavoritedCount: number;
  updateDog: (dog: Dog) => void;
  createDog: (dog: Omit<Dog, "id">) => void;
  deleteDog: (id: number) => void;
  dogs?: Dog[];
  children: React.ReactNode;
  handleToggleFavorite: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  updateDog,
  createDog,
  deleteDog,
  dogs,
  favoritedCount,
  unfavoritedCount,
  handleToggleFavorite,
  isLoading,
}) => {
  // console.log("Received dogs prop:", dogs);

  const [activeTab, setActiveTab] = useState("");
  const [renderDogs, setRenderDogs] = useState<Dog[]>(dogs ?? []);

  const handleTabClick = (tab: string) => {
    const favoritedDogs = dogs?.filter((dog) => dog.isFavorite) || [];
    const unfavoritedDogs = dogs?.filter((dog) => !dog.isFavorite) || [];

    // console.log("Favorited Dogs:", favoritedDogs);
    // console.log("Unfavorited Dogs:", unfavoritedDogs);

    setActiveTab((prevTab) => (prevTab === tab ? "" : tab));

    switch (tab) {
      case "favorited":
        setRenderDogs(
          favoritedDogs.map((dog) => ({
            ...dog,
            onTrashIconClick: () => deleteDog(dog.id),
            onHeartClick: () => handleToggleFavorite(dog.id, false),
            onEmptyHeartClick: () => handleToggleFavorite(dog.id, true),
          }))
        );
        // console.log("render dogs:", renderDogs);

        break;
      case "unfavorited":
        setRenderDogs(
          unfavoritedDogs.map((dog) => ({
            ...dog,
            onEmptyHeartClick: () => handleToggleFavorite(dog.id, true),
            onHeartClick: () => handleToggleFavorite(dog.id, false),
            onTrashIconClick: () => deleteDog(dog.id),
          }))
        );

        break;
      case "create dog":
        setRenderDogs([]);
        break;
      default:
        setRenderDogs(dogs || []);
        break;
    }
  };

  return (
    <section id="main-section-primary">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>

        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => handleTabClick("favorited")}
          >
            favorited ( {favoritedCount} )
          </div>

          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => handleTabClick("unfavorited")}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${activeTab === "create dog" ? "active" : ""}`}
            onClick={() => handleTabClick("create dog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        <div>
          {activeTab !== "favorited" &&
            activeTab !== "unfavorited" &&
            activeTab !== "create dog" && (
              <SectionLayout>
                <FunctionalDogs
                  updateDog={updateDog}
                  deleteDog={deleteDog}
                  onHeartClick={handleToggleFavorite}
                  onEmptyHeartClick={handleToggleFavorite}
                  dogs={dogs}
                  isLoading={isLoading}
                />
              </SectionLayout>
            )}

          {activeTab === "favorited" && (
            <SectionLayout>
              <FunctionalDogs
                updateDog={updateDog}
                deleteDog={deleteDog}
                onHeartClick={handleToggleFavorite}
                onEmptyHeartClick={handleToggleFavorite}
                dogs={renderDogs}
                isLoading={isLoading}
              />
            </SectionLayout>
          )}

          {activeTab === "unfavorited" && (
            <SectionLayout>
              <FunctionalDogs
                updateDog={updateDog}
                deleteDog={deleteDog}
                onHeartClick={handleToggleFavorite}
                onEmptyHeartClick={handleToggleFavorite}
                dogs={renderDogs}
                isLoading={isLoading}
              />
            </SectionLayout>
          )}

          {activeTab === "create dog" && (
            <SectionLayout>
              <FunctionalCreateDogForm createDog={createDog} />
            </SectionLayout>
          )}
        </div>
      </div>
    </section>
  );
};
