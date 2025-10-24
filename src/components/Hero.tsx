import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-vet.jpg";

interface HeroProps {
  data?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    primaryCta?: {
      text?: string;
      link?: string;
      external?: boolean;
    };
    secondaryCta?: {
      text?: string;
      link?: string;
      external?: boolean;
    };
    backgroundImage?: {
      alt?: string;
      asset?: {
        url?: string;
      };
    };
    stats?: Array<{
      label?: string;
      value?: string;
      suffix?: string;
    }>;
  };
}

const Hero = ({ data: heroData }: HeroProps) => {
  // Datos dinámicos desde Sanity o fallback estático (memoizados para evitar re-renders)
  const title =
    heroData?.title || "Compassionate Care for Your Beloved Pets";
  const subtitle =
    heroData?.subtitle ||
    "Expert veterinary services with a gentle touch. Your pet's health and happiness are our top priority.";
  const backgroundImg = heroData?.backgroundImage?.asset?.url || heroImage;

  const primaryCta = useMemo(
    () =>
      heroData?.primaryCta || {
        text: "Schedule Appointment",
        link: "#contact",
      },
    [heroData?.primaryCta]
  );

  const secondaryCta = useMemo(
    () =>
      heroData?.secondaryCta || { text: "Our Services", link: "#services" },
    [heroData?.secondaryCta]
  );

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
          {heroData?.stats && heroData.stats.length > 0 && (
            <div className="flex flex-wrap gap-6 mb-8">
              {heroData.stats.map(
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
