import TextSection from "./TextSection";
import TextWithImageSection from "./TextWithImageSection";
import MediaSection from "./MediaSection";
import AdSection from "./AdSection";

interface BlogSectionProps {
  section: {
    id: string;
    type: "text" | "text-image" | "media" | "ad";
    enabled?: boolean;
    content: any;
  };
  index: number;
}

const BlogSection = ({ section, index }: BlogSectionProps) => {
  // Don't render disabled ad sections
  if (section.type === "ad" && !section.enabled) {
    return null;
  }

  const animationDelay = `${index * 0.1}s`;

  switch (section.type) {
    case "text":
      return (
        <div
          className="animate-fade-in"
          style={{ animationDelay }}
        >
          <TextSection content={section.content} />
        </div>
      );

    case "text-image":
      return (
        <div
          className="animate-scale-in"
          style={{ animationDelay }}
        >
          <TextWithImageSection content={section.content} />
        </div>
      );

    case "media":
      return (
        <div
          className="animate-fade-in"
          style={{ animationDelay }}
        >
          <MediaSection content={section.content} />
        </div>
      );

    case "ad":
      return (
        <div
          className="animate-scale-in"
          style={{ animationDelay }}
        >
          <AdSection content={section.content} />
        </div>
      );

    default:
      return null;
  }
};

export default BlogSection;
