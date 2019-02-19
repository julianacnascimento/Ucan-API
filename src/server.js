import express from 'express';

let app = express();
let router = express.Router();

router.route('/books')
.get((req, res) => {
res.send('list of all books');
});

app.use('/', router);
app.listen(3000, () => {
console.log('Example app listening on port 3000!');
})