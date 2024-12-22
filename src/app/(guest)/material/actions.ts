"use server";
import { prisma } from "@/prisma";
export type CreateMaterial = {
  content: string;
  userId: string;
  level: Level;
  title: string;
};

// Tipe untuk memperbarui material (memerlukan id)
export type UpdateMaterial = {
  id: number;
  content?: string;
  userId?: string;
  level?: Level;
  title?: string;
};

export type Level = "N1" | "N2" | "N3" | "N4" | "N5";
export async function createMaterial(request: CreateMaterial) {
  await prisma.material.create({
    data: request,
  });
}
export async function updateMaterial(request: UpdateMaterial) {
  await prisma.material.update({
    where: { id: request.id },
    data: request,
  });
}
export async function deleteMaterial(request: number) {
  await prisma.material.delete({
    where: { id: request },
  });
}
export async function getMaterials() {
  return await prisma.material.findMany({
    select: {
      title: true,
      id: true,
      level: true,
    },
  });
}
export async function getMaterialById(id: number) {
  return await prisma.material.findFirst({
    where: {
      id: id,
    },
  });
}

import { redirect } from "next/navigation";

export async function navigate(path: string) {
  redirect(path);
}
