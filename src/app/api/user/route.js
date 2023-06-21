// import { User } from "@/utils/actions";
import Users from "@/models/user";
import DBConnect from "@/utils/db";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    await DBConnect();
    await Users.create(body);
    console.log("body is ==============>", body);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log("error is >>>>>>>>>>>>>>>>>>>>>", error);
    return NextResponse.json(
      { message: "server error, please try again!" },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  console.log("id==========>", req);
  try {
    await DBConnect();
    const id = req.query.id;
    console.log("id==========>", id);
    const users = await Users.find({ _id: id });
    console.log("users ==============>", users);
    // return res.status(200).json(users);
    return NextResponse.json(users);
  } catch (error) {
    console.log("error is >>>>>>>>>>>>>>>>>>>>>", error);
    return NextResponse.json(
      { message: "server error, please try again!" },
      { status: 500 }
    );
  }
}
