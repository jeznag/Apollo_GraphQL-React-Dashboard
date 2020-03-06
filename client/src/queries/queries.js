import { gql } from 'apollo-boost';

const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      authToken
      successful
    }
  }
`;

const getCarsQuery = gql`
  {
    cars {
      carName
      id
    }
  }
`;

const getUserDataQuery = gql`
  {
    userData {
      id
      firstName
      cars {
        displayName
        model
        make
        id
      }
    }
  }
`;

const getDashboardAllDataQuery = gql`
  query getDataForCar($vehicleId: ID!) {
    car(id: $vehicleId) {
      displayName
      odometer
      make
      model
      refillData {
        litres
        totalCost
        odometerKms
        timestamp
        location {
          lat
          lng
        }
      }
      odometerAtRefill
      lastFillUp
      lastFillUpTime
      lastLocation {
        lat
        lng
      }
      kmsLeft
      lifeAveragePer100Km
      averagePer100Km
      litresLeft
      travelSince
      diagnosticIssue {
        code
        isActive
      }
      businessRatio
      businessTotal
      averageSpeed
      travelDistanceTotal
      travelDistanceThisYear
      timeInCar
      emissions
      fuelEconomy
      timeTraveled
      recentTrip {
        id
        score
        litres
        litresPerHundredKm
        distance
        averageSpeed
        durationInSeconds
        startTime
        endTime
        tags {
          name
          id
          tagType
        }
      }
      trips {
        numberOfEvents
        litres
        litresPerHundredKm
        distance
        averageSpeed
        durationInSeconds
        startTime
        endTime
        tags {
          name
          id
          tagType
        }
        startLocation {
          displayName
          geoPoint {
            lat
            lng
          }
        }
        endLocation {
          displayName
          geoPoint {
            lat
            lng
          }
        }
      }
      parkedVehicle {
        name
        location {
          lat
          lng
        }
        timestamp
      }
    }
  }
`;

export {
  getCarsQuery,
  getUserDataQuery,
  getDashboardAllDataQuery,
  LOGIN_QUERY,
};
