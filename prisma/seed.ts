import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const menus = await prisma.menu.createManyAndReturn({
    data: [
      { name: "Home", path: "/" },
      { name: "Material", path: "/material" },
      { name: "Pengayaan", path: "/enrichment" },
      { name: "Ujian", path: "/exam" },
      { name: "Latihan", path: "/practice" },
      { name: "Role", path: "/role" },
      { name: "Hak Akses", path: "/authority" },
      { name: "Menu", path: "/menu" },
    ],
  });
  const roles = await prisma.role.createManyAndReturn({
    data: [{ name: "MASTER" }, { name: "ADMIN" }, { name: "USER" }],
  });
  const authorities = roles.map(async (role) => {
    await prisma.authority.createManyAndReturn({
      data: menus.map((menu) => ({
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        roleId: role.id,
        roleName: role.name,
        menuId: menu.id,
        menuPath: menu.path,
      })),
    });
  });
  console.log({ menus, roles, authorities });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
