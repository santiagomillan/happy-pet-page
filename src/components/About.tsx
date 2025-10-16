import { Heart, Award, Clock } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";

// Types for minimal Portable Text block parsing
type PortableTextChild = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

type PortableTextBlock = {
  _key?: string;
  _type?: string;
  children?: PortableTextChild[];
  style?: string;
  markDefs?: unknown[];
};

// Query para About Section
const ABOUT_QUERY = `*[_type == "siteSettings"][0].aboutSection{
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
}`;

const About = () => {
  const [aboutData, setAboutData] = useState<SanityDocument | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch about data
  useEffect(() => {
    const fetchaboutData = async () => {
      try {
        console.log("🚀 [About] Iniciando fetch de datos about...");
        setIsLoading(true);
        setError(null);

        console.log("🔍 [About] Ejecutando query GROQ:");
        console.log("📝 [About] Query:", ABOUT_QUERY);

        const data = await client.fetch<SanityDocument>(ABOUT_QUERY);

        console.log("✅ [About] Datos obtenidos desde Sanity:");
        console.log("📊 [About] Datos completos:", data);

        if (data) {
          console.log("📄 [About] About Section encontrada:", {
            enabled: data.enabled,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            card1: data.card1,
            card2: data.card2,
            card3: data.card3,
          });
        } else {
          console.warn("⚠️ [About] No se encontraron datos de aboutSection");
        }

        setAboutData(data);
      } catch (err) {
        console.error("❌ [About] Error fetching about data:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchaboutData();
  }, []);

  // Small helper: normalize Portable Text (Sanity) blocks to array of paragraph strings
  const normalizePortableText = (
    portable: string | string[] | PortableTextBlock[] | undefined
  ): string[] | null => {
    if (!portable) return null;

    // If it's already a string
    if (typeof portable === "string") return [portable];

    // If it's an array of strings
    if (
      Array.isArray(portable) &&
      portable.every((p) => typeof p === "string")
    ) {
      return portable as string[];
    }

    // If it's Portable Text blocks (array of block objects)
    if (Array.isArray(portable)) {
      try {
        const paragraphs: string[] = (portable as PortableTextBlock[])
          .filter((blk) => blk && blk._type === "block")
          .map((blk) => {
            // children are spans
            if (!Array.isArray(blk.children)) return "";
            return blk.children
              .map((child) => (child && child.text ? child.text : ""))
              .join("");
          })
          .filter((p) => p && p.trim().length > 0);

        return paragraphs.length > 0 ? paragraphs : null;
      } catch (e) {
        console.warn(
          "[About] normalizePortableText fallback: error parsing portable text",
          e
        );
        return null;
      }
    }

    return null;
  };

  // Datos dinámicos desde Sanity o fallback estático (memoizados para evitar re-renders)
  const title = useMemo(
    () => aboutData?.title || "Meet Dr. Sarah Mitchell",
    [aboutData?.title]
  );

  const subtitle = useMemo(
    () => aboutData?.subtitle || "Your Trusted Partner in Pet Healthcare",
    [aboutData?.subtitle]
  );

  // Normalize description: can be Portable Text (blocks), array of strings, or string
  const description = useMemo(() => {
    const portable = aboutData?.description as unknown as
      | string
      | string[]
      | PortableTextBlock[]
      | undefined;
    const normalized = normalizePortableText(portable);
    if (normalized) return normalized;

    // fallback static paragraphs
    return [
      "With over 15 years of experience in veterinary medicine, Dr. Sarah Mitchell has dedicated her career to providing exceptional care for animals of all kinds. Her passion for animal welfare began in childhood and has only grown stronger through years of practice.",
      "Dr. Mitchell believes in treating every pet as if they were her own, combining advanced medical expertise with genuine compassion. She specializes in preventive care, emergency medicine, and building lasting relationships with both pets and their families.",
      "When she's not caring for patients, Dr. Mitchell enjoys hiking with her two rescue dogs and volunteering at local animal shelters.",
    ];
  }, [aboutData]);

  const card1 = useMemo(
    () =>
      aboutData?.card1 || {
        title: "Compassionate Care",
        description:
          "Every pet receives individualized attention and gentle treatment tailored to their unique needs.",
      },
    [aboutData?.card1]
  );

  const card2 = useMemo(
    () =>
      aboutData?.card2 || {
        title: "Certified Excellence",
        description:
          "Board-certified with continuous education in the latest veterinary advances and techniques.",
      },
    [aboutData?.card2]
  );

  const card3 = useMemo(
    () =>
      aboutData?.card3 || {
        title: "Always Available",
        description:
          "Extended hours and emergency services to ensure your pet gets care when they need it most.",
      },
    [aboutData?.card3]
  );

  // Log del estado actual
  useEffect(() => {
    console.log("🎯 [About] Estado actual del componente:", {
      isLoading,
      error,
      aboutData: !!aboutData,
      title,
      subtitle,
      description: Array.isArray(description)
        ? description.length + " párrafos"
        : description,
      card1,
      card2,
      card3,
    });
  }, [
    isLoading,
    error,
    aboutData,
    title,
    subtitle,
    description,
    card1,
    card2,
    card3,
  ]);

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            {description.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg text-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-6">
            <div className="bg-card p-6 rounded-lg shadow-card border border-border animate-scale-in">
              <Heart className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {card1.title}
              </h3>
              <p className="text-muted-foreground">{card1.description}</p>
            </div>

            <div
              className="bg-card p-6 rounded-lg shadow-card border border-border animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {card2.title}
              </h3>
              <p className="text-muted-foreground">{card2.description}</p>
            </div>

            <div
              className="bg-card p-6 rounded-lg shadow-card border border-border animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Clock className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {card3.title}
              </h3>
              <p className="text-muted-foreground">{card3.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
