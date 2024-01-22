import { useEffect, useState } from "react";
// import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";
import { FunctionalDogsProps } from "./FunctionalDogs";

export function FunctionalApp(props: FunctionalDogsProps) {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

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
    Requests.updateDogFavoriteStatus({
      id: dog.id,
      isFavorite: dog.isFavorite,
    })
      .then(() => {
        refetchData();
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

  const handleHeartClick = (id: number, isFavorite: boolean) => {
    const dog = allDogs.find((dog) => dog.id === id);
    if (dog) {
      const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
      console.log("Updated Dog:", updatedDog);

      setIsLoading(true);

      Requests.updateDogFavoriteStatus({
        id: id,
        isFavorite: isFavorite,
      })
        .then((updatedDog) => {
          refetchData();

          setAllDogs((dogs) =>
            dogs.map((dog) => (dog.id === updatedDog.id ? updatedDog : dog))
          );
          console.log("All Dogs:", allDogs);
        })
        .catch((error) => {
          console.error("Error updating dog:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const favoritedDogsCount = isloading
    ? 0
    : allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedDogsCount = isloading
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
        handleToggleFavorite={handleHeartClick}
        isLoading={isloading}
        children
      />
    </div>
  );
}
