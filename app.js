// // const express = require('express');
// // const cors = require("cors");
// // const dotenv = require("dotenv");
// // const mongoose = require('mongoose');
// // const cookieParser = require("cookie-parser");

// // const app = express();
// // const port = 3177;

// // dotenv.config();

// // app.use(cookieParser());
// // app.use(express.json());
// // app.use(
// // 	cors({
// // 		origin: [
// // 			"http://localhost:3000",
// // 		],
// // 		credentials: true,
// // 	})
// // );


// // mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, 
// // 	serverSelectionTimeoutMS: 30000, 
// // socketTimeoutMS: 45000, 
// // keepAlive: true,
// // keepAliveInitialDelay: 300000,  }, (e) => {
// // 	console.log(e ? e : "Connected successfully to database");
// // });

// // app.use("/auth", require("./routers/authRouter"));
// // app.use("/user", require("./routers/userRouter"));
// // app.use("/bank", require("./routers/bankRouter"));
// // app.use("/camps", require("./routers/campRouter"));

// // app.listen(port, () =>
// // 	console.log(`Server running at http://localhost:${port}`)
// // );
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');

// const app = express();
// const port = 3177;

// dotenv.config();

// app.use(cookieParser());

  
// app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000',  // Your frontend origin
//     credentials: true,  // Enable credentials (cookies, authentication)
//   }));

// const dbURI = process.env.MONGO_URL ;
// const mongooseOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 30000,
//     socketTimeoutMS: 45000,
   
// };

// async function connectDB() {
//     try {
//         await mongoose.connect(dbURI, mongooseOptions);
//         console.log('Connected successfully to database');
//     } catch (e) {
//         console.error('Error connecting to database:', e);
//         process.exit(1); // Exit the process with an error code
//     }
// }

// connectDB();

// app.use('/auth', require('./routers/authRouter'));
// app.use('/user', require('./routers/userRouter'));
// app.use('/bank', require('./routers/bankRouter'));
// app.use('/camps', require('./routers/campRouter'));

// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3177;

dotenv.config();

app.use(cookieParser());
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'https://hemo-frontend.vercel.app',  // Frontend origin
    credentials: true,  // Allow credentials (cookies, authentication)
}));

// Handle preflight (OPTIONS) requests
app.options('*', cors({
    origin: 'https://hemo-frontend.vercel.app',  // Frontend origin
    credentials: true,
}));

// MongoDB connection
const dbURI = process.env.MONGO_URL;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
};

async function connectDB() {
    try {
        await mongoose.connect(dbURI, mongooseOptions);
        console.log('Connected successfully to database');
    } catch (e) {
        console.error('Error connecting to database:', e);
        process.exit(1);  // Exit the process with an error code
    }
}

connectDB();

// Routers
app.get('/',(req,res)=>{
  res.send("Hello World");
})
app.use('/auth', require('./routers/authRouter'));
app.use('/user', require('./routers/userRouter'));
app.use('/bank', require('./routers/bankRouter'));
app.use('/camps', require('./routers/campRouter'));

// Start the server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

