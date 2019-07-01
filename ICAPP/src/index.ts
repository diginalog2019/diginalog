import express from 'express';
import router from "./router";
import bodyParser from 'body-parser';

const app = express();

app.get('/api/hello', (req, res) => {
    res.send('hello world!!! conflict solve!');
});

app.use(bodyParser());

app.use('/api', router);

app.listen(8000, () => {
    console.log('server is listening 8000');
});
