require('./config');

import express from 'express';
import appMiddleware from './api/middleware';
import homeRouter from './api/routes/homeRouter';
import usersRouter from './api/routes/usersRouter';
import teamsRouter from './api/routes/teamsRouter';

const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(...appMiddleware);
app.use(homeRouter, usersRouter, teamsRouter);

app.listen(PORT, () => console.log(`app is listening on port: ${PORT}...`));
