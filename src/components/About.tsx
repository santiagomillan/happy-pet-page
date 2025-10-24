import { Heart, Award, Clock } from "lucide-react";
import { useMemo } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextValue = any;

interface AboutProps {
  data?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    description?: PortableTextValue;
    card1?: {
      icon?: string;
      title?: string;
      description?: string;
    };
    card2?: {
      icon?: string;
      title?: string;
      description?: string;
    };
    card3?: {
      icon?: string;
      title?: string;
      description?: string;
    };
  };
}

// Componentes personalizados para PortableText con estilos Tailwind
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg text-foreground leading-relaxed mb-6">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-foreground mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-foreground mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-foreground mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 text-foreground space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 text-foreground space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline">{children}</u>,
    code: ({ children }) => (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
  },
};

const About = ({ data: aboutData }: AboutProps) => {
  // Datos dinámicos desde Sanity o fallback estático (memoizados para evitar re-renders)
  const title = useMemo(
    () => aboutData?.title || "Meet Dr. Sarah Mitchell",
    [aboutData?.title]
  );

  const subtitle = useMemo(
    () => aboutData?.subtitle || "Your Trusted Partner in Pet Healthcare",
    [aboutData?.subtitle]
  );

  // Description from Sanity (Portable Text) - ya viene como array de bloques
  const description = useMemo(() => {
    return aboutData?.description || null;
  }, [aboutData?.description]);

  // Fallback content cuando no hay description desde Sanity
  const fallbackDescription = [
    "With over 15 years of experience in veterinary medicine, Dr. Sarah Mitchell has dedicated her career to providing exceptional care for animals of all kinds. Her passion for animal welfare began in childhood and has only grown stronger through years of practice.",
    "Dr. Mitchell believes in treating every pet as if they were her own, combining advanced medical expertise with genuine compassion. She specializes in preventive care, emergency medicine, and building lasting relationships with both pets and their families.",
    "When she's not caring for patients, Dr. Mitchell enjoys hiking with her two rescue dogs and volunteering at local animal shelters.",
  ];

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
          <div className="animate-slide-up">
            {description ? (
              <PortableText
                value={description}
                components={portableTextComponents}
              />
            ) : (
              // Fallback content
              <div className="space-y-6">
                {fallbackDescription.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
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
