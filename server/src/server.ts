import express, { Application, Request, Response, Router } from "express";
import type { ErrorRequestHandler } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

class Server {
  private _app: Application;
  private _port: number;
  private _errorHandlers: Array<ErrorRequestHandler>;
  private _routes: Map<string, Router>;
  private _staticPath: string | null;

  constructor() {
    this._app = express();
    this._port = 5000;
    this._routes = new Map<string, Router>();
    this._errorHandlers = [];
    this._staticPath = null;
    this.configure();
  }

  private configure() {
    // secure the express app by setting various HTTP headers
    this._app.use(helmet());

    // using bodyParser to retrieve POST and GET data as object
    this._app.use(bodyParser.json());
    this._app.use(express.urlencoded({ extended: true }));

    // enabling CORS for all requests
    this._app.use(cors());

    // adding morgan to log HTTP requests
    this._app.use(morgan("combined"));
  }

  public addErrorHandler(errorHandler: ErrorRequestHandler) {
    this._errorHandlers.push(errorHandler);
  }

  public addRoute(path: string, route: Router) {
    this._routes.set(path, route);
  }

  public addRoutes(path: string, routes: Array<Router>) {
    for (let i = 0; i < routes.length; i++) {
      this._routes.set(path, routes[i]);
    }
  }

  public static(path: string) {
    this._staticPath = path;
  }

  public start(port: number) {
    this._port = port;

    const _this = this;

    // use the routes added
    this._routes.forEach((route: Router, path: string) => {
      _this._app.use(path, route);
    });

    if (this._staticPath!=null) {
      this._app.use(express.static(this._staticPath));
      this._app.get('*', (req, res) => {
        res.sendFile(path.resolve(this._staticPath||__dirname, 'index.html'));
      });
    }

    // use the error handlers added
    this._app.use(this._errorHandlers);

    // start the server
    this._app.listen(this._port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
}

export default new Server();
