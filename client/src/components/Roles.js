import React, { useState, useEffect, Fragment } from 'react';

import socket from '../utils/client'; // Import the socket instance
import { apiService } from '../utils/ApiService';

const buttonNames = ['drummer', 'synth', 'composer']

function Roles({updateRole}) {
  // ... React component code
  const [username, setUsername] = useState('')
  const [userRole, setUserRole] = useState('');
  const [removedRoles, setRemovedRoles] = useState([]);
  const [rollCount, setRollCount] = useState(0);
  const [userID, setUserID] = useState()
  const [roomID, setRoomID] = useState()

  const handleRemoveRole = (role) => {
    setRemovedRoles((prevRemovedRoles) => [...prevRemovedRoles, role]);
  };
    
  const handleIncrementRollCount = () => {
    setRollCount((prevRollCount) => prevRollCount + 1);
  };

  const handleRoomId = (id) => {
    setRoomID(id)
    sessionStorage.setItem('room_id', id)
  }

  const handleUserId = (id) => {
    setUserID(id)
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

  useEffect(() => {
    userID !== '' ? sessionStorage.setItem('user_id', userID) : null
//    socket.emit('room_users_data', {room_uuid: roomID, user_id: userID})
  }, [userID])

  const handleRoleClick = (role) => {
    if (role === '') return;

    console.log('handleRoleClick')

    socket.emit('set-role', role);
    setUserRole(role);
  }

  const isButtonDisabled = (role) => removedRoles.includes(role);
  const isUsernameDisabled = () => 8<=username.length && username.length<=15
  
  const getButtonStyle = (role) => ({
    borderColor:  userRole === role ? 'blue' : 'initial',
    color:  userRole === role ? 'blue' : 'initial',
  });

  const saveUser = async () => {
    try {
      apiService.createNewUser(username)
      .then(response => response.data)
      .then((data) => {
        console.log(data.user.id)
        handleUserId(data.user.id)
      })
      .then(() => {
        console.log(userID)
      })
    } catch(e) {
      console.error('error creating new user: ', e)
    }
  }

  return (
    <Fragment>
      <div>
      <label>
        username:
        <input value={username} onChange={e => setUsername(e.target.value) } name='username'/>
      </label>
      <button onClick={() => saveUser()} disabled={!isUsernameDisabled()}>
        Save username
      </button>
      </div>
      { userID &&
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
        }
    </Fragment>
  );

}

export default Roles;
