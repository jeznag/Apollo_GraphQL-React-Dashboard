const { calculateFuelLeft } = require("./index");

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

  test("should calculate correctly if there are no trips after a refill", () => {
    let fakeTrips = [{}];
    let fakeRefills = [{ litres: 50, timestamp: "2020-3-5" }];

    let actualResult = calculateFuelLeft(fakeRefills, fakeTrips);
    expect(actualResult).toEqual({
      averagePer100Km: 0,
      kmsLeft: 0,
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
});
