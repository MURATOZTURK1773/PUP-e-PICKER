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

  updateDogFavoriteStatus: (
    dog: Partial<Omit<Dog, "id">> & { id: number; isFavorite: boolean }
  ): Promise<Dog> => {
    const { id, ...partialDog } = dog;
    return fetch(`${baseUrl}/dogs/${id}`, {
      body: JSON.stringify(partialDog),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },
};
