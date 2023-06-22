import { Schema, model, models } from "mongoose";
const userDataSchema = new Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Subject: {
    type: String,
  },
  Message: { type: String },
  image: { type: String },
});

const Users = models.Users || model("Users", userDataSchema);

export default Users;
