import { connect as _connect } from "mongoose";

const connectDb = async () => {
    try{
        const connect = await _connect(process.env.CONNECTION_STRING);
        console.log(
            "Database connected: ",
             connect.connection.host,
             connect.connection.name
            );
    } catch (err) {
        console.log(err);
    }
};

export default connectDb;