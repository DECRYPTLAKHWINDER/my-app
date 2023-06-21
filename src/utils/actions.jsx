import Users from "@/models/user";
import DBConnect from "@/utils/db";

export const User = async (data) => {
  try {
    await DBConnect();
    const users = await new Users(data);
    await users.save();
    return;
  } catch (error) {
    console.log("error=============>", error);
  }
};
