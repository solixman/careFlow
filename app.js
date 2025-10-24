const express= require('express');
let app = express();

require('./config/DB');

const session=require('express-session');
const sessionConfig=require('./config/session');
const flash=require("connect-flash");
const cookieParser = require('cookie-parser');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
app.use(session(sessionConfig));
app.use(express.json())
app.use(flash());


app.use(cookieParser());


const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const appointmentRoutes=require('./routes/appointmentRoutes');
const consultationRoutes=require('./routes/consultationRoutes');

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/appoitment',appointmentRoutes);
app.use('/consultation',consultationRoutes);





app.listen(3333);