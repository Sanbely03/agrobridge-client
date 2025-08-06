"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// THIS MUST BE THE ABSOLUTE FIRST LINE TO ENSURE ENV VARS ARE LOADED BEFORE ANYTHING ELSE
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const loanRequest_routes_1 = __importDefault(require("./routes/loanRequest.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic route for testing server status
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Agrobridge API is running!' });
});
// Use routes
app.use('/api/users', user_routes_1.default);
app.use('/api/loan-requests', loanRequest_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
