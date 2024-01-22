// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

export class ClassSection extends Component {
  render() {
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div className={`selector`} onClick={() => {}}>
              favorited ( 0 )
            </div>

            {/* This should display the unfavorited count */}
            <div className={`selector`} onClick={() => {}}>
              unfavorited ( 0 )
            </div>
            <div className={`selector active`} onClick={() => {}}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          <ClassDogs children />
          <ClassCreateDogForm children />
        </div>
      </section>
    );
  }
}
