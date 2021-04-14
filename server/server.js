const express = require('express');
const apiRouter = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use('/api', apiRouter);

app.listen(process.env.PORT || '3000', () => {
	console.log(`Server is running on port : ${process.env.PORT || 3000}`);
});
