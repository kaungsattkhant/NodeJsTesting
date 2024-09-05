const express=require('express');
const app = express();
const PORT = process.env.PORT || 6060;
const cors=require('cors');
app.use(express.json());
app.use(cors());
const accountRoutes=require('./routes/accounts');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const locationRoutes=require('./routes/locations');
const functionRoutes=require('./routes/functions');
const jobRoutes=require('./routes/jobs');

app.use('/api/login',authRoutes);
app.use('/api/accounts',accountRoutes);
app.use('/api/users',userRoutes);
app.use('/api/locations',locationRoutes);
app.use('/api/functions',functionRoutes);
app.use('/api/jobs',jobRoutes);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});