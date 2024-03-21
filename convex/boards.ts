import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const getBoards = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;

    let boards = [];

    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", userId).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();
      const favoriteIds = favoriteBoards.map((board) => board.boardId);

      const boards = await getAllOrThrow(ctx.db, favoriteIds);
      return boards.map((board) => ({ ...board, isFavorite: true }));
    }

    if (args.search) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search!).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }
    const boardsWithFavorites = boards.map(async (board) => {
      const favorite = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", board._id)
        )
        .unique();
      return { ...board, isFavorite: !!favorite };
    });
    return await Promise.all(boardsWithFavorites);
  },
});
