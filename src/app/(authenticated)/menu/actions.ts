"use server";

import { prisma } from "@/prisma";

export type Menu = {
  name: string;
  path: string;
};

export async function getMenuDatas() {
  return await prisma.menu.findMany({
    select: { id: true, name: true, path: true },
    take: 10,
  });
}

export async function create(menu: Menu) {
  if (!menu.name || !menu.path) {
    throw new Error("Name and path are required");
  }

  return await prisma.menu.create({
    data: menu,
  });
}
