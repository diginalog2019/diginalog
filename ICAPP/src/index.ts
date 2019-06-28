iimport express from 'express';

const app = express();

app.get('/api/hello', (req, res) => {
    res.send('hello world!!! conflict solve!');
});

app.listen(8000, () => {
    console.log('server is listening 8000');
});
