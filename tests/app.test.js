const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");

beforeEach(async () => {
  // Reset test DB if needed
});

afterAll(() => {
  db.end();
});

describe.only("Weather API Endpoints", () => {
  test("404 for invalid endpoint", async () => {
    const response = await request(app).get("/api/banana");
    expect(response.status).toBe(404);
    expect(response.body.msg || response.body.error).toMatch(/not found/i);
  });

  describe("GET /api/weather/:city", () => {
    test("200 for valid city", async () => {
      const res = await request(app).get("/api/weather/London").expect(200);
      expect(res.body.city).toBe("London");
    });

    test("404 for unknown city", async () => {
      const res = await request(app).get("/api/weather/UnknownCity");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/weather/city?city=London", () => {
    test("200 with correct structure", async () => {
      const res = await request(app)
        .get("/api/weather/city?city=London")
        .expect(200);
      expect(res.body.city).toBe("London");
    });

    test("400 if city is missing", async () => {
      const res = await request(app).get("/api/weather/city");
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/weather/daily", () => {
    test("200 with valid lat/lon", async () => {
      const res = await request(app)
        .get("/api/weather/daily?lat=53.48&lon=-2.24&cnt=7")
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("400 if lat/lon is missing", async () => {
      const res = await request(app).get("/api/weather/daily");
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/weather/uv", () => {
    test("200 with valid lat/lon", async () => {
      const res = await request(app)
        .get("/api/weather/uv?lat=53.48&lon=-2.24")
        .expect(200);
      expect(res.body).toHaveProperty("uvi");
    });

    test("400 if lat/lon is missing", async () => {
      const res = await request(app).get("/api/weather/uv");
      expect(res.status).toBe(400);
    });
  });
});

describe("User Location Endpoints", () => {
  test("GET /api/user/locations returns array", async () => {
    const res = await request(app).get("/api/user/locations").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/user/locations saves location", async () => {
    const res = await request(app)
      .post("/api/user/locations")
      .send({ name: "London" })
      .expect(201);
    expect(res.body.name).toBe("London");
  });

  test("POST /api/user/locations with missing body returns 400", async () => {
    const res = await request(app)
      .post("/api/user/locations")
      .send({})
      .expect(400);
  });

  test("DELETE /api/user/locations/:id works", async () => {
    const post = await request(app)
      .post("/api/user/locations")
      .send({ name: "DeleteCity" });
    const id = post.body.id;
    const del = await request(app)
      .delete(`/api/user/locations/${id}`)
      .expect(204);
  });

  test("PUT /api/user/locations/:id updates location", async () => {
    const post = await request(app)
      .post("/api/user/locations")
      .send({ name: "OldCity" });
    const id = post.body.id;
    const put = await request(app)
      .put(`/api/user/locations/${id}`)
      .send({ name: "NewCity" })
      .expect(200);
    expect(put.body.name).toBe("NewCity");
  });
});

describe("User Preferences Endpoints", () => {
  test("GET /api/user/preferences returns object", async () => {
    const res = await request(app).get("/api/user/preferences").expect(200);
    expect(typeof res.body).toBe("object");
  });

  test("POST /api/user/preferences saves preferences", async () => {
    const res = await request(app)
      .post("/api/user/preferences")
      .send({ units: "metric" })
      .expect(201);
    expect(res.body.units).toBe("metric");
  });

  test("PUT /api/user/preferences updates preferences", async () => {
    const res = await request(app)
      .put("/api/user/preferences")
      .send({ units: "imperial" })
      .expect(200);
    expect(res.body.units).toBe("imperial");
  });
});

describe("User Search History Endpoints", () => {
  test("GET /api/user/search-history returns array", async () => {
    const res = await request(app).get("/api/user/search-history").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/user/search logs new search", async () => {
    const res = await request(app)
      .post("/api/user/search")
      .send({ city: "Manchester" })
      .expect(201);
    expect(res.body.city).toBe("Manchester");
  });

  test("DELETE /api/user/search-history clears history", async () => {
    await request(app).delete("/api/user/search-history").expect(204);
  });
});

describe("User Feedback Endpoint", () => {
  test("POST /api/user/feedback submits feedback", async () => {
    const res = await request(app)
      .post("/api/user/feedback")
      .send({ message: "Great app!" })
      .expect(201);
    expect(res.body.message).toBe("Great app!");
  });

  test("POST /api/user/feedback missing message returns 400", async () => {
    const res = await request(app)
      .post("/api/user/feedback")
      .send({})
      .expect(400);
  });
});
