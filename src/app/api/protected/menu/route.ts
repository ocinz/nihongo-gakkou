import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("You can see this because you're logged in");
}
