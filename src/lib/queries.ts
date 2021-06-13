import prisma from "./db";

import type { PrismaPromise, Food } from "@prisma/client";

export const loadAllFoods = (): PrismaPromise<Food[]> => prisma.food.findMany();
