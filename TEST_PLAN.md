# Test Plan

### Scope and objectives
This plan targets the core functional and non-functional requirements covered by the existing and newly added tests:

- **R1: Authorization and token handling**
  - Ownership enforcement for order read/update/delete.
  - JWT validation and rejection of invalid or stale tokens.
- **R2: Registration security and validation**
  - Password hashing strength.
  - Input validation and duplicate detection.
- **R3: Performance thresholds**
  - Response time constraints for the health endpoint.

### Test technique coverage
- **Specification-based / functional testing** for R1–R3 through API-level tests.
- **Structural / white-box testing** via unit tests of the auth middleware branches.
- **Model-based testing** via a simple auth state transition test (unauthenticated → authenticated → deleted).
- **Combinatorial testing** via a small set of input combinations for registration.
- **Performance testing** via response time thresholds.

### Implementation references
- **R1: Authorization and token handling**
  - Ownership checks for read/update/delete: `__tests__/api/authz.ownership.test.js`
  - Token integrity and deleted-user token rejection: `__tests__/api/authz.tokens.test.js`
  - Auth state transitions: `__tests__/api/model.auth-state.test.js`
  - Auth middleware branch behavior: `__tests__/app/auth.unit.test.js`
- **R2: Registration security and validation**
  - Bcrypt cost factor verification: `__tests__/api/register.security.test.js`
  - Duplicate email and role validation: `__tests__/api/register.validation.test.js`
  - Combinatorial inputs: `__tests__/api/register.combinatorial.test.js`
- **R3: Performance thresholds**
  - 100ms and 500ms response time checks: `__tests__/app/perf.thresholds.test.js`

### Test inventory and traceability
The plan tracks each requirement and links it to specific tests:

| Requirement | Tests | Goal |
| --- | --- | --- |
| R1 | `authz.ownership.test.js`, `authz.tokens.test.js`, `model.auth-state.test.js`, `auth.unit.test.js` | Ensure access control, token validity, and auth flow states are enforced. |
| R2 | `register.security.test.js`, `register.validation.test.js`, `register.combinatorial.test.js` | Ensure secure password storage and robust input validation. |
| R3 | `perf.thresholds.test.js` | Ensure response time thresholds are met. |

### Test data and setup
- User accounts are created through the public API for realism.
- Admin credentials are used for privileged actions.
- Unique suffixes avoid collisions in shared environments.

### Execution strategy
- Run API/integration tests against a running service instance.
- Run unit tests in isolation with mocks for deterministic coverage of middleware branches.
- Collect coverage in CI or local runs to confirm instrumentation.

