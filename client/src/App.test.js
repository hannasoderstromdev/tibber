import React from "react";
import { render } from "@testing-library/react";
import App, { transformDataForHighcharts } from "./App";

describe("transformDataForHighcharts", () => {
  it("returns data in correct format", () => {
    const data = {
      minTemperature: 5.2,
      maxTemperature: 10.5,
      entries: [
        { time: "2020-04-09T00:00:00+02:00", temperature: 9.6, type: "cloud" },
        { time: "2020-04-09T01:00:00+02:00", temperature: 9.4, type: "cloud" },
        { time: "2020-04-09T02:00:00+02:00", temperature: 9, type: "cloud" },
        { time: "2020-04-09T03:00:00+02:00", temperature: 8.5, type: "cloud" },
        { time: "2020-04-09T04:00:00+02:00", temperature: 8.6, type: "cloud" },
        { time: "2020-04-09T05:00:00+02:00", temperature: 7.1, type: "cloud" },
        { time: "2020-04-09T06:00:00+02:00", temperature: 6.4, type: "cloud" },
        { time: "2020-04-09T07:00:00+02:00", temperature: 6, type: "sun" },
        { time: "2020-04-09T08:00:00+02:00", temperature: 6.4, type: "sun" },
        { time: "2020-04-09T09:00:00+02:00", temperature: 6.7, type: "sun" },
        { time: "2020-04-09T10:00:00+02:00", temperature: 7.5, type: "sun" },
        { time: "2020-04-09T11:00:00+02:00", temperature: 8.7, type: "sun" },
        { time: "2020-04-09T12:00:00+02:00", temperature: 9, type: "cloud" },
        { time: "2020-04-09T13:00:00+02:00", temperature: 9.6, type: "cloud" },
        { time: "2020-04-09T14:00:00+02:00", temperature: 10, type: "cloud" },
        { time: "2020-04-09T15:00:00+02:00", temperature: 10.4, type: "cloud" },
        { time: "2020-04-09T16:00:00+02:00", temperature: 10.5, type: "cloud" },
        { time: "2020-04-09T17:00:00+02:00", temperature: 10.5, type: "cloud" },
        { time: "2020-04-09T18:00:00+02:00", temperature: 9.6, type: "cloud" },
        { time: "2020-04-09T19:00:00+02:00", temperature: 9, type: "sun" },
        { time: "2020-04-09T20:00:00+02:00", temperature: 8, type: "sun" },
        { time: "2020-04-09T21:00:00+02:00", temperature: 6.7, type: "sun" },
        { time: "2020-04-09T22:00:00+02:00", temperature: 5.9, type: "sun" },
        { time: "2020-04-09T23:00:00+02:00", temperature: 5.2, type: "sun" },
      ],
    };
    const result = transformDataForHighcharts(data);
    const expected = {
      minTemperature: 5.2,
      maxTemperature: 10.5,
      endTime: 1586466000000,
      startTime: 1586383200000,
      temperatures: [
        9.6,
        9.4,
        9,
        8.5,
        8.6,
        7.1,
        6.4,
        6,
        6.4,
        6.7,
        7.5,
        8.7,
        9,
        9.6,
        10,
        10.4,
        10.5,
        10.5,
        9.6,
        9,
        8,
        6.7,
        5.9,
        5.2,
      ],
    };
    expect(result).toEqual(expected);
  });
});
