const express=require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors=require('cors');
app.use(express.json());
app.use(cors());
const accountRoutes=require('./routes/accounts');
const authRoutes=require('./routes/auth');

app.get('/api/home',(req,res)=>{
    res.json({message:"It's home page",people:["Messi","Ronaldo","Mbappe"]});
});

app.use('/api/accounts',accountRoutes);
app.use('/api/login',authRoutes);


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});