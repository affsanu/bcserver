const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');
const port = process.env.PORT || 8003

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    app.listen(port, () => {
        console.log(`Server Running On Port http://localhost:${port}`);
    })
).catch((err) => console.log(err.message));

app.use('/api/v1/user', userRouter);