import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },

  bio:       { type: String, default: "" },
  avatar:    { type: String, default: "" },

  following: { type: [String], default: [] }, // usernames suivis
  followers: { type: [String], default: [] }  // usernames qui te suivent
});

const User = mongoose.model("User", UserSchema);
export default User;
