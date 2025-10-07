import { useState } from "react";

interface TextWithImageSectionProps {
  content: {
    heading?: string;
    text: string;
    imageUrl: string;
    imageAlt: string;
    imagePosition: "left" | "right";
  };
}

const TextWithImageSection = ({ content }: TextWithImageSectionProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isImageLeft = content.imagePosition === "left";

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div className={isImageLeft ? "md:order-2" : ""}>
        {content.heading && (
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {content.heading}
          </h2>
        )}
        <p className="text-lg text-foreground leading-relaxed">
          {content.text}
        </p>
      </div>

      <div className={`relative ${isImageLeft ? "md:order-1" : ""}`}>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
        )}
        <img
          src={content.imageUrl}
          alt={content.imageAlt}
          loading="lazy"
          className={`w-full h-auto rounded-lg shadow-card transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </section>
  );
};

export default TextWithImageSection;
