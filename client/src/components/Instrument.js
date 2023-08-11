import React, {useState, useEffect} from "react";
import Drummer from "./Drummer";
import Composer from "./Composer";
import Synth from "./Synth";

function InstrumentContainer({roleObject}) {
  const role = roleObject
  console.log(role === "synth")
  console.log('unpacked:',role)
  switch (role) {
    case "composer":
      return <Composer />
    case "drummer":
      return <Drummer />
    case "synth":
      return <Synth />
    default:
      return null;
  }
}


function Instrument({passedRole}) {
   return (
    <div>
      <p>Welcome {passedRole}</p>
      <InstrumentContainer roleObject={passedRole}/>
    </div>

  )
}

export default Instrument;
