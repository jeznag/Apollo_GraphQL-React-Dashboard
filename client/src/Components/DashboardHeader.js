import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getDashboardAllDataQuery, getUserDataQuery } from '../queries/queries';
import { Statistic, Header, Divider } from 'semantic-ui-react';

export default function DashboardHeader(props) {
  const { loading: carLoading, error: carError, data: carData } = useQuery(
    getDashboardAllDataQuery,
    {
      variables: {
        vehicleId: props.vehicleIdState.value,
      },
    }
  );
  const { error: userError, data: userData } = useQuery(getUserDataQuery);

  if (carLoading) {
    return <div> </div>
  } else if ((carError, userError)) {
    return <p>Error! {(carError, userError)}</p>;
  } else {
    return (
      <div className="hero-img" style={{ height:"300px" }}>
        <Header as="h1">What can we help you with {userData.userData.firstName}</Header>
        <div className="hero-img-car-data">
          <h1 style={{ color: '#fff' }}>
            {carData.car.make} {carData.car.model}'s Lifetime Statistics from
            GOFAR
          </h1>
          <Divider hidden />
          <Statistic.Group size="mini">
            <Statistic>
              <Statistic.Label> Total trips </Statistic.Label>
              <Statistic.Value>{carData.car.trips.length}</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>Total Distance</Statistic.Label>
              <Statistic.Value>{carData.car.travelDistanceTotal} KM</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>Time in Car (hrs) </Statistic.Label>
              <Statistic.Value>{carData.car.timeInCar} </Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>Current Odometer</Statistic.Label>
              <Statistic.Value>{Math.floor(carData.car.odometer)} KM</Statistic.Value>
            </Statistic>
          </Statistic.Group>
        </div>
      </div>
    );
  }
}
