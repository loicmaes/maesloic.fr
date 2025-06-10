import type { PrismaClient } from "@prisma/client";

const services = [
  {
    id: 1,
    title: {
      fr: "Performance et adaptabilité avant tout",
    },
    caption: {
      fr: "Des sites rapides, accessibles et fluides sur tous les supports.",
    },
    icon: "Globe",
    displayed: true,
  },
  {
    id: 2,
    title: {
      fr: "Applications web modernes",
    },
    caption: {
      fr: "SaaS, PWA ou outils métiers : je conçois des apps fiables et scalables.",
    },
    icon: "Rocket",
    displayed: true,
  },
  {
    id: 3,
    title: {
      fr: "Design pensé pour l'usage",
    },
    caption: {
      fr: "Des interfaces simples et efficaces, centrées sur l'utilisateur.",
    },
    icon: "Users",
    displayed: true,
  },
  {
    id: 4,
    title: {
      fr: "Code propre et durable",
    },
    caption: {
      fr: "Un code lisible, maintenable et éthique, prêt pour la suite.",
    },
    icon: "Code",
    displayed: true,
  },
];

export async function seedServices(client: PrismaClient) {
  for (const service of services)
    await client.service.upsert({
      where: {
        id: service.id,
      },
      create: {
        ...service,
        title: JSON.stringify(service.title),
        caption: JSON.stringify(service.caption),
      },
      update: {
        ...service,
        title: JSON.stringify(service.title),
        caption: JSON.stringify(service.caption),
      },
    });
}
