// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { title, content } = req.body;

  try {
    await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    res.status(200).json({ message: "note created" });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
