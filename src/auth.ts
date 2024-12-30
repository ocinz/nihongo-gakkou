import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import { authConfig } from "./lib/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });

        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account?.provider ?? "",
                providerAccountId: account?.providerAccountId ?? "",
              },
            },
            create: {
              userId: existingUser.id,
              provider: account?.provider ?? "",
              providerAccountId: account?.providerAccountId ?? "",
              type: account?.type ?? "",
              access_token: account?.access_token ?? "",
              refresh_token: account?.refresh_token ?? "",
              expires_at: account?.expires_at ?? 0,
              scope: account?.scope,
              token_type: account?.token_type,
              id_token: account?.id_token,
            },
            update: {}, // Tidak ada perubahan jika sudah ada
          });
        } else {
          const userRole = await prisma.role.findUnique({
            where: { name: "USER" },
          });

          if (!userRole) {
            console.error(
              "Role USER tidak ditemukan. Harap tambahkan ke database."
            );
            return false;
          }
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              roleId: userRole.id,
              accounts: {
                create: {
                  provider: account?.provider ?? "",
                  providerAccountId: account?.providerAccountId ?? "",
                  type: account?.type ?? "",
                  access_token: account?.access_token ?? "",
                  refresh_token: account?.refresh_token,
                  expires_at: account?.expires_at,
                  scope: account?.scope,
                  token_type: account?.token_type,
                  id_token: account?.id_token,
                },
              },
            },
          });
        }

        return true; // Izinkan login
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Blokir login jika ada error
      }
    },
    async jwt({ token, account }) {
      // If user is logging in for the first time
      if (account) {
        let dbUser = await prisma.user.findUnique({
          where: { id: account.userId },
          include: {
            role: true,
          },
        });

        // Create a new user if not found in the database
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: token.email,
              name: token.name,
              image: token.email,
              role: {
                connectOrCreate: {
                  where: { name: "USER" },
                  create: { name: "USER" },
                },
              },
            },
            include: {
              role: true,
            },
          });
        }

        // Add user data, roles, and authorities to the JWT token
        token.id = dbUser.id;
        token.email = dbUser.email;
        token.name = dbUser.name;
        token.image = dbUser.image;
        token.roleId = dbUser?.role?.id;
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user.id = user.id;
      session.user.email = user?.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
});
