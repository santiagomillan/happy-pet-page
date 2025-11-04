import {
  Stethoscope,
  Syringe,
  Activity,
  Scissors,
  AlertCircle,
  Heart,
  Cross,
  Pill,
  Dog,
  Cat,
  Bone,
  Sparkles,
  ShieldPlus,
  Microscope,
  Siren,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";

// Tipo para un servicio desde Sanity
type SanityService = {
  name?: string;
  title?: string;
  description?: string | unknown[];
  icon?: string | { title?: string; value?: string };
};

interface ServicesProps {
  data?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    services?: SanityService[];
  };
}

// Helper: convertir Portable Text a string simple
const portableTextToString = (
  portableText: string | unknown[] | undefined
): string => {
  if (!portableText) return "";

  if (typeof portableText === "string") return portableText;

  if (Array.isArray(portableText)) {
    return portableText
      .map((block: unknown) => {
        const b = block as {
          _type?: string;
          children?: Array<{ text?: string }>;
        };
        if (b._type === "block" && b.children) {
          return b.children.map((child) => child.text || "").join("");
        }
        return "";
      })
      .filter((text) => text.trim().length > 0)
      .join(" ");
  }

  return "";
};

// Mapeo dinámico de iconos desde string a componente Lucide (case-insensitive)
const iconMap: Record<string, LucideIcon> = {
  // Médicos y salud
  stethoscope: Stethoscope,
  syringe: Syringe,
  activity: Activity,
  microscope: Microscope,
  pill: Pill,
  shieldplus: ShieldPlus,

  // Herramientas
  scissors: Scissors,
  cross: Cross,

  // Alertas y emociones
  alertcircle: AlertCircle,
  heart: Heart,
  siren: Siren,

  // Animales y otros
  dog: Dog,
  cat: Cat,
  bone: Bone,
  sparkles: Sparkles,
};

// Helper para obtener icono dinámicamente
const getIconComponent = (
  iconInput?: string | { title?: string; value?: string }
): LucideIcon => {
  if (!iconInput) return Stethoscope;

  let iconName: string;
  if (typeof iconInput === "object") {
    iconName = iconInput.value || iconInput.title || "";
  } else {
    iconName = iconInput;
  }

  const normalizedName = iconName.toLowerCase();
  return iconMap[normalizedName] || Stethoscope;
};

// Datos estáticos como fallback
const fallbackServices = [
  {
    icon: Stethoscope,
    title: "Wellness Check-ups",
    description:
      "Comprehensive physical examinations to keep your pet healthy and detect issues early.",
    color: "text-primary",
  },
  {
    icon: Syringe,
    title: "Vaccinations",
    description:
      "Essential vaccines to protect your pets from preventable diseases and illnesses.",
    color: "text-secondary",
  },
  {
    icon: Activity,
    title: "Surgical Services",
    description:
      "Advanced surgical procedures performed with precision and care in our modern facility.",
    color: "text-accent",
  },
  {
    icon: Scissors,
    title: "Grooming & Care",
    description:
      "Professional grooming services to keep your pets clean, comfortable, and looking their best.",
    color: "text-primary",
  },
  {
    icon: AlertCircle,
    title: "Emergency Care",
    description:
      "24/7 emergency services for urgent medical situations requiring immediate attention.",
    color: "text-destructive",
  },
  {
    icon: Heart,
    title: "Dental Care",
    description:
      "Complete dental services including cleanings, extractions, and oral health maintenance.",
    color: "text-secondary",
  },
];

const Services = ({ data: servicesData }: ServicesProps) => {
  // Datos dinámicos desde Sanity o fallback estático
  const title = useMemo(
    () => servicesData?.title || "Our Veterinary Services",
    [servicesData?.title]
  );

  const subtitle = useMemo(
    () =>
      servicesData?.subtitle ||
      "Comprehensive care for every stage of your pet's life",
    [servicesData?.subtitle]
  );

  // Procesar servicios desde Sanity o usar fallback
  const services = useMemo(() => {
    if (servicesData?.services && Array.isArray(servicesData.services)) {
      return servicesData.services.map(
        (service: SanityService, index: number) => {
          const description = portableTextToString(service.description);
          const IconComponent = getIconComponent(service.icon);

          const colors = [
            "text-primary",
            "text-secondary",
            "text-accent",
            "text-destructive",
          ];
          const color = colors[index % colors.length];

          return {
            icon: IconComponent,
            title: service.name || service.title || "Service",
            description: description,
            color: color,
          };
        }
      );
    }

    return fallbackServices;
  }, [servicesData]);
  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title + index}
                className="border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-4">
                    <Icon className={`w-12 h-12 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
