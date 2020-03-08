const fetch = require("isomorphic-fetch");
const API_URL = "https://dev.gofar.co/api/";

async function fetchJSON(url, options, authToken) {
  console.log(`Fetching ${url} with authToken ${authToken}`);
  const rawResponse = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authToken
    },
    ...options
  });
  return await rawResponse.json();
}

async function postJSON(url, payload, options) {
  const rawResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return await rawResponse.json();
}

async function getVehicleData(vehicleId, authToken) {
  return await fetchJSON(`${API_URL}vehicles/${vehicleId}`, {}, authToken);
}

async function getUserData(userId, authToken) {
  return await fetchJSON(`${API_URL}users/${userId}`, {}, authToken);
}

async function getOwnedVehicles(userId, authToken) {
  return await fetchJSON(
    `${API_URL}users/${userId}/ownedVehicles`,
    {},
    authToken
  );
}

async function getTripsForVehicle(vehicleId, authToken) {
  return await fetchJSON(
    `${API_URL}vehicles/${vehicleId}/trips?filter={"include":["tags", "startLocation", "endLocation"]}`,
    {},
    authToken
  );
}

async function getRecentTrip(vehicleId, authToken) {
  const originalTrip = `${API_URL}vehicles/${vehicleId}/trips`;
  const recentTrip = new URL(originalTrip);
  recentTrip.searchParams.append(
    "filter",
    JSON.stringify({ order: "createdAt DESC", limit: 1 })
  );
  return await fetchJSON(recentTrip.toString(), {}, authToken);
}

async function getParkedUserVehicles(userId, authToken) {
  return await fetchJSON(
    `${API_URL}/users/${userId}/parkedVehicles`,
    {},
    authToken
  );
}

async function getDiagnosticIssueForVehicle(vehicleId, authToken) {
  return await fetchJSON(
    `${API_URL}/vehicles/${vehicleId}/diagnosticTroubleCodes?filter={"where":{"isActive":true}}`,
    {},
    authToken
  );
}

async function getRefillData(vehicleId, authToken) {
  const baseRefillURL = `${API_URL}vehicles/${vehicleId}/refills`;
  const refillUrl = new URL(baseRefillURL);
  refillUrl.searchParams.append(
    "filter",
    JSON.stringify({ order: "createdAt DESC", limit: 1 })
  );
  return await fetchJSON(refillUrl.toString(), {}, authToken);
}

async function getTripSummaryData(userId, authToken) {
  const baseTravelDistanceTotalURL = `${API_URL}users/${userId}/summary`;
  const travelDistanceTotalUrl = new URL(baseTravelDistanceTotalURL);
  travelDistanceTotalUrl.searchParams.append(
    "filter",
    JSON.stringify({ order: "createdAt DESC", limit: 1 })
  );
  return await fetchJSON(travelDistanceTotalUrl.toString(), {}, authToken);
}

const getTotalForTrips = (trips, metric) => {
  return trips.reduce((total, trip) => {
    if (trip[metric]) {
      const parsedMetricValue = parseFloat(trip[metric]);
      if (!Number.isNaN(parsedMetricValue)) {
        return total + parsedMetricValue;
      }
    }

    return total;
  }, 0);
};

const lifeAverageKms = trips => {
  const lifeLitresUsed = getTotalForTrips(trips, "litres");
  const lifeDistance = getTotalForTrips(trips, "distance");

  const lifeAveragePer100Km = (lifeLitresUsed / lifeDistance) * 100;

  return { lifeAveragePer100Km };
};

const calculateFuelLeft = (refillData, trips, lifeAverageKms) => {
  if (
    refillData.length === 0 ||
    !refillData[0].timestamp ||
    !refillData[0].litres
  ) {
    return {
      kmsLeft: 0,
      litresLeft: 0,
      averagePer100Km: 0
    };
  }
  const refillTimeStamp = new Date(refillData[0].timestamp);
  const refillLitres = parseFloat(refillData[0].litres);

  const filteredTrips = trips.filter(trips => {
    return refillTimeStamp <= new Date(trips.endTime);
  });

  const totalLitresUsed = getTotalForTrips(filteredTrips, "litres");
  const totalDistance = getTotalForTrips(filteredTrips, "distance");

  const litresLeft = Math.max(0, (refillLitres || 0) - (totalLitresUsed || 0));

  const averagePer100Km =
    totalDistance > 0
      ? (totalLitresUsed / totalDistance) * 100
      : lifeAverageKms.lifeAveragePer100Km;

  const kmsLeft =
    averagePer100Km > 0 ? (litresLeft / averagePer100Km) * 100 : 0;

  return { kmsLeft, litresLeft, averagePer100Km };
};

