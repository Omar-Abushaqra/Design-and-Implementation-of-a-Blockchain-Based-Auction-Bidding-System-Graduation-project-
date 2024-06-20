// const express = require("express");
// const mongoose = require("mongoose");
// const ImageDetails = require("./imageDetails");
// const DataModel = require("./DataModel");
// const connectDB = require("./Database");
// const bcrypt = require('bcrypt')
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');


// connectDB();

// const app = express();
// app.use(express.json({ extended: false }));

// // We need cors middleware here because frontend and backend run on different ports.
// const cors = require("cors");
// /* 
// app.use(cors({
//    origin: ["http://localhost:3000/login"],
//   methods: ["POST","GET"],
//   credentials: true 
// })); */
// app.use(cors({
//   origin: "http://localhost:3000",  // Allow requests from this origin
//   methods: ["POST", "GET"],         // Allow these methods
//   credentials: true                 // Allow credentials
// }));


// app.use(cookieParser());
// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie:{
//     secure: false,
//     maxAge: 1000* 60*60
//   }
// }))




// app.post("/writetodatabase", async (req, res) => {
//   try {
//     const {  username,password,location } = req.body;

//     // Server-side email validation
//     // if (!email.includes("@")) {
//     //   return res.status(400).json({ message: "Please enter a valid email address." });
//     // }

//     // Check if the email already exists in the database
//     const existingUser = await DataModel.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "username address is already in use." });
//     }
//     /////////
//     const existingUserName = await DataModel.findOne({ username });
//     if (existingUserName) {
//       return res.status(400).json({ message: "username is already in use." });
//     }
//     const validUsername = /.{3,}/.test(username);
// if (!validUsername) {
//   return res.status(400).json({ message: "Username must have at least 3 characters." });
// }
//     /////////
//     // Custom password validation
//     const isStrongPassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{4,})/.test(password);
//     if (!isStrongPassword) {
//       return res.status(400).json({ message: "Password must have at least 4 characters, one capital letter, and one symbol." });
//     }

//     // If email and password pass validation, proceed to save data
//     const newData = new DataModel({ username, password, location }); // Include username in the document
//     await newData.save();
//     res.json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.log("Server error while saving data", error.message);
//     // Send detailed error message to the client
//     res.status(500).json({ message: "Server error while saving data", error: error.message });
//   }
// });

// app.get('/username', (req, res) => {
//   if (req.session.username) {
//       return res.json({ valid: true, username: req.session.username });
//   } else {
//       return res.json({ valid: false });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find the user by email
//     const existingUser = await DataModel.findOne({ username });

//     if (existingUser) {
//       // If the user exists, compare the provided password with the hashed password in the database
//       const passwordMatch = await bcrypt.compare(password, existingUser.password);

//       if (passwordMatch) {

//         req.session.username = existingUser.username;//
//        //res.json({message:existingUser.username});

//         // If the password matches, respond with a success message
//         res.json({ message: "Login successful"});
//       } else {
//         // If the password does not match, respond with an error message
//         res.json({ message: "Invalid Password" });

//         //console.error("Invalid password for email:", email);
//       }
//     } 
//     else{
//       res.json({ message: "Invalid Username" });

//     }
//   } catch (error) {
//     // Handle server errors
//     console.log("Server error while handling login", error.message);
//     res.status(500).json({ message: "Server error while handling login" });
//   }
// });

// app.post("/auctionpost", async (req, res) => {
//   const { image, category, duration, sellerWallet } = req.body;
//   const currentTime = new Date();
//   const endTime = new Date(currentTime.getTime() + parseInt(duration, 10) * 60000);
//   const winner = "";

//   try {
//     await ImageDetails.create({ image, category, duration, endTime, sellerWallet,winner });
//     res.send({ status: "ok" });
//   } catch (error) {
//     console.error("Error while saving image details:", error);
//     res.status(500).json({ status: "Error saving image data. Please try again later." });
//   }
// });
// app.put("/winnerput/:itemId", async (req, res) => {
//   try {
//     const { winner } = req.body;
//     const itemId = req.params.itemId;

//     // Assuming ImageDetails is your Mongoose model
//     const updatedItem = await ImageDetails.findByIdAndUpdate(itemId, { winner }, { new: true });

//     if (!updatedItem) {
//       return res.status(404).json({ status: "Item not found" });
//     }

//     res.json({ status: "ok", updatedItem });
//   } catch (error) {
//     console.error("Error while updating image details:", error);
//     res.status(500).json({ status: "Error updating image data. Please try again later." });
//   }
// });




// app.get("/get-image", async (req, res) => {
  
//   try {
//     const allImages = await ImageDetails.find();
    
//     res.json(allImages);
//   } catch (error) {
//     console.error("Error while retrieving images:", error);
//     res.status(500).json({ status: "Error retrieving images. Please try again later." });
//   }
// });



// app.use(bodyParser.json());

// // Endpoint to store delivered-to person's location
// app.post('/items', async (req, res) => {
//   try {
//     const { latitude, longitude } = req.body;
//     const newLocation = new Location({ latitude, longitude });
//     await newLocation.save();
//     res.status(201).json({ message: 'Location saved successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
// });



// app.get('/photo/:id', async (req, res) => {
//   try {
//     const photo = await ImageDetails.findById(req.params.id);
//     if (!photo) {
//       return res.status(404).send('Photo not found');
//     }
//     const imageUrl = `/images/${photo.image}`;
//     res.send(`<img src="${imageUrl}" alt="Uploaded Image"/>`);
//   } catch (error) {
//     res.status(500).send('Error retrieving the photo');
//   }
// });

















const express = require("express");
const mongoose = require("mongoose");
const ImageDetails = require("./imageDetails");
const Imagebidders = require("./src/components/Imagebidders");
const DataModel = require("./DataModel");
const connectDB = require("./Database");
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


connectDB();

const app = express();
app.use(express.json({ extended: false }));

// We need cors middleware here because frontend and backend run on different ports.
const cors = require("cors");
/* 
app.use(cors({
   origin: ["http://localhost:3000/login"],
  methods: ["POST","GET"],
  credentials: true 
})); */
app.use(cors({
  origin: "http://localhost:3000",  // Allow requests from this origin
  methods: ["POST", "GET"],         // Allow these methods
  credentials: true                 // Allow credentials
}));


app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    maxAge: 1000* 60*60
  }
}))




app.post("/writetodatabase", async (req, res) => {
  try {
    const {  username,password,location } = req.body;

    // Server-side email validation
    // if (!email.includes("@")) {
    //   return res.status(400).json({ message: "Please enter a valid email address." });
    // }

    // Check if the email already exists in the database
    const existingUser = await DataModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "username address is already in use." });
    }
    /////////
    const existingUserName = await DataModel.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "username is already in use." });
    }
    const validUsername = /.{3,}/.test(username);
if (!validUsername) {
  return res.status(400).json({ message: "Username must have at least 3 characters." });
}
    /////////
    // Custom password validation
    const isStrongPassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{4,})/.test(password);
    if (!isStrongPassword) {
      return res.status(400).json({ message: "Password must have at least 4 characters, one capital letter, and one symbol." });
    }

    // If email and password pass validation, proceed to save data
    const newData = new DataModel({ username, password, location }); // Include username in the document
    await newData.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    console.log("Server error while saving data", error.message);
    // Send detailed error message to the client
    res.status(500).json({ message: "Server error while saving data", error: error.message });
  }
});

app.get('/username', (req, res) => {
  if (req.session.username) {
      return res.json({ valid: true, username: req.session.username });
  } else {
      return res.json({ valid: false });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by email
    const existingUser = await DataModel.findOne({ username });

    if (existingUser) {
      // If the user exists, compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {

        req.session.username = existingUser.username;//
       //res.json({message:existingUser.username});

        // If the password matches, respond with a success message
        res.json({ message: "Login successful"});
      } else {
        // If the password does not match, respond with an error message
        res.json({ message: "Invalid Password" });

        //console.error("Invalid password for email:", email);
      }
    } 
    else{
      res.json({ message: "Invalid Username" });

    }
  } catch (error) {
    // Handle server errors
    console.log("Server error while handling login", error.message);
    res.status(500).json({ message: "Server error while handling login" });
  }
});

app.post("/auctionpost", async (req, res) => {
  const { image, category, duration, sellerWallet } = req.body;
  const currentTime = new Date();
  const endTime = new Date(currentTime.getTime() + parseInt(duration, 10) * 60000);
  const winner = "";

  try {
    await ImageDetails.create({ image, category, duration, endTime, sellerWallet,winner });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error while saving image details:", error);
    res.status(500).json({ status: "Error saving image data. Please try again later." });
  }
});
app.put("/winnerput/:itemId", async (req, res) => {
  try {
    const { winner } = req.body;
    const itemId = req.params.itemId;

    // Assuming ImageDetails is your Mongoose model
    const updatedItem = await ImageDetails.findByIdAndUpdate(itemId, { winner }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ status: "Item not found" });
    }

    res.json({ status: "ok", updatedItem });
  } catch (error) {
    console.error("Error while updating image details:", error);
    res.status(500).json({ status: "Error updating image data. Please try again later." });
  }
});




app.get("/get-image", async (req, res) => {
  
  try {
    const allImages = await ImageDetails.find();
    
    res.json(allImages);
  } catch (error) {
    console.error("Error while retrieving images:", error);
    res.status(500).json({ status: "Error retrieving images. Please try again later." });
  }
});



app.use(bodyParser.json());

// Endpoint to store delivered-to person's location
app.post('/items', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const newLocation = new Location({ latitude, longitude });
    await newLocation.save();
    res.status(201).json({ message: 'Location saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});



app.get('/photo/:id', async (req, res) => {
  try {
    const photo = await ImageDetails.findById(req.params.id);
    if (!photo) {
      return res.status(404).send('Photo not found');
    }
    const imageUrl = `/images/${photo.image}`;
    res.send(`<img src="${imageUrl}" alt="Uploaded Image"/>`);
  } catch (error) {
    res.status(500).send('Error retrieving the photo');
  }
});



app.get('/getbidders', async (req, res) => {
  try {
    const imagebidders = await Imagebidders.find();
    res.json(imagebidders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/imagebidders", async (req, res) => {
  const { ID, userbid, amount } = req.body;
  

  try {
    await Imagebidders.create({ ID, userbid,amount });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error while saving data", error);
    res.status(500).json({ status: "Error saving image data. Please try again later." });
  }
});