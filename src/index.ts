require('./config');

import express from 'express';
import appMiddleware from './api/middleware';
import routes from './api/routes';

const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(...appMiddleware);
app.use(...routes);

app.listen(PORT, () => console.log(`app is listening on port: ${PORT}...`));
