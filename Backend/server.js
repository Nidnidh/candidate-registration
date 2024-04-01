const express = require("express");
const cors = require("cors");
const app = express();
const usersRouter = require("./routes/candidate"); 
const sequelize = require("./config/database"); 
console.log("Hello, let's start the backend");
app.use(express.json());
app.use(cors());
app.use("/candidates", usersRouter); 

sequelize.sync({force:true}); 




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
