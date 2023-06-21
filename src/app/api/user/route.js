// import { User } from "@/utils/actions";
import Users from "@/models/user";
import DBConnect from "@/utils/db";
import { NextResponse } from "next/server";
// import { useRouter } from 'next/navigate';
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

export async function GET(req) {
  try {
    const queryParam = req.nextUrl.searchParams.get("id");
    console.log("id==========>", queryParam);
    await DBConnect();
    const users = await Users.find({ _id: queryParam });
    console.log("users ==============>", users);
    return NextResponse.json(users);
  } catch (error) {
    console.log("error is >>>>>>>>>>>>>>>>>>>>>", error);
    return NextResponse.json(
      { message: "server error, please try again!" },
      { status: 500 }
    );
  }
}
