import React, {useState, useEffect, Fragment} from "react";
import Drummer from "./Drummer";
import Composer from "./Composer";
import Synth from "./Synth";
import {apiService} from '../utils/ApiService';

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
  const userID = sessionStorage.getItem('user_id')
  const uuid = sessionStorage.getItem('room_id')

  const saveRoom = async (uuid) => {
    //TODO: axios post request to '/save-room'
    try {
      apiService.createNewRoom(uuid)
      .then(response => response.data)
      .then(data=> {
        console.log(data)
        if(data.is_new === true) {
          console.log(`room '${uuid}' with id ${data.room.id} has been saved to the db`)
        } else {
          console.log(`room '${uuid}' with id ${data.room.id} was found in the database`)
        }
        return data.room.id
      })
      .then((dbID)=> {
        apiService.saveRelationship(dbID, userID)
      })
    } catch(e) {
      console.error('error creating new room: ', e)
    }
  }

  return (
    <Fragment>
      <div>
        <p>Welcome {passedRole}</p>
        <InstrumentContainer roleObject={passedRole}/>
      </div>
      <div>
        <button onClick={() => saveRoom(uuid)}>
          Save Room
        </button>
      </div>
    </Fragment>
  )
}

export default Instrument;
