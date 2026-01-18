# Code Review Criteria + Findings

## Review criteria 
The criteria applied to API endpoints and auth middleware:

1. **Authorisation**: verify protected resources validate roles and ownership consistently.
2. **Input validation + data integrity**: ensure IDs and user input are validated, queries match schema fields.
3. **Error handling**: check for null dereferences, consistent status codes/messages, log errors.
4. **Route maintainability**: avoid duplicate routes and ensure each route has clear responsibility.

## Findings

1. **Duplicate user lookup**
   - `GET /user/:userID` is defined twice, which can lead to unexpected behavior and makes maintenance harder.
   - File: `endpoints/users.js` (two separate route handlers for the same path).
   - Recommended change: remove the duplicate block and consolidate logic into a single handler.

2. **Incorrect query field**
   - The user lookup uses `User.findOne({ user: userID })`, but the schema uses `_id` for identifiers.
   - File: `endpoints/users.js`.
   - Recommended change: replace with `User.findById(userID)` or `User.findOne({ _id: userID })`.

3. **Error variable mismatch**
   - In the login callback, the variable is `error` but the response references `err`, which is undefined and will throw.
   - File: `endpoints/users.js`.
   - Recommended change: return the actual `error` in the response or log it consistently.

4. **Missing null checks before authorisation checks**
   - Order update/delete flows access `orderFound.user` before confirming the order exists.
   - File: `endpoints/orders.js`.
   - Recommended change: check `orderFound` and return `404` before using properties.

5. **Missing null checks when deleting users**
   - The delete user flow uses `userFound.role` without checking if the user exists.
   - File: `endpoints/users.js`.
   - Recommended change: handle the not-found case with a `404` response before role checks.
