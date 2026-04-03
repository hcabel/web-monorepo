import supertest from "supertest";
import { jest } from "@jest/globals";

import { create_app } from "../../src/app/app";

import { IDatabase, Nested } from "@hcabel/rest-api-utils";
import { IStatModelArrayToIStats } from "../../src/app/routes/utils/stats.utils";

// TODO: replace any by mock interface
const mockDatabase: IDatabase<Nested<any>> = {
connect: jest.fn(async () => true),
queries: {
Project: {
create: jest.fn(() => generate_random_project()),
delete_one: jest.fn(() => true),
read: jest.fn(() => []),
read_single: jest.fn(() => generate_random_project()),
update_one: jest.fn(() => generate_random_project()),
},
Stat: {
create: jest.fn(() => generate_random_stat()),
delete_one: jest.fn(() => true),
read: jest.fn(() => []),
read_single: jest.fn(() => generate_random_stat()),
update_one: jest.fn(() => generate_random_stat()),
},
},
};

const app = create_app(mockDatabase);

describe("Projects", () => {
describe("GET /projects/:name/stats", () => {
beforeEach(() => {
// Setup mocks for working test
mockDatabase.queries.Project.read_single
.mockReset()
.mockResolvedValueOnce(generate_random_project());
mockDatabase.queries.Stat.read
.mockReset()
.mockResolvedValueOnce([]);
});

test("Should return a json content with a 200 status code", async () => {
const response = await supertest(app).get("/projects/HugoMeet/stats");

expect(response.status).toBe(200);
expect(response.type).toBe("application/json");
});

test("Should call read_single project query and read stat query once", async () => {
await supertest(app).get("/projects/HugoMeet/stats");

expect(
mockDatabase.queries.Project.read_single
).toHaveBeenCalledTimes(1);
expect(
mockDatabase.queries.Project.read_single.mock.calls[0][0]
).toBeInstanceOf(Object);
expect(
mockDatabase.queries.Project.read_single.mock.calls[0][0]
).not.toEqual({});
expect(mockDatabase.queries.Stat.read).toHaveBeenCalledTimes(1);
expect(
mockDatabase.queries.Stat.read.mock.calls[0][0]
).toBeInstanceOf(Object);
expect(mockDatabase.queries.Stat.read.mock.calls[0][0]).not.toEqual(
{}
);
});

test("Should return the project stats formatted in a usable way", async () => {
// Setup mocks
const project = generate_random_project();
mockDatabase.queries.Project.read_single
.mockReset()
.mockResolvedValueOnce(project);
const stats = generate_random_stat_array(3, project._id);
mockDatabase.queries.Stat.read
.mockReset()
.mockResolvedValueOnce(stats);

const result = IStatModelArrayToIStats(stats);

const response = await supertest(app).get(
`/projects/${encodeURIComponent(project.name)}/stats`
);

expect(response.body).toEqual(result);
});

test("Should return 404 if the project does not exist", async () => {
// Setup mock
mockDatabase.queries.Project.read_single
.mockReset()
.mockResolvedValueOnce(undefined);

const response = await supertest(app).get("/projects/UnknownProject/stats");

expect(response.status).toBe(404);
expect(response.body.error).toBeDefined();
expect(
mockDatabase.queries.Project.read_single
).toHaveBeenCalledTimes(1);
});

test("Should return 500 if any of the queries fail", async () => {
// Setup mocks return values for each test
const project = generate_random_project();
const mockReturnValues = [
[project, null],
[null, []],
];

for (const [projectResult, statsResult] of mockReturnValues) {
// Setup mocks
mockDatabase.queries.Project.read_single
.mockReset()
.mockResolvedValueOnce(projectResult);
mockDatabase.queries.Stat.read
.mockReset()
.mockResolvedValueOnce(statsResult);

const response = await supertest(app).get(
"/projects/HugoMeet/stats"
);

expect(response.status).toBe(500);
expect(response.body.error).toBeDefined();
}
});
});
});
