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
    try {
      const identity = await ctx.auth.getUserIdentity();
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
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

export const deleteBoard = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const { id } = args;
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized");
      }
      await ctx.db.delete(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

export const updateBoard = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const { id, title } = args;
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized");
      }
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        throw new Error("Название обязательно");
      }
      await ctx.db.patch(id, { title: trimmedTitle });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

export const addToFavorites = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized");
      }

      const board = await ctx.db.get(args.id);
      if (!board) {
        throw new Error("Board not found");
      }

      const userId = identity.subject;
      const alreadyInFavorites = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board_org", (q) =>
          q.eq("userId", userId).eq("boardId", board._id).eq("orgId", board.orgId)
        )
        .unique();
      if (alreadyInFavorites) {
        throw new Error("Board already in favorites");
      }
      await ctx.db.insert("userFavorites", {
        userId,
        boardId: board._id,
        orgId: board.orgId,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

export const deleteFromFavorites = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized");
      }

      const board = await ctx.db.get(args.id);
      if (!board) {
        throw new Error("Board not found");
      }

      const userId = identity.subject;
      const alreadyInFavorites = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board_org", (q) =>
          q.eq("userId", userId).eq("boardId", board._id).eq("orgId", board.orgId)
        )
        .unique();
      if (!alreadyInFavorites) {
        throw new Error("Board is not favored");
      }
      await ctx.db.delete(alreadyInFavorites._id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});
