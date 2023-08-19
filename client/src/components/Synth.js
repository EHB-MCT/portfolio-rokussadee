import React, {useState, useEffect, Fragment, Component, useRef} from "react";
import * as Tone from 'tone'
import * as Nexus from 'nexusui'
Nexus.context = Tone.getContext().rawContext._nativeAudioContext

function Synth(){
  const lowNoteRef = useRef(24);
  const highNoteRef = useRef(60);
  const pianoRef = useRef(null)

  const keyMapper = { a: 0, w: 1, s: 2, e: 3, d: 4, f: 5, t: 6, g: 7, y: 8, h: 9, u: 10, j: 11, k: 12 }

  const updatePiano = () => {
    if (pianoRef.current) {
      pianoRef.current.destroy();
      createPiano(lowNoteRef.current, highNoteRef.current);
    }
  };

  const handleKeyDown = (event) => {
    const keyIndex = keyMapper[event.key]
    keyIndex !== undefined && pianoRef.current && !pianoRef.current.keys[keyIndex]._state.state ?
    pianoRef.current.toggleIndex(keyIndex, true) : null;

    if (event.key === ',' && lowNoteRef.current >= 24) {
      highNoteRef.current = lowNoteRef.current 
      lowNoteRef.current -= 12
      updatePiano();
    }

    if (event.key === '.' && highNoteRef.current <= 120) {
      lowNoteRef.current = highNoteRef.current
      highNoteRef.current += 12
      updatePiano();
    }

  };
  
  const handleKeyUp = (event) => {
    const keyIndex = keyMapper[event.key];
    keyIndex !== undefined && pianoRef.current && pianoRef.current.keys[keyIndex]._state.state ? 
    pianoRef.current.toggleIndex(keyIndex, false) : null;
    
  }

  useEffect(() => {
    createPiano(lowNoteRef.current, highNoteRef.current)
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return() => {
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const synth = new Tone.Synth().toDestination()
  
  const playSynth = () => {
    synth.triggerAttackRelease("C3", "16n");
  }

  const createPiano = (lowNote, highNote) => {
    const piano = new Nexus.Piano('#piano',{
      'size': [500,125],
      'mode': 'button',  // 'button', 'toggle', or 'impulse'
      'lowNote': lowNote,
      'highNote': highNote
    })

    pianoRef.current = piano

  }

  return (
    <Fragment>
      <div>
        <div id="piano" ></div>
      </div>
      <button onClick={()=>playSynth()}>
      </button>

    </Fragment>
  )
};

export default Synth;
