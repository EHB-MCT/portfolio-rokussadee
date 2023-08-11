import React, {useState, useEffect, Fragment} from "react";

import Drummer from "./Drummer";
import Composer from "./Composer";
import Synth from "./Synth";

function InstrumentContainer({role}) {
  console.log(role)
  switch (role.toString()) {
    case 'composer':
      return (
        <Fragment>
          <Composer/>
        </Fragment>
      )
    case 'drummer':
      return (
        <Fragment>
          <Drummer/>
        </Fragment>
      )
    case 'synth':
      return (
        <Fragment>
          <Synth/>
        </Fragment>
      )
  }
}

export default InstrumentContainer;
