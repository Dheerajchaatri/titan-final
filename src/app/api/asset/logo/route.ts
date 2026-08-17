import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const userUploadedLogo = "C:\\Users\\AVD SOLUTIONS\\.gemini\\antigravity\\brain\\3e872dee-4632-48d0-85f4-c0775932ef70\\.user_uploaded\\media_1786926157327.png";
    const publicLogo = path.join(process.cwd(), "public", "logo.png");

    let filePathToRead = "";

    if (fs.existsSync(userUploadedLogo)) {
      filePathToRead = userUploadedLogo;
    } else if (fs.existsSync(publicLogo)) {
      filePathToRead = publicLogo;
    }

    if (filePathToRead) {
      const fileBuffer = fs.readFileSync(filePathToRead);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse(null, { status: 404 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
