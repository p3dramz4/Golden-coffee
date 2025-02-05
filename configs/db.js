const mongoose = require("mongoose")
const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to DB");
            return true
        } else {
            await mongoose.connect(process.env.MONGO_URL, {
            });
            console.log("Connect to DB Successfully");
        }
    } catch (err) {
        console.log("DB Connection has error", err);
    }
}
export default connectToDB
