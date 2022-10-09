import express from 'express';
import cookieParser from 'cookie-parser';
// import path from 'path'
// import { fileURLToPath } from 'url';
import router from './routers/testRoutes';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', 'viewss');



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use('/rest/v1', router);
// console.log(__dirname);

// app.use(express.static(path.join(__dirname, 'viewss')));

// app.use('/',(req,res)=>{return res.ok('Google Calender Integration')});

export default app;
