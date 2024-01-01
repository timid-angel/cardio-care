const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Require the routes
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const receptionistRoutes = require('./routes/receptionistRoutes');


mongoose.connect('mongodb://localhost:27017/cardio-test');
// Middleware to parse request bodies as JSON
app.use(express.json());

// Mount the routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/admins', adminRoutes);
app.use('/receptionists', receptionistRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
