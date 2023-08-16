import React, { useState, useEffect } from 'react';
import Roles from './components/Roles'
import Instrument from './components/Instrument'

function App() {

  const [userRole, setUserRole] = useState('')

  const updateRole = newRole => {
    setUserRole(newRole)
  }

  return (
    <div>
      <Roles updateRole={updateRole} />
    {userRole && <Instrument passedRole={userRole} />}
    </div>
  );
}

export default App;
