import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const currentUploadedPng = "C:\\Users\\AVD SOLUTIONS\\.gemini\\antigravity\\brain\\55bf8ee9-2b8a-4cbe-a873-2bcdb0a5a085\\.user_uploaded\\media_1786927941762.png";
    const publicPath = path.join(process.cwd(), "public", "hero-character.png");

    if (fs.existsSync(currentUploadedPng)) {
      try {
        fs.copyFileSync(currentUploadedPng, publicPath);
      } catch (_) {}
    }

    let filePathToRead = "";
    if (fs.existsSync(currentUploadedPng)) {
      filePathToRead = currentUploadedPng;
    } else if (fs.existsSync(publicPath)) {
      filePathToRead = publicPath;
    }

    if (filePathToRead) {
      const fileBuffer = fs.readFileSync(filePathToRead);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      });
    }

    return new NextResponse(null, { status: 404 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
