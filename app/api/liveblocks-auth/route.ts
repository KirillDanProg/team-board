import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_ubh8GmSU0iJUzP4YOISAbEHP0K8d_tBmWeJD8GzmoOdnJC34NllyUoOSAPKK7Z_8",
});
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const authorization = auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }
  const { room } = await request.json();
  const board = await convex.query(api.board.getBoard, { id: room });

  if (!board || board.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    userName: user.firstName || "Участник",
    avatar: user.imageUrl,
  };

  const session = liveblocks.prepareSession(board._id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
