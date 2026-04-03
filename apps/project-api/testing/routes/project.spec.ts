import supertest from "supertest";
import { jest } from "@jest/globals";

import { create_app } from "../../src/app/app";
import * as reader from "../../src/data/reader";

jest.mock("../../src/data/reader");

const mockedGetStats = reader.getStatsForProject as jest.MockedFunction<typeof reader.getStatsForProject>;

const app = create_app();

const KNOWN_PROJECT_IDS = [
"6338ffeb5e00275fb5051c9e",
"633900a7471d8a488d9ab4a3",
"6339018aa4c9d89b6ed06751",
];

describe("Projects", () => {
describe("GET /projects", () => {
test("Should return a json array with a 200 status code", async () => {
const response = await supertest(app).get("/projects");
expect(response.status).toBe(200);
expect(response.type).toBe("application/json");
expect(response.body).toBeInstanceOf(Array);
});

test("Should return all 3 hardcoded projects", async () => {
const response = await supertest(app).get("/projects");
expect(response.body).toHaveLength(3);
});

test("Should filter projects by query params", async () => {
const response = await supertest(app).get("/projects?name=HugoMeet");
expect(response.body).toHaveLength(1);
expect(response.body[0].name).toBe("HugoMeet");
});

test("Should return empty array if no project matches filter", async () => {
const response = await supertest(app).get("/projects?name=NonExistent");
expect(response.body).toHaveLength(0);
});
});

describe("GET /projects/:id", () => {
beforeEach(() => {
mockedGetStats.mockReset();
mockedGetStats.mockReturnValue({});
});

test("Should return a json content with a 200 status code for a known project", async () => {
const response = await supertest(app).get(`/projects/${KNOWN_PROJECT_IDS[0]}`);
expect(response.status).toBe(200);
expect(response.type).toBe("application/json");
});

test("Should return the project with its stats", async () => {
const mockStats = {
github: [{ _id: "abc", name: { en: "Stars", fr: "Étoiles" }, value: 42, url: "https://github.com" }]
};
mockedGetStats.mockReturnValue(mockStats);

const response = await supertest(app).get(`/projects/${KNOWN_PROJECT_IDS[0]}`);

expect(response.status).toBe(200);
expect(response.body._id).toBe(KNOWN_PROJECT_IDS[0]);
expect(response.body.name).toBe("HugoMeet");
expect(response.body.stats).toEqual(mockStats);
});

test("Should return 404 for an unknown project id", async () => {
const response = await supertest(app).get("/projects/unknown-id");
expect(response.status).toBe(404);
expect(response.body.error).toBeDefined();
});

test("Should return empty stats when stats.json has no entry for the project", async () => {
mockedGetStats.mockReturnValue({});

const response = await supertest(app).get(`/projects/${KNOWN_PROJECT_IDS[0]}`);
expect(response.status).toBe(200);
expect(response.body.stats).toEqual({});
});
});
});
