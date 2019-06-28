import express from 'express';

const app = express();

app.get('/api/hello', (req, res) => {
    res.send('hello world!!! siraegi done!');
});

app.listen(8000, () => {
    console.log('server is listening 8000');
});