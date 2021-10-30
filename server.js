// External  modules
const express = require("express");

//Internal  modules
const routes = require("./routes");

// CORS
const cors = require("cors");

// Session
const session = require("express-session");

// PORT
const PORT = process.env.PORT || 3003;

// Express Instance
const app = express();

const MongoDBStore = require('connect-mongodb-session')

// DB connection
require("./config/db.connection");

// Middlewares
const whitelist = ["http://localhost:3000", "https://taskappfrontend.herokuapp.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.set("trust proxy", 1)

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.MONGODBURI,
      collection: "mySessions"
    }),
    cookie: {
      sameSite: "none",
      secure: true
    }
  })
);

const isAuthenticated = (req, res, next) => {
  console.log(req.session);

  if (req.session.currentUser) {
    return next();
  } else {
    res.status(403).json({ msg: "Signin required" });
  }
};

app.use(express.json());

// Routes
app.get("/", function (req, res) {});

app.use("/tasks", isAuthenticated, routes.tasks);
app.use("/users", routes.users);

// Server Bind
app.listen(PORT, () => {
  console.log(`Connected on Port:${PORT}`);
});
