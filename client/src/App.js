import React, { useState, useEffect } from 'react';
import socket from './client'; // Import the socket instance

const buttonNames = ['drummer', 'synth', 'composer']


function App() {

  // ... React component code
  const [userRole, setUserRole] = useState('');
  const [removedRoles, setRemovedRoles] = useState([])
  const [rollCount, setRollCount] = useState(0);

  const handleRemoveRole = (role) => {
    setRemovedRoles((prevRemovedRoles) => [...prevRemovedRoles, role]);
  };
    
  const handleIncrementRollCount = () => {
    setRollCount((prevRollCount) => prevRollCount + 1);
  };

  useEffect(() => {
    // Attach socket event listeners
    socket.on('remove-role', handleRemoveRole);
  
    socket.on('increment-rollcount', handleIncrementRollCount);
  
    // Detach socket event listeners when the component unmounts
    return () => {
      socket.off('remove-role', handleRemoveRole);
      socket.off('increment-rollcount', handleIncrementRollCount);
    };
  }, []);

  useEffect(() => {
    console.log(rollCount)
    if (rollCount === 3) {
      nextPage();
    }
  }, [rollCount]);

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

  const nextPage = async () => {
    //TODO: axios post request to '/create-room'
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

export default App;
