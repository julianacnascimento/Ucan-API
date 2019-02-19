import express from 'express';
let router = express.Router();
router.route('/books') .get((req, res) => {
res.send('list of all books'); });
router.route('/books/:book_id') .get((req, res) => {
res.send('book ' + req.params.book_id); });
export default router;