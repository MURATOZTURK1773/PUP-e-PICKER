import { Component } from "react";
import { dogPictures } from "../dog-pictures";

interface ClassCreateDogFormProps {
  children: React.ReactNode;
}

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps> {
  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input type="text" onChange={() => {}} disabled={false} />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => {}}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select onChange={(e) => {}} disabled={false}>
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
          {this.props.children}
        </select>
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
