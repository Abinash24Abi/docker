const mongoose = require('mongoose');

const connectdb = async() => {
try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connection Successfully ✔️")
}
catch(err){
    console.log("Database Connection Error ❌ ")
    console.log(err)
    process.exit(1)
}

}



module.exports = connectdb;