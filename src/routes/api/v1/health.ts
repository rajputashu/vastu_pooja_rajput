import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/v1/health")({
  server: {
    handlers: {
      GET: async () =>
        Response.json({
          status: "ok",
          service: "pooja-rajput-vastu",
          version: "0.1.0",
          phase: 1,
        }),
    },
  },
});
