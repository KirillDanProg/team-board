import { v } from "convex/values";
import { query } from "./_generated/server";

export const getBoards = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const userId = identity.subject;
    const boardsWithFavorites = boards.map(async (board) => {
      const favorite = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) => q.eq("boardId", board._id).eq("userId", userId))
        .unique();
      return { ...board, isFavorite: !!favorite };
    });
    return await Promise.all(boardsWithFavorites);
  },
});
