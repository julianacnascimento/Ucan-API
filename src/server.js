import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import cors from 'cors'

let app = express();
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(cors())

app.use('/', router);

app.listen(3000, () => {
console.log('App listening on port 3000!');
})