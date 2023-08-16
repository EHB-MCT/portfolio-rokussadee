import React, { useState, useEffect } from 'react';

import socket from '../utils/client'; // Import the socket instance
import {apiService} from '../utils/ApiService';

const buttonNames = ['drummer', 'synth', 'composer']

function Roles({updateRole}) {
  // ... React component code
  const [userRole, setUserRole] = useState('');
  const [removedRoles, setRemovedRoles] = useState([]);
  const [rollCount, setRollCount] = useState(0);
  const [roomId, setRoomId] = useState('');

  const handleRemoveRole = (role) => {
    setRemovedRoles((prevRemovedRoles) => [...prevRemovedRoles, role]);
  };
    
  const handleIncrementRollCount = () => {
    setRollCount((prevRollCount) => prevRollCount + 1);
  };

  const handleRoomId = (id) => {
    setRoomId(id)
    sessionStorage.setItem('room_id', id)
  }

  useEffect(() => {
    // Attach socket event listeners
    socket.on('remove-role', handleRemoveRole);
  
    socket.on('increment-rollcount', handleIncrementRollCount);

    socket.on('receive-room_id', handleRoomId)
  
    // Detach socket event listeners when the component unmounts
    return () => {
      socket.off('remove-role', handleRemoveRole);
      socket.off('increment-rollcount', handleIncrementRollCount);
    };
  }, []);

useEffect(() => {
  console.log(rollCount)
  if (rollCount === 3) {
    updateRole(userRole)
  }
}, [rollCount]);


//  useEffect(() => {
//    console.log('roomId: ', roomId, roomId == '')
//    if(roomId !== '') nextPage(roomId)
//  }, [roomId])

  // Function to handle role button clicks
  const handleRoleClick = (role) => {
    if (role === '') return;

    console.log('handleRoleClick')

    socket.emit('set-role', role);
    setUserRole(role);
  }

  const isButtonDisabled = (role) => removedRoles.includes(role);
  
  const getButtonStyle = (role) => ({
    borderColor:  userRole === role ? 'blue' : 'initial',
    color:  userRole === role ? 'blue' : 'initial',
  });

  const saveRoom = async (id) => {
    //TODO: axios post request to '/save-room'
    try {
      apiService.createNewRoom(id)
      .then(response => response.data)
      .then(data => {
        console.log(`room with id ${roomId} has been saved to the db: `, data)
      })
    } catch(e) {
      console.error('error creating new room: ', e)
    }
  }

  return (
    <div>
      {buttonNames.map((role) => (
        <button 
          className="button" 
          id={role}
        key={role}
        name={role}
        onClick={() => handleRoleClick(role)} 
        disabled={isButtonDisabled(role)}
        style={getButtonStyle(role)}>
          {role}
        </button>
      ))}
    </div>
  );

}

export default Roles;
