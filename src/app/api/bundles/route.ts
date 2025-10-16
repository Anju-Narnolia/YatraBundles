import dbConnect from "@/lib/dbConnect";
import Bundle from "@/models/Bundle";

export async function GET(req: Request) {
  await dbConnect(); 
  const bundles = await Bundle.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(bundles), { status: 200 });
}
