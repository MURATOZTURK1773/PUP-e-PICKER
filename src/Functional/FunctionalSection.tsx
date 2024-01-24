import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog } from "../types";
import { SectionLayout } from "../Layouts/SectionalLayout";
import { Requests } from "../api";

interface FunctionalSectionProps {
  favoritedCount: number;
  unfavoritedCount: number;
  updateDog: (dog: Dog) => void;
  createDog: (dog: Omit<Dog, "id">) => void;
  deleteDog: (id: number) => void;
  dogs?: Dog[];
  handleHeartClick: (id: number, isFavorite: boolean) => void;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  allDogs: Dog[];
  setAllDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  onHeartClick: (id: number, isFavorite: boolean) => void;
  onEmptyHeartClick: (id: number, isFavorite: boolean) => void;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = (
  props: FunctionalSectionProps
) => {
  // const refetchDataCallback = useCallback(() => {
  //   return Requests.getAllDogs().then((dogs) => {
  //     props.setAllDogs(dogs);
  //     return dogs;
  //   });
  // }, [props.onEmptyHeartClick, props.onHeartClick]);
  const refetchData = () => {
    return Requests.getAllDogs()
      .then((dogs) => {
        props.setAllDogs(dogs);
        return dogs;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };

  const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
    try {
      await Requests.updateDogFavoriteStatus({
        id: id,
        isFavorite: !isFavorite,
      })
        // const updatedDogs = await refetchData();
        // props.setAllDogs(updatedDogs);
        .then(() => {
          refetchData();
        });
    } catch (error) {
      console.error("Error updating dog favorite status:", error);
    }
    console.log(props.activeTab);
  };

  const handleTabClick = (tab: string) => {
    const favoritedDogs = props.dogs?.filter((dog) => dog.isFavorite) || [];
    const unfavoritedDogs = props.dogs?.filter((dog) => !dog.isFavorite) || [];

    props.setActiveTab((prevTab) => (prevTab === tab ? "" : tab));

    switch (tab) {
      case "favorited":
        //    setRenderDogs(favoritedDogs);
        props.setAllDogs(favoritedDogs);
        break;
      case "unfavorited":
        //    setRenderDogs(unfavoritedDogs);
        props.setAllDogs(unfavoritedDogs);
        break;
      case "create dog":
        //    setRenderDogs([]);
        props.setAllDogs([]);
        break;
      default:
        //    setRenderDogs(dogs || []);
        props.setAllDogs(props.dogs || []);
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
            className={`selector ${
              props.activeTab === "favorited" ? "active" : ""
            }`}
            onClick={() => handleTabClick("favorited")}
          >
            favorited ( {props.favoritedCount} )
          </div>

          <div
            className={`selector ${
              props.activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => handleTabClick("unfavorited")}
          >
            unfavorited ( {props.unfavoritedCount} )
          </div>
          <div
            className={`selector ${
              props.activeTab === "create dog" ? "active" : ""
            }`}
            onClick={() => handleTabClick("create dog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        <div>
          {props.activeTab !== "favorited" &&
            props.activeTab !== "unfavorited" &&
            props.activeTab !== "create dog" && (
              <SectionLayout>
                <FunctionalDogs
                  updateDog={props.updateDog}
                  deleteDog={props.deleteDog}
                  onHeartClick={handleToggleFavorite}
                  onEmptyHeartClick={handleToggleFavorite}
                  dogs={props.dogs}
                  isLoading={props.isLoading}
                  activeTab="activeTab"
                  setActiveTab={props.setActiveTab}
                />
              </SectionLayout>
            )}

          {props.activeTab === "favorited" && (
            <SectionLayout>
              <FunctionalDogs
                updateDog={props.updateDog}
                deleteDog={props.deleteDog}
                onHeartClick={handleToggleFavorite}
                onEmptyHeartClick={handleToggleFavorite}
                dogs={props.dogs}
                isLoading={props.isLoading}
                activeTab="activeTab"
                setActiveTab={props.setActiveTab}
              />
            </SectionLayout>
          )}

          {props.activeTab === "unfavorited" && (
            <SectionLayout>
              <FunctionalDogs
                updateDog={props.updateDog}
                deleteDog={props.deleteDog}
                onHeartClick={handleToggleFavorite}
                onEmptyHeartClick={handleToggleFavorite}
                dogs={props.dogs}
                isLoading={props.isLoading}
                activeTab="activeTab"
                setActiveTab={props.setActiveTab}
              />
            </SectionLayout>
          )}

          {props.activeTab === "create dog" && (
            <SectionLayout>
              <FunctionalCreateDogForm createDog={props.createDog} />
            </SectionLayout>
          )}
        </div>
      </div>
    </section>
  );
};
