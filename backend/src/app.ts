import express, {Application, Request, Response} from 'express';

const app: Application = express();
const port: number = 4000;


app.get('/', (req: Request, res: Response) => {
    res.send ('Hello world');
})

app.listen(port, () => {
    console.log(`Connected Successfully on port ${port}`)
})

