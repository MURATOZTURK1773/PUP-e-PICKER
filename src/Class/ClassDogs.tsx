import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { dogPictures } from "../dog-pictures";

interface ClassDogsProps {
  children: React.ReactNode;
}

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    return (
      <>
        <DogCard
          dog={{
            id: 1,
            image: dogPictures.BlueHeeler,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Blue Heeler",
          }}
          key={1}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
        <DogCard
          dog={{
            id: 2,
            image: dogPictures.Boxer,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Boxer",
          }}
          key={2}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
        <DogCard
          dog={{
            id: 3,
            image: dogPictures.Chihuahua,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Chihuahua",
          }}
          key={3}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
        <DogCard
          dog={{
            id: 4,
            image: dogPictures.Corgi,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Corgi",
          }}
          key={4}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
        <div>{this.props.children}</div>
      </>
    );
  }
}
