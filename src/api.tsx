import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),

  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },

  deleteDog: (id: number): Promise<void> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete dog");
      }
    });
  },

  updateDogFavoriteStatus: (dog: Partial<Dog>): Promise<void | Dog> => {
    const { id } = dog;
    return fetch(`${baseUrl}/dogs/${id}`, {
      body: JSON.stringify({ isFavorite: dog.isFavorite }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(id, dog.isFavorite);
        console.log(data);
      });
  },
};
