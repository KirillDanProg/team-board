import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
  "/placeholder/11.svg",
];

export const createBoard = mutation({
  args: { orgId: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.insert("boards", {
      orgId: args.orgId,
      title: args.title,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: images[Math.floor(Math.random() * images.length)],
    });
    return board;
  },
});
