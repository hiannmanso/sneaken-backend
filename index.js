import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("app no ar");
});
app.listen(process.env.PORT, () => {
	console.log('Backend aberto na porta 5000!');
});
