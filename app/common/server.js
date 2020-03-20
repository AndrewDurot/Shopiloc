import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import errorHandler from '../errorhandler/error.handler';

const logger = require('morgan');
const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.set('appPath', `${root}client`);
    app.use(logger('dev'));
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(path.join(__dirname, 'public')));
    app.use(Express.static(`${root}/public`));
    app.use(Express.static('uploads'));
    // app.use(function(req, res, next) {
    //   next(createError(404));
    // });
  }

  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      console.log(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
