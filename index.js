import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import session from "express-session";
import methodOverride from "method-override";

import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout,
} from "./controllers/auth.js";
import {
  getCreateRoom,
  postCreateRoom,
  getHome,
  getRoom,
  deleteRoom,
} from "./controllers/rooms.js";
import {
  getCreateReservation,
  getReservations,
  postCreateReservation,
  deleteReservation,
} from "./controllers/reservations.js";
import { PORT, __filename, __dirname, SECRET, MAX_AGE } from "./constants.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride("_method"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: MAX_AGE,
    },
  })
);

// ROUTES

app.get("/register", getRegister);
app.post("/register", postRegister);

app.get("/login", getLogin);
app.post("/login", postLogin);
app.post("/logout", logout);

app.get("/rooms/new", getCreateRoom);
app.post("/rooms/new", postCreateRoom);
app.get("/rooms/:id", getRoom);
app.delete("/rooms/:id", deleteRoom);

app.get("/rooms/:id/createReservation", getCreateReservation);
app.post("/rooms/:id/createReservation", postCreateReservation);
app.get("/reservations", getReservations);
app.delete("/reservations/:id", deleteReservation);
app.get("/", getHome);

// ROUTES

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
