import { useEffect, useState } from "react";
// import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";
import { FunctionalDogsProps } from "./FunctionalDogs";
import { SectionLayout } from "../Layouts/SectionalLayout";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

export function FunctionalApp(props: FunctionalDogsProps) {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    setIsLoading(true);
    refetchData()
      .then((dogs) => {
        setAllDogs(dogs);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, [props.onHeartClick, props.onEmptyHeartClick]);

  const refetchData = () => {
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
        return dogs;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };

  const updateDog = (dog: Dog) => {
    setIsLoading(true);
    return Requests.updateDogFavoriteStatus({
      id: dog.id,
      isFavorite: dog.isFavorite,
    })
      .then(() => {
        return refetchData();
      })
      .catch((error) => {
        console.error("Error updating dog:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    Requests.postDog(dog).then(refetchData);
  };

  const deleteDog = (id: number) => {
    Requests.deleteDog(id).then(refetchData);
  };

  const handleHeartClick = async (id: number, isFavorite: boolean) => {
    return Requests.updateDogFavoriteStatus({
      id: id,
      isFavorite: isFavorite,
    }).then(() => {
      refetchData();
    });
  };

  const favoritedDogsCount = isLoading
    ? 0
    : allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedDogsCount = isLoading
    ? 0
    : allDogs.filter((dog) => !dog.isFavorite).length;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        deleteDog={deleteDog}
        updateDog={updateDog}
        createDog={createDog}
        favoritedCount={favoritedDogsCount}
        unfavoritedCount={unfavoritedDogsCount}
        dogs={allDogs}
        handleHeartClick={handleHeartClick}
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setAllDogs={setAllDogs}
        allDogs={allDogs}
        onEmptyHeartClick={handleHeartClick}
        onHeartClick={handleHeartClick}
      />
    </div>
  );
}
