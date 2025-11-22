import Express, { type Request, type Response } from "express";
import morgan from "morgan";
import routerUser from "./modules/users/routes/user.route.js";
import heroRoute from "./modules/hero/hero.route.js";
import loginRoute from "./modules/login/login.route.js";
import aboutRoute from "./modules/about/index/about.route.js";
import pendidikanRoute from "./modules/about/pendidikan/pendidikan.route.js";
import expRoute from "./modules/work/experience/exp.route.js";
import jobdeskRoute from "./modules/work/jobdesk/jobdesk.route.js";
import skillRoute from "./modules/skillset/skillset.route.js";
import cors from "cors";
import helmet from "helmet";
import projectRoute from "./modules/project/project.route.js";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser"
import hpp from "hpp"
import { xss } from "express-xss-sanitizer"
import pageIndexRoute from "./modules/pageIndex/pageIndex.route.js";


const app = Express();

// setup limiter
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  limit: 100,
  message: "too much request you DUMB ASS",
  standardHeaders: true,
  legacyHeaders: false
})

// Middleware Register
app.use(limiter)


// logging
app.use(morgan("combined"));

// Secure
app.use(hpp())
app.use(xss())
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173/', 'http://localhost:5173/*'],
  credentials: true
}))

// parsing
app.use(Express.json({limit: "50kb"}));
app.use(cookieParser())

// cpmpress semua response
app.use(compression())

// Route register
app.use("/login", loginRoute);
app.use("/user", routerUser);
app.use("/hero", heroRoute);
app.use("/about", aboutRoute);
app.use("/pendidikan", pendidikanRoute);
app.use("/work", expRoute);
app.use("/jobdesk", jobdeskRoute);
app.use("/skill", skillRoute);
app.use("/project", projectRoute);
app.use("/page", pageIndexRoute)

// index API
app.get("/", (_: Request, res: Response) => {
  res.json({ pesan: "Hallo dunia penuh derita" });
});

export default app;
