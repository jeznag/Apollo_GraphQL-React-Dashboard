import React, { useState } from 'react';
import CarList from '../../Components/CarList';
import DashboardHeader from '../../Components/DashboardHeader';
import CarData from '../../Components/CarData';
import Footer from '../../Components/Footer';

export default function DashboardView() {
  const [vehicleIdSelectionState, setVehicleIdSelectionState] = useState(null);
  const selectVehicle = vehicleIdSelectionState => {
    setVehicleIdSelectionState(vehicleIdSelectionState);
  };

  if (vehicleIdSelectionState != null) {
    return (
      <>
        <DashboardHeader vehicleIdState={vehicleIdSelectionState} />
        <CarList vehicleSelection={selectVehicle} />
        <CarData vehicleIdState={vehicleIdSelectionState} />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div style={{paddingTop:"5vh"}}>
          <CarList vehicleSelection={selectVehicle} />
        </div>
        <div
          style={{ height: '500px', textAlign: 'center', paddingTop: '50px', paddingBottom:'50px' }}
        >
          <h1>You have to choose a vehicle</h1>
          <img
            src="https://media.giphy.com/media/xT3i0ZscbtF5DvLrGg/giphy.gif"
            alt="Patrick-Gif"
          />
        </div>
        <div style={{paddingTop:"10vh"}}>
          <Footer />
        </div>
      </>
    );
  }
}
