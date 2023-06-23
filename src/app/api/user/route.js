// import { User } from "@/utils/actions";
// const multer = require("multer");
// import upload from "@/helpers/upload";
import Users from "@/models/user";
import DBConnect from "@/utils/db";
import { NextResponse } from "next/server";

// import { useRouter } from 'next/navigate';
export async function POST(req, res) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 409 }
      );
    }
    if (!body.email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 409 }
      );
    }
    if (!body.subject) {
      return NextResponse.json(
        { message: "Subject is required" },
        { status: 409 }
      );
    }
    if (!body.message) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 409 }
      );
    }
    await DBConnect();
    let isExist = await Users.exists({
      Email: body.email,
    });
    if (isExist) {
      return NextResponse.json(
        { message: "Email Already Exists" },
        { status: 409 }
      );
    }
    await Users.create({
      Name: body.name,
      Email: body.email,
      Subject: body.subject,
      Message: body.message,
    });
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
    if (queryParam) {
      const users = await Users.find({ _id: queryParam });
      console.log("users ==============>", users);
      return NextResponse.json(users);
    } else {
      const users = await Users.find({});
      console.log("users ==============>", users);
      return NextResponse.json(users);
    }
  } catch (error) {
    console.log("error is >>>>>>>>>>>>>>>>>>>>>", error);
    return NextResponse.json(
      { message: "server error, please try again!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const queryParam = req.nextUrl.searchParams.get("id");
    console.log("id==========>", queryParam);
    if (!queryParam) {
      return NextResponse.jsom({ message: "Id is required" }, { status: 409 });
    }
    await DBConnect();
    const DeleteData = await Users.findOneAndDelete({ _id: queryParam });
    console.log("Deleted Data ==============>", DeleteData);
    return NextResponse.json(DeleteData);
  } catch (error) {
    console.log("error is >>>>>>>>>>>>>>>>>>>>>", error);
    return NextResponse.json(
      { message: "server error, please try again!" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const queryParam = req.nextUrl.searchParams.get("id");
    console.log("id==========>", queryParam);
    if (!queryParam) {
      return NextResponse.jsom({ message: "Id is required" }, { status: 409 });
    }
    await DBConnect();
    const userData = await req.json();
    const UpdateData = await Users.findByIdAndUpdate(
      { _id: queryParam },
      userData
    );
    console.log("Previous Data ==============>", UpdateData);
    return NextResponse.json(UpdateData);
  } catch (error) {
    console.log("error is >>>>>>>>>>>>>>>>>>>>>", error);
    return NextResponse.json(
      { message: "server error, please try again!" },
      { status: 500 }
    );
  }
}
