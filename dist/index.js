"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("./libs/mongoose"));
const config_1 = __importDefault(require("./config/config"));
const error_handler_1 = require("./middlewares/error.handler");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const host = config_1.default.host;
const port = config_1.default.port;
app.set('trust proxy', 1);
const secret = config_1.default.jwtSecret;
app.use((0, express_session_1.default)({
    secret: secret,
    resave: false,
    saveUninitialized: true,
}));
(0, mongoose_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.render("<body><h1>BeruChat is working: Go to [/api/v1/auth/login] and get logged</h1></body>", { title: 'EG-CHAT' });
});
require('./utils/auth');
(0, routes_1.default)(app);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(error_handler_1.logError);
app.use(error_handler_1.ormErrorHandler);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
app.listen(port, () => {
    console.log(`🌐[server]: Server is running at ${host}:${port}`);
});