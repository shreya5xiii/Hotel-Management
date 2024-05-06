const express=require("express")
const path=require("path")
const app= express()
const PORT=3000
const bodyparser = require("body-parser")
const mongo = require("./mongo")
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())



app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
  });
app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/signup.html'));
  });
  app.get('/welcome.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/welcome.html'));
  });
  app.get('/validation.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/validation.js'));
  });
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/style.css'));
  });
  app.get('/style2.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/style2.css'));
  });
  app.get('/main.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/main.jpg'));
  });
  app.get('/logo.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/logo.jpg'));
  });
  app.get('/one.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/one.jpg'));
  });
   app.get('/two.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/two.jpg'));
  }); 
  app.get('/three.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/three.jpg'));
  });
  app.get('/addroom.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/addroom.html'));
  });
  app.get('/style3.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/style3.css'));
  });
  app.get('/allroom.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/allroom.html'));
  });
  app.get('/deleteroom.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/deleteroom.html'));
  });
  app.get('/bookroom.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/bookroom.html'));
  });
  app.get('/book.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/book.html'));
  });
  app.get('/updateroom.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/updateroom.html'));
  });
  app.get('/update.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/update.html'));
  });
  app.get('/addemployee.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/addemployee.html'));
  });
  app.get('/updateemployee.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/updateemployee.html'));
  });
  app.get('/updateemp.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/updateemp.html'));
  });
  app.get('/allemployee.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/allemployee.html'));
  });
  app.get('/deleteemployee.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/deleteemployee.html'));
  });
  app.get('/checkoutroom.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/checkoutroom.html'));
  });
  app.get('/checkout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/checkout.html'));
  });
  app.get('/clienthistory.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/clienthistory.html'));
  });
  app.get('/employeehistory.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/employeehistory.html'));
  });


//to save signup data
app.post("/signup.html", async (req, res) => {
  const data = req.body;
  console.log(data)
  if (data.name && data.email && data.password && data.confirm_password) {
      try {
          const result = await mongo.signup(data);
          console.log("Form data saved successfully:",result);
          res.status(201).json({ "info": "success", "data": result.insertedId });
      } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ "info": "error", "message": "Failed to save form data" });
      }
  } else {
      res.status(401).json({ "info": "error", "message": "Please provide all details" });
  }
});



//for admin login
app.get("/Login", async (req, res) => {
  const { email } = req.query;
  try {
      const formData = await mongo.getAllsignup(email);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});



//to addroom
app.post("/Addroomdata", async (req, res) => {
  const data = req.body;
  console.log(data)
  if (data.roomno && data.acNonac && data.price && data.available&& data.status&& data.bed) {
      try {
          const result = await mongo.addroom(data);
        
          console.log("Form data saved successfully:",result);
          res.status(201).json({ "info": "success", "data": result.insertedId });
      } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ "info": "error", "message": "Failed to save form data" });
      }
  } else {
      res.status(401).json({ "info": "error", "message": "Please provide all details" });
  }
});









//to get all rooms
app.get("/getallroom", async (req, res) => {
  const data = req.query;
  console.log(data.dbName)
  try {
      const formData = await mongo.getallroom(data.dbName);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});






//to get romm of our choice 
app.get("/Search", async (req, res) => {
  const data = req.query;
  try {
      const formData = await mongo.searchChoice(data.acNonac,data.bed,data.dbName);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});






//to book room
app.post("/Bookroom", async (req, res) => {
  const data = req.body;
  console.log(data)
  if (data.custname && data.custidtype && data.custidnumber && data.custmobno && data.gender && data.roomNo && data.deposite) {
      try {
          const result = await mongo.book(data);
          console.log("Form data saved successfully:",result);
          res.status(201).json({ "info": "success", "data": result.insertedId });
      } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ "info": "error", "message": "Failed to save form data" });
      }
  } else {
      res.status(401).json({ "info": "error", "message": "Please provide all details" });
  }
});





// to occupy ie. to update availability
app.get("/occupy", async (req, res) => {
  const data = req.query;
  try {
      const formData = await mongo.occupy(data);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});




//to get room for updation
app.get("/getroom", async (req, res) => {
  const data = req.query;
  try {
      const formData = await mongo.getroom(data);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});


//to update roomdata
app.post("/Updateroom", async (req, res) => {
  const data = req.body;
  console.log(data)
  if (data.roomno && data.acNonac && data.price && data.available&& data.status&& data.bed) {
      try {
          const result = await mongo.Updateroom(data);
        
          console.log("Form data saved successfully:",result);
          res.status(201).json({ "info": "success", "data": result.insertedId });
       
      } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ "info": "error", "message": "Failed to save form data" });
      }
  } else {
     
      res.status(401).json({ "info": "error", "message": "Please provide all details" });
  }
});



//to add staff
app.post("/addemployee", async (req, res) => {
  const data = req.body;
  console.log("index.js",data)
  if (data.empid && data.empname && data.empage && data.empadharno && data.empgender&& data.empmobno && data.empjob && data.empsalary) {
      try {
          
      
          const result = await mongo.Addemp(data);
        
          console.log("Form data saved successfully:",result);
      
          res.status(201).json({ "info": "success", "data": result.insertedId });
     
      } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ "info": "error", "message": "Failed to save form data" });
      }
  } else {
   
      res.status(401).json({ "info": "error", "message": "Please provide all details" });
  }
});




//to get employee for updation
app.get("/Getemp", async (req, res) => {
  const data = req.query;
 
  try {
      const formData = await mongo.getemp(data);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});




//to update emp
app.post("/Updateemp", async (req, res) => {
  const data = req.body;
  console.log(data)
  if (data.empid && data.empname && data.empage && data.empadharno && data.empgender&& data.empmobno && data.empjob && data.empsalary) {
    try {
          // Save form data to MongoDB
          const result = await mongo.Updateemp(data);
        
          console.log("Form data saved successfully:",result);
          // Respond with success message and saved data
          res.status(201).json({ "info": "success", "data": result.insertedId });
       
      } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ "info": "error", "message": "Failed to save form data" });
      }
  } else {
      // Respond with error message if required fields are missing
      res.status(401).json({ "info": "error", "message": "Please provide all details" });
  }
});



//to get all emp
app.get("/getallemp", async (req, res) => {
  const data = req.query;
  console.log(data.dbName)
  try {
      const formData = await mongo.getallemp(data.dbName);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});


//to delete  emp
app.get("/Deleteemp", async (req, res) => {
  const data = req.query;
  console.log(data)
  try {
      const formData = await mongo.deleteemp(data);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});



//to delete room
app.get("/Deleteroom", async (req, res) => {
  const data = req.query;
  console.log(data)
  try {
      const formData = await mongo.deleteroom(data);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});


//to get room for checkout
app.get("/getroomforcheckout", async (req, res) => {
  const data = req.query;
 
  try {
      const formData = await mongo.getroomforcheckout(data);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});



//check out
app.post("/checkout", async (req, res) => {
  const data = req.body;
  console.log(data)
  if (data.roomno && data.custname && data.indate && data.intime && data.outdate&& data.outtime && data.deposite && data.finalamount) {
    try {
          // Save form data to MongoDB
          const result = await mongo.checkout(data);
        
          console.log("Form data saved successfully:",result);
          // Respond with success message and saved data
          res.status(201).json({ "info": "success", "data": result });
        
      } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ "info": "error", "message": "Failed to save form data" });
      }
  } else {
      // Respond with error message if required fields are missing
      res.status(401).json({ "info": "error", "message": "Please provide all details" });
  }
});


//to get all client history
app.get("/clienthistory", async (req, res) => {
  const data = req.query;
  console.log(data.dbName)
  try {
      const formData = await mongo.clienthistory(data.dbName);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});


//to get all client history
app.get("/employeehistory", async (req, res) => {
  const data = req.query;
  console.log(data.dbName)
  try {
      const formData = await mongo.employeehistory(data.dbName);
      res.status(200).json(formData);
  } catch (error) {
      console.error("Error fetching form data:", error);
      res.status(500).json({ "info": "error", "message": "Failed to fetch form data" });
  }
});

app.listen(PORT,()=>{
    console.log("app is running at",PORT)
})