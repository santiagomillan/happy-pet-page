import { useState } from "react";

interface MediaSectionProps {
  content: {
    heading?: string;
    mediaType: "image" | "video";
    imageUrl?: string;
    imageAlt?: string;
    videoUrl?: string;
    caption?: string;
  };
}

const MediaSection = ({ content }: MediaSectionProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="space-y-4">
      {content.heading && (
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          {content.heading}
        </h2>
      )}

      <figure className="w-full">
        {content.mediaType === "image" && content.imageUrl ? (
          <div className="relative w-full">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse rounded-lg aspect-video" />
            )}
            <img
              src={content.imageUrl}
              alt={content.imageAlt || ""}
              loading="lazy"
              className={`w-full h-auto rounded-lg shadow-card transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ) : content.mediaType === "video" && content.videoUrl ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-card">
            <iframe
              src={content.videoUrl}
              title={content.heading || "Video content"}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : null}

        {content.caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
            {content.caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default MediaSection;
