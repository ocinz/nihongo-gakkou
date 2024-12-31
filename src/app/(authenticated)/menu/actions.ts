"use server";

import { prisma } from "@/prisma";
import { Menu } from "lucide-react";

export type Menu = {
  id: string;
  name: string;
  path: string;
};
export type CreateMenu = {
  name: string;
  path: string;
};

export async function getMenuDatas(): Promise<Menu[]> {
  return await prisma.menu.findMany({
    select: { id: true, name: true, path: true },
    take: 10,
  });
}

export async function create(menu: CreateMenu) {
  if (!menu.name || !menu.path) {
    throw new Error("Name and path are required");
  }

  return await prisma.menu.create({
    data: menu,
  });
}
