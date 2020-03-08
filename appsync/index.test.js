const { calculateFuelLeft } = require("./index");
const { lifeAverageKms } = require("./index");
const testTrips = require("./testData");

describe("lifeAverageKms", () => {
  test("Should calculate the average per 100km correctly on trips", () => {
    let fakeTrips = [
      { distance: 5, litres: 2, endTime: "2020-01-01" },
      { distance: 3, litres: 2, endTime: "2020-01-02" },
      { distance: 1, litres: 2, endTime: "2020-01-03" },
      { distance: 5, litres: 2, endTime: "2020-01-04" },
      { distance: 5, litres: 2, endTime: "2020-01-05" }
    ];
    let actualResult = lifeAverageKms(fakeTrips);
    expect(actualResult).toEqual({
      lifeAveragePer100Km: 52.63157894736842
    });
  });
});
describe("getFuelLeftData", () => {
  test("should calculate correctly if there are five trips after a refill", () => {
    let fakeTrips = [
      { distance: 5, litres: 2, endTime: "2020-01-01" },
      { distance: 3, litres: 2, endTime: "2020-01-02" },
      { distance: 1, litres: 2, endTime: "2020-01-03" },
      { distance: 5, litres: 2, endTime: "2020-01-04" },
      { distance: 5, litres: 2, endTime: "2020-01-05" }
    ];

    let fakeRefills = [{ litres: 20, timestamp: "2019-12-31" }];

    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips);
    expect(actualResult).toEqual({
      averagePer100Km: 52.63157894736842,
      kmsLeft: 19,
      litresLeft: 10
    });
  });

  test("should calculate correctly if there are no trips after a refill, it'll show lifetime averagePer100km instead of refill", () => {
    let fakeTrips = [{}];
    let fakeRefills = [{ litres: 50, timestamp: "2020-3-5" }];
    let oldTrips = [
      { distance: 5, litres: 2, endTime: "2020-01-01" },
      { distance: 3, litres: 2, endTime: "2020-01-02" },
      { distance: 1, litres: 2, endTime: "2020-01-03" },
      { distance: 5, litres: 2, endTime: "2020-01-04" },
      { distance: 5, litres: 2, endTime: "2020-01-05" }
    ];
    const lifeAverage = lifeAverageKms(oldTrips);

    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips, lifeAverage);
    expect(actualResult).toEqual({
      averagePer100Km: 52.63157894736842,
      kmsLeft: 95,
      litresLeft: 50
    });
  });

  test("should calculate correctly if there are no refills", () => {
    let fakeTrips = [
      { distance: 5, litres: 2, endTime: "2020-01-01" },
      { distance: 3, litres: 2, endTime: "2020-01-02" },
      { distance: 1, litres: 2, endTime: "2020-01-03" },
      { distance: 5, litres: 2, endTime: "2020-01-04" },
      { distance: 5, litres: 2, endTime: "2020-01-05" }
    ];
    let fakeRefills = [{}];
    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips);
    expect(actualResult).toEqual({
      averagePer100Km: 0,
      kmsLeft: 0,
      litresLeft: 0
    });
  });

  test("If timestamp returns null it should show 0 ", () => {
    let fakeTrips = [{ distance: 5, litres: 2, endTime: "2020-01-01" }];
    let fakeRefills = [{ litres: null, timestamp: null }];
    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips);
    expect(actualResult).toEqual({
      averagePer100Km: 0,
      kmsLeft: 0,
      litresLeft: 0
    });
  });

  test("Problematic data", () => {
    const fakeTrips = testTrips; 
    const fakeRefills = [
      {
        id: "fa04beea-7980-4267-8230-0250b4a65ded",
        litres: "33.10000",
        totalCost: "50.610",
        pricePerLitre: "1.529",
        timestamp: "2019-10-24T03:29:02.000Z",
        location: {
          lng: 152.975037691396,
          lat: -30.8210130964556
        },
        odometerKms: "250198.00",
        createdAt: "2019-10-24T03:29:54.425Z",
        updatedAt: "2019-10-24T03:29:54.425Z",
        deletedAt: null,
        _isDeleted: false,
        vehicleId: "27e1dabc-a89a-444d-bcc3-ace5a33a3d26"
      }
    ];
    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips, {});
    expect(actualResult).toEqual({
      averagePer100Km: 9.775739618786782,
      kmsLeft: 0,
      litresLeft: 0
    });
  });

  test("If there is no refill it should show 0", () => {
    let fakeTrips = [{ distance: 5, litres: 2, endTime: "2020-01-01" }];
    let fakeRefills = [];
    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips);
    expect(actualResult).toEqual({
      averagePer100Km: 0,
      kmsLeft: 0,
      litresLeft: 0
    });
  });

  test("If everything is null return 0 not null", () => {
    let fakeTrips = [{ distance: null, litres: null, endTime: "2020-01-01" }];
    let fakeRefills = [{ litres: null, timestamp: null }];

    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips);
    expect(actualResult).toEqual({
      averagePer100Km: 0,
      kmsLeft: 0,
      litresLeft: 0
    });
  });
});
