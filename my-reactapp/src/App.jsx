import React, { useState } from "react";

export default function App() {
  const [myArray, setMyArray] = useState(["Thing 1", "Thing 2"]);
  const arrayElements = myArray.map((thing) => <p key={thing}>{thing}</p>);

  function addElement() {
    setMyArray((prevArray) => [...prevArray, `Thing ${prevArray.length + 1}`]);
  }

  function removeElement() {
    setMyArray((prevArray) => {
  const  newArray=prevArray.slice(0, prevArray.length-1)
    return newArray
    });
  }

  return (
    <div>
      <div>{arrayElements} </div>
      <button type="button" onClick={addElement}>
        Add
      </button>
      <button type="button" onClick={removeElement}>
        Remove
      </button>
    </div>
  );
}
