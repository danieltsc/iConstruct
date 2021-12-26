"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const company_1 = require("./src/controllers/company");
const app = (0, express_1.default)();
const { PORT = 5000 } = process.env;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.json({ message: 'Alive and well, thanks for asking ! :)' });
});
app.get('/companies', company_1.GetCompanies);
app.post('/filter-companies', company_1.FilterCompanies);
app.use((err, req, res) => {
    console.log('ERROR: ', err);
    return res.status(500).json({ success: false, error: `Something went wrong. Please try again later.` });
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
