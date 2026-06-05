import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AH Digital Solutions — Sites, sistemas e automações com IA" },
      {
        name: "description",
        content:
          "Empresa de tecnologia em Americana, SP. Sites modernos, sistemas personalizados e automações com IA para empresas que querem crescer com eficiência.",
      },
      { property: "og:title", content: "AH Digital Solutions" },
      {
        property: "og:description",
        content:
          "Sites, sistemas e automações com IA — entregues por quem entende de engenharia e de negócio.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});
