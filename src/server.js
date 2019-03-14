import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

let app = express();
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());




app.use('/', router);

app.listen(3000, () => {
console.log('Example app listening on port 3000!');
})