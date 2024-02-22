import { model, Schema } from "mongoose";

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = model("Profile", profileSchema);
export default Profile;
