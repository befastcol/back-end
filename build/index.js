"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const deliveries_1 = __importDefault(require("./src/routes/deliveries"));
const users_1 = __importDefault(require("./src/routes/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const mongoUri = process.env.MONGO_URI || "";
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
app.use("/api/deliveries", deliveries_1.default);
app.use("/api/users", users_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
exports.io = io;
io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    socket.on("joinDeliveryRoom", (deliveryId) => {
        socket.join(deliveryId);
    });
    socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado");
    });
});
server.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));
