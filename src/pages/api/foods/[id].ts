import prisma from "src/lib/db";

import type { Food } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> {
  const id = Number(req.query.id);
  switch (req.method) {
    case "GET": {
      void handleGET(id, res);
      break;
    }
    case "DELETE": {
      void handleDELETE(id, res);
      break;
    }
    case "PUT": {
      void handlePUT(id, req.body, res);
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  return res;
}

async function handleGET(id: number, res: NextApiResponse) {
  const data = await prisma.food.findUnique({ where: { id } });
  res.json(data);
}

async function handleDELETE(id: number, res: NextApiResponse) {
  const data = await prisma.food.delete({ where: { id } });
  res.json(data);
}

async function handlePUT(id: number, data: Food, res: NextApiResponse) {
  const result = await prisma.food.update({ where: { id }, data });
  res.json(result);
}
