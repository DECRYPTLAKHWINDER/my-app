// import { User } from "@/utils/actions";
const multer = require("multer");
import upload from "@/helpers/upload";
import Users from "@/models/user";
import DBConnect from "@/utils/db";
import { NextResponse } from "next/server";

// import { useRouter } from 'next/navigate';
export async function POST(req, res) {
  console.log("req.body>>>>>>",await req.json());
  try {
    await upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log("A Multer error occurred when uploading:", err);
        return NextResponse.json(
          { message: "An error occurred when uploading the file." },
          { status: 500 }
        );
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log("An unknown error occurred when uploading:", err);
        return NextResponse.json(
          { message: "An unknown error occurred when uploading the file." },
          { status: 500 }
        );
      }
    });

    const imageUrl = req.file ? req.file.path : null;

    await DBConnect();

    const { name, email, subject, message } = body;
    await Users.create({
      Name: name,
      Email: email,
      Subject: subject,
      Message: message,
      image: imageUrl,
    });
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
