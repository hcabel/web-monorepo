import supertest from "supertest";
import { jest } from "@jest/globals";

import { create_app } from "../../src/app/app";
import * as reader from "../../src/data/reader";

jest.mock("../../src/data/reader");

const mockedGetStats = reader.getStatsForProject as jest.MockedFunction<typeof reader.getStatsForProject>;

const app = create_app();

describe("Stats", () => {
describe("GET /stats/:projectName", () => {
beforeEach(() => {
mockedGetStats.mockReset();
mockedGetStats.mockReturnValue({});
});

test("Should return a json object with a 200 status code", async () => {
const response = await supertest(app).get("/stats/HugoMeet");
expect(response.status).toBe(200);
expect(response.type).toBe("application/json");
});

test("Should call getStatsForProject with the project name", async () => {
await supertest(app).get("/stats/HugoMeet");
expect(mockedGetStats).toHaveBeenCalledWith("HugoMeet");
});

test("Should return the stats from getStatsForProject", async () => {
const mockStats = {
github: [{ _id: "abc", name: { en: "Stars", fr: "Étoiles" }, value: 42, url: "https://github.com" }]
};
mockedGetStats.mockReturnValue(mockStats);

const response = await supertest(app).get("/stats/HugoMeet");

expect(response.status).toBe(200);
expect(response.body).toEqual(mockStats);
});

test("Should return empty stats when project has no entries in stats.json", async () => {
mockedGetStats.mockReturnValue({});

const response = await supertest(app).get("/stats/UnknownProject");
expect(response.status).toBe(200);
expect(response.body).toEqual({});
});

test("Should URL-decode the project name", async () => {
await supertest(app).get("/stats/Unreal%20VsCode%20Helper");
expect(mockedGetStats).toHaveBeenCalledWith("Unreal VsCode Helper");
});
});
});
