import app from "./app";
import constants from "./config";

const port = constants.Port
app.listen(port,() => {
  console.log('Server is listening on port ', port)
  
})