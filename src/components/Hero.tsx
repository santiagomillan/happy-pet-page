import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-vet.jpg";
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";

// Query completa desde siteSettings
const HERO_QUERY = `*[_type == "siteSettings"][0]{
  heroSection{
    enabled,
    title,
    subtitle,
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
    backgroundImage{
      alt,
      asset->{
        _id,
        url
      },
      hotspot
    },
    stats[]{
      label,
      value,
      suffix
    }
  }
}`;

const Hero = () => {
  const [heroData, setHeroData] = useState<SanityDocument | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch hero data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        console.log("🚀 [Hero] Iniciando fetch de datos hero...");
        setIsLoading(true);
        setError(null);

        console.log("🔍 [Hero] Ejecutando query GROQ:");
        console.log("📝 [Hero] Query:", HERO_QUERY);

        const data = await client.fetch<SanityDocument>(HERO_QUERY);

        console.log("✅ [Hero] Datos obtenidos desde Sanity:");
        console.log("📊 [Hero] Datos completos:", data);

        if (data?.heroSection) {
          console.log("📄 [Hero] Hero Section encontrada:", {
            enabled: data.heroSection.enabled,
            title: data.heroSection.title,
            subtitle: data.heroSection.subtitle,
            primaryCta: data.heroSection.primaryCta,
            secondaryCta: data.heroSection.secondaryCta,
            backgroundImage: data.heroSection.backgroundImage,
            stats: data.heroSection.stats,
          });
        } else {
          console.warn("⚠️ [Hero] No se encontró heroSection en los datos");
        }

        setHeroData(data);
      } catch (err) {
        console.error("❌ [Hero] Error fetching hero data:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Datos dinámicos desde Sanity o fallback estático (memoizados para evitar re-renders)
  const heroSection = heroData?.heroSection;
  const title =
    heroSection?.title || "Compassionate Care for Your Beloved Pets";
  const subtitle =
    heroSection?.subtitle ||
    "Expert veterinary services with a gentle touch. Your pet's health and happiness are our top priority.";
  const backgroundImg = heroSection?.backgroundImage?.asset?.url || heroImage;

  const primaryCta = useMemo(
    () =>
      heroSection?.primaryCta || {
        text: "Schedule Appointment",
        link: "#contact",
      },
    [heroSection?.primaryCta]
  );

  const secondaryCta = useMemo(
    () =>
      heroSection?.secondaryCta || { text: "Our Services", link: "#services" },
    [heroSection?.secondaryCta]
  );

  // Log del estado actual
  useEffect(() => {
    console.log("🎯 [Hero] Estado actual del componente:", {
      isLoading,
      error,
      heroData: !!heroData,
      heroSection: !!heroSection,
      title,
      subtitle,
      backgroundImg,
      primaryCta,
      secondaryCta,
    });
  }, [
    isLoading,
    error,
    heroData,
    heroSection,
    title,
    subtitle,
    backgroundImg,
    primaryCta,
    secondaryCta,
  ]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 animate-fade-in">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            {subtitle}
          </p>

          {/* Stats si están disponibles */}
          {heroSection?.stats && heroSection.stats.length > 0 && (
            <div className="flex flex-wrap gap-6 mb-8">
              {heroSection.stats.map(
                (
                  stat: { label: string; value: string; suffix?: string },
                  index: number
                ) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {stat.value}
                      {stat.suffix || ""}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => {
                if (!primaryCta.external) {
                  const element = document.getElementById(primaryCta.link);
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.open(primaryCta.link, "_blank");
                }
              }}
              className="bg-gradient-hero text-primary-foreground hover:opacity-90 text-lg px-8 py-6"
            >
              {primaryCta.text}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                if (!secondaryCta.external) {
                  const element = document.getElementById(secondaryCta.link);
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.open(secondaryCta.link, "_blank");
                }
              }}
              className="text-lg px-8 py-6 border-2"
            >
              {secondaryCta.text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
