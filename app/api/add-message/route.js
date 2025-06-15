import { NextResponse } from "next/server";
import addMessage from "@/app/actions/addMessage";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const result = await addMessage({}, formData);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ submitted: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
