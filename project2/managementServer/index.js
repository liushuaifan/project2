require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const employeeRoutes = require('./routes/employee');
const hrRoutes = require('./routes/hr');
const db = require('./models'); 

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());



app.use('/api/employee',
  employeeRoutes
);

app.get('/api/employee', async function (req, res, next) {
  try {
    const employees = await db.Employee.find();
    return res.status(200).json(employees);
  } catch (err) {
    return next(err);
  }
});

app.use('/api/hr',
  hrRoutes
);

app.get('/api/hr', async function (req, res, next) {
  try {
    const products = await db.hr.find();
    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
});



app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
