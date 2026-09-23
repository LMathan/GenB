import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const domains = ["https://genbbikecare.com", "https://genbbikecare.in"];
  const routes = ["", "/services", "/locations", "/book", "/about", "/gallery", "/reviews", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  domains.forEach((domain) => {
    routes.forEach((route) => {
      entries.push({
        url: `${domain}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" || route === "/book" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route === "/book" || route === "/locations" ? 0.9 : 0.8,
      });
    });
  });

  return entries;
}
