import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const url: string | null = searchParams.get("url");

    if (url == null) {
        return NextResponse.json(
            {
                "error": "url is null"
            },
            { status: 400 }
        )
    }
    
    const response = await fetch(url);
    const textRes = await response.text();

    return NextResponse.json(
        {
            xml: textRes
        },
        { status: 200}
    );
};