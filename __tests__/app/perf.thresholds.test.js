const axios = require("axios");
const { prepare } = require("../setup/test-helper");

describe("Performance thresholds for GET /", () => {
  it("R3-T01: should respond in <= 100ms", async () => {
    // Why this test exists:
    // R3 requires explicit evidence that the health endpoint responds within 100ms.
    // Measuring elapsed time provides stronger evidence than Jest timeouts alone, and time can then be compared.
    const startTimeMs = Date.now();
    const response = await axios.get(prepare("/"));
    const durationMs = Date.now() - startTimeMs;

    expect(response.status).toEqual(200);
    expect(durationMs).toBeLessThanOrEqual(100);
  });

  it("R3-T02: should respond in <= 500ms (upper bound)", async () => {
    // Why this test exists:
    // R3, test 500ms upper bound 
    const startTimeMs = Date.now();
    const response = await axios.get(prepare("/"));
    const durationMs = Date.now() - startTimeMs;

    expect(response.status).toEqual(200);
    expect(durationMs).toBeLessThanOrEqual(500);
  });
});
