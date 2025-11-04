import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";

// Query única para todos los datos del sitio
const SITE_QUERY = `*[_type == "siteSettings"][0]{
  title,
  heroSection{
    enabled,
    title,
    subtitle,
    backgroundImage{alt, asset->{_id, url}},
    primaryCta{
      text,
      link,
      external
    },
    secondaryCta{
      text,
      link,
      external
    },
  },
  aboutSection{
    enabled,
    title,
    subtitle,
    description,
    card1{
    icon,
    title,
    description
  },
  card2{
    icon,
    title,
    description
  },
  card3{
    icon,
    title,
    description
  },
  },
  servicesSection{
    enabled,
    title,
    subtitle,
    services[]->{
      _id,
      name,
      title,
      description,
      icon
    }
  },
  blogSection{
    enabled,
    title,
    subtitle,
    viewAllButton,
    blogPageLink
  },
  "posts": *[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc)[0..2]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featuredImage{alt, asset->{_id, url}},
    author->{
      name,
      image{alt, asset->{_id, url}}
    },
    "bodyPreview": pt::text(body)[0...150] + "...",
    tags[]->{ title }
  },
    agendaSection{
    enabled,
    title,
    subtitle,
    agendaLink,
    height
  },
  contactSection{
    enabled,
    title,
    subtitle,
    contactInfo{
      address,
      phone,
      email,
      schedule[]{days, hours}
    }
  },
  footerSection{
    enabled,
    businessInfo{
      logo{alt, asset->{_id, url}},
      name,
      description
    },
    contactInfo{
      address,
      phone,
      email
    },
    socialLinks{
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      tiktok
    },
    copyright
  }
}`;

// Queries individuales por sección (fallback)
const SECTION_QUERIES = {
  heroSection: `*[_type == "siteSettings"][0].heroSection{
    enabled,
    title,
    subtitle,
    backgroundImage{alt, asset->{_id, url}},
    ctas[]{text, link, variant}
  }`,
  aboutSection: `*[_type == "siteSettings"][0].aboutSection{
    enabled,
    title,
    subtitle,
    description,
    image{alt, asset->{_id, url}},
    stats[]{label, value}
  }`,
  servicesSection: `*[_type == "siteSettings"][0]{
    servicesSection{
      enabled,
      title,
      subtitle,
      services[]->{
        _id,
        name,
        title,
        description,
        icon
      }
    }
  }`,
  blogSection: `*[_type == "siteSettings"][0]{
    blogSection{
      enabled,
      title,
      subtitle,
      viewAllButton,
      blogPageLink
    },
    "posts": *[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc)[0..2]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      featuredImage{alt, asset->{_id, url}},
      author->{
        name,
        image{alt, asset->{_id, url}}
      },
      "bodyPreview": pt::text(body)[0...150] + "...",
      tags[]->{ title }
    }
  }`,
  agendaSection: `*[_type == "siteSettings"][0].agendaSection{
    enabled,
    title,
    subtitle,
    agendaLink,
    height
  }`,
  contactSection: `*[_type == "siteSettings"][0].contactSection{
    enabled,
    title,
    subtitle,
    contactInfo{
      address,
      phone,
      email,
      schedule[]{days, hours}
    }
  }`,
  footerSection: `*[_type == "siteSettings"][0].footerSection{
    enabled,
    businessInfo{
      logo{alt, asset->{_id, url}},
      name,
      description
    },
    contactInfo{
      address,
      phone,
      email
    },
    socialLinks{
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      tiktok
    },
    copyright
  }`,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionData = any;

interface SiteData extends SanityDocument {
  heroSection?: SectionData;
  aboutSection?: SectionData;
  servicesSection?: SectionData;
  blogSection?: SectionData;
  posts?: SectionData[];
  agendaSection?: SectionData;
  contactSection?: SectionData;
  footerSection?: SectionData;
}

interface UseSiteDataReturn {
  data: SiteData | null;
  errors: Record<string, Error>;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useSiteData(): UseSiteDataReturn {
  const [data, setData] = useState<SiteData | null>(null);
  const [errors, setErrors] = useState<Record<string, Error>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      console.log("🚀 [useSiteData] Attempting single query fetch...");

      // Estrategia 1: Intentar query única (más rápido)
      const result = await client.fetch<SiteData>(SITE_QUERY);

      console.log("✅ [useSiteData] Single query successful:", result);
      setData(result);
    } catch (mainError) {
      console.error("❌ [useSiteData] Main query failed:", mainError);
      console.log(
        "🔄 [useSiteData] Falling back to individual section queries..."
      );

      // Estrategia 2: Fallback a queries individuales por sección
      const sectionData: Record<string, SectionData> = {};
      const sectionErrors: Record<string, Error> = {};

      const results = await Promise.allSettled(
        Object.entries(SECTION_QUERIES).map(async ([key, query]) => {
          try {
            const result = await client.fetch(query);
            console.log(`✅ [useSiteData] ${key} fetched successfully`);
            return { key, data: result };
          } catch (err) {
            console.error(`❌ [useSiteData] ${key} fetch failed:`, err);
            sectionErrors[key] = err as Error;
            return { key, data: null };
          }
        })
      );

      // Procesar resultados
      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value?.data) {
          const { key, data: sectionResult } = result.value;

          // Manejar casos especiales para servicesSection y blogSection
          if (key === "servicesSection" && sectionResult.servicesSection) {
            sectionData[key] = sectionResult.servicesSection;
          } else if (key === "blogSection") {
            sectionData.blogSection = sectionResult.blogSection;
            sectionData.posts = sectionResult.posts;
          } else {
            sectionData[key] = sectionResult;
          }
        }
      });

      setData(sectionData as SiteData);
      setErrors(sectionErrors);

      if (Object.keys(sectionErrors).length > 0) {
        console.warn(
          "⚠️ [useSiteData] Some sections failed to load:",
          sectionErrors
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, errors, isLoading, refetch: fetchData };
}
