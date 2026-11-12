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

  if (normalized.includes("clean") || normalized.includes("ddd")) {
    return {
      image: "/images/card-clean-architecture.jpg",
      categoryLabel: "CLEAN ARCHITECTURE",
    };
  }

  if (normalized.includes("observabilidad") || normalized.includes("grafana")) {
    return {
      image: "/images/card-docker-k8s.jpg",
      categoryLabel: "OBSERVABILIDAD CLOUD",
    };
  }

  if (normalized.includes("nextjs") || normalized.includes("zero-trust")) {
    return {
      image: "/images/card-owasp-security.jpg",
      categoryLabel: "ZERO-TRUST & EDGE",
    };
  }

  return {
    image: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    categoryLabel: "ARQUITECTURA CLOUD",
  };
}
