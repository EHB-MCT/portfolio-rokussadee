import React, {useState, useEffect, Fragment} from "react";

function Synth() {
  const notes = {
    "C4": 261.63,
    "Db4": 277.18,
    "D4": 293.66,
    "Eb4": 311.13,
    "E4": 329.63,
    "F4": 349.23,
    "Gb4": 369.99,
    "G4": 392.00,
    "Ab4": 415.30,
    "A4": 440,
    "Bb4": 466.16,
    "B4": 493.88,
    "C5": 523.25
  }

  return (
    <Fragment>
      <ul>
        {Object.entries(notes).map(([key, value]) => (
          <li key={key} data-note={key}>{key}</li>
        ))}
      </ul>
    </Fragment>
  )
};

export default Synth;
