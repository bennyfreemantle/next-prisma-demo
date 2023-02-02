// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const noteId = req.query.id;

  if (req.method === "DELETE") {
    try {
      const note = await prisma.note.delete({
        where: {
          id: Number(noteId),
        },
      });
      res.json(note);
    } catch (error) {
      console.log(`Error while deleting note: ${error}`);
    }
  } else if (req.method === "PATCH") {
    const { title, content } = req.body;
    try {
      const note = await prisma.note.update({
        where: {
          id: Number(noteId),
        },
        data: {
          title,
          content,
        },
      });
      res.json(note);
    } catch (error) {
      console.log(`Error while updating note: ${error}`);
    }
  }
}
