import { connect } from "mongoose";

function connectDB(connectionStr) {
  return connect(connectionStr);
}

export default connectDB;
