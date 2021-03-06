import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as path from 'path';


// custom modules
import IndexRoute from './router/index';


// Server class
class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  // application config
  public config() {
    const MONGO_URI: string = 'mongodb://localhost/test';
    
    // mongoose.connect(MONGO_URI);
    // mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

    var MongoDB = mongoose.connect(MONGO_URI).connection;
    MongoDB.on('error', function(err) { console.log("mongodb error::"+err.message); });
    MongoDB.once('open', function() {
        console.log("mongodb connection open");
    });

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    
  }

  // application routes
  public routes(): void {

    let router: express.Router;
    router = express.Router();
    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }
}

// export
export default new Server().app;