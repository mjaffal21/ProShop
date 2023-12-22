const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const port = process.env.PORT;
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const productsRoute = require('./routes/productRoute');
const usersRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/orderRoute');
const uploadsRoute = require('./routes/uploadRoute');

app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/upload', uploadsRoute);

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dir = path.resolve();
app.use('/uploads', express.static(path.join(__dir, '/uploads')));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
