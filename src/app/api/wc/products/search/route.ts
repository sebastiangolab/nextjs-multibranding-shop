import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const wcApiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wc/v3/products`;

    const params: Record<string, string> = {
      consumer_key: process.env.WC_CONSUMER_KEY!,
      consumer_secret: process.env.WC_SECRET_KEY!,
    };

    // Forward all query parameters
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const response = await axios.get(wcApiUrl, { params });

    // Forward WooCommerce pagination headers
    const headers: Record<string, string> = {};
    if (response.headers["x-wp-total"]) {
      headers["x-wp-total"] = response.headers["x-wp-total"];
    }

    if (response.headers["x-wp-totalpages"]) {
      headers["x-wp-totalpages"] = response.headers["x-wp-totalpages"];
    }

    return NextResponse.json(response.data, { headers });
  } catch (error) {
    console.error("❌ Product search API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
