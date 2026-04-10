# Bugs Found and Fixed (Version 2 Update)

During the audit and testing of the application's core connections and backend structure, the following bugs and vulnerabilities were identified and resolved:

### 1. Disconnected Frontend & Backend Architecture
**Bug**: The frontend Vite client and the Express backend server were unable to sync and exchange API data.
**Fix**: Synchronized and supplied missing `.env` environments spanning both the frontend and backend. Specifically, provided references to `VITE_API_BASE_URL` and database URIs allowing the proxy to pipe traffic accurately to `localhost:8080`.

### 2. Missing Load Handling & DDoS Susceptibility
**Bug**: The API permitted unbounded, continuous network pinging from individual IPs. Without a hard stop, automated scripts or traffic spikes could crash Node.js or max out MongoDB connections.
**Fix**: Implemented `express-rate-limit` inside `app.js` globally configured to throttle API hits (Max 150 requests every 15 minutes per IP address). Also enforced a firm `10kb` body payload size limit (`express.json({ limit: "10kb" })`) to reject bloated requests.

### 3. Missing Foundational Security Headers
**Bug**: The application lacked standard HTTP header defenses leaving edge-case risks for Clickjacking and Cross-Site-Scripting (XSS).
**Fix**: Installed and wrapped the backend in `helmet`, instantly protecting the responses with industry-standard hardened headers.

### 4. Vulnerable to NoSQL Database Injection
**Bug**: Open-ended API routes allowed raw user input to reach MongoDB parsers, carrying the risk of NoSQL condition injections (e.g., passing `$gt: ""` to bypass auth).
**Fix**: Installed and configured `express-mongo-sanitize`. This middleware actively parses requests and permanently removes any malicious keys containing `$`.

> **Note on Potential Future Load Handling (Pagination):**
> Functions like `getCourses` inside `courseController.js` currently fetch the entire course database without a pagination limit. While acceptable for early scaling, fetching massive datasets later down the pipeline will throttle memory. (A fix here was deferred as it would require ripping out and moving the frontend's client-side category and searching filtering to the backend).
