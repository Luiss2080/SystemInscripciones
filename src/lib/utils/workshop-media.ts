import type { WorkshopMediaMeta } from "@/types/events";

const FALLBACK_IMAGES = [
  "/images/card-docker-k8s.jpg",
  "/images/card-owasp-security.jpg",
  "/images/card-ai-agents.jpg",
  "/images/card-clean-architecture.jpg",
];

/**
 * Resolves a distinct workshop cover image and category badge from an event slug.
 */
export function getWorkshopMedia(slug: string, index = 0): WorkshopMediaMeta {
  const normalized = slug.toLowerCase();

  if (
    normalized.includes("docker") ||
    normalized.includes("microservicios") ||
    normalized.includes("k8s")
  ) {
    return {
      image: "/images/card-docker-k8s.jpg",
      categoryLabel: "MICROSERVICIOS & K8S",
    };
  }

  if (normalized.includes("owasp") || normalized.includes("seguridad")) {
    return {
      image: "/images/card-owasp-security.jpg",
      categoryLabel: "SEGURIDAD OWASP",
    };
  }

  if (normalized.includes("ia") || normalized.includes("agentes") || normalized.includes("mcp")) {
    return {
      image: "/images/card-ai-agents.jpg",
      categoryLabel: "AGENTES IA & MCP",
    };
  }

  return {
    image: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    categoryLabel: "ARQUITECTURA CLOUD",
  };
}