async function getDetailsForVehicle(userId, vehicleId, authToken) {
  const [
    vehicleData,
    refillData,
    tripSummaryData,
    tripsForVehicle,
    diagnosticIssueForVehicle,
    recentTrip,
    parkedUserVehicles
  ] = await Promise.all([
    getVehicleData(vehicleId, authToken),
    getRefillData(vehicleId, authToken),
    getTripSummaryData(userId, authToken),
    getTripsForVehicle(vehicleId, authToken),
    getDiagnosticIssueForVehicle(vehicleId, authToken),
    getRecentTrip(vehicleId, authToken),
    getParkedUserVehicles(userId, authToken)
  ]);
  const lifeAveragePerKm = lifeAverageKms(tripsForVehicle);
  const fuelLeft = calculateFuelLeft(
    refillData,
    tripsForVehicle,
    lifeAveragePerKm
  );
  const finalResult = {
    id: vehicleId,
    make: vehicleData.make,
    model: vehicleData.model,
    odometer: vehicleData.calculatedOdometer,
    vehicleName: vehicleData.displayName,
    refillData: refillData,
    diagnosticIssue: diagnosticIssueForVehicle,
    diagnosticDetail: "TODO",
    travelSince: recentTrip.TODO,
    businessRatio: tripSummaryData.TODO,
    businessTotal: tripSummaryData.TODO,
    averageSpeed: tripSummaryData.averageSpeed,
    travelDistanceTotal: tripSummaryData.distance,
    timeInCar: tripSummaryData.durationInSeconds,
    emissions: tripSummaryData.co2,
    fuelEconomy: tripsForVehicle.litresPerHundredKm,
    brakingScore: tripSummaryData.brakingScore,
    speedScore: tripSummaryData.speedScore,
    corneringScore: tripSummaryData.corneringScore,
    accelerationScore: tripSummaryData.accelerationScore,
    totalScore: tripSummaryData.score,
    travelDistanceThisYear: 100,
    parking: recentTrip.location,
    timeTraveled: tripSummaryData.TODO,
    trips: tripsForVehicle,
    recentTrip: recentTrip,
    parkedVehicle: parkedUserVehicles,
    fuelLeft: fuelLeft.kmsLeft,
    averagePer100Km: fuelLeft.averagePer100Km,
    litresLeft: fuelLeft.litresLeft,
    lifeAveragePerKm: lifeAverageKms
  };
  return finalResult;
}

async function getLogin(email, password) {
  const loginURL = `${API_URL}users/login`;
  return await postJSON(loginURL.toString(), { email, password });
}

exports.calculateFuelLeft = calculateFuelLeft;
exports.lifeAverageKms = lifeAverageKms;

exports.handler = async (event, context) => {
  console.log("Received event", JSON.stringify(event, 3));

  const headers = event && event.headers;
  console.log("context", JSON.stringify(context));

  switch (event.field) {
    case "car": {
      const vehicleId = event.arguments.id;

      const vehicleData = await getDetailsForVehicle(
        headers.userid,
        vehicleId,
        headers.authorization
      );

      return vehicleData;
    }

    case "login": {
      const loginResponse = await getLogin(
        event.arguments.email,
        event.arguments.password
      );
      console.log("LoginResponse", loginResponse);
      return {
        userId: loginResponse.userId,
        authToken: loginResponse.id,
        successful: !!loginResponse.id
      };
    }
    case "userData": {
      const ownerData = await getUserData(
        headers.userid,
        headers.authorization
      );
      const ownedVehicles = await getOwnedVehicles(
        headers.userid,
        headers.authorization
      );

      return {
        ...ownerData,
        firstName: ownerData.firstname,
        cars: ownedVehicles
      };
    }
    default:
      return "Unknown field, unable to resolve" + event.field;
  }
};
