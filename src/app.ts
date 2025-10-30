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

const app = Express();

// Middleware Register
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(Express.json());

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

// index API
app.get("/", (_: Request, res: Response) => {
  res.json({ pesan: "Hallo dunia penuh derita" });
});

export default app;
