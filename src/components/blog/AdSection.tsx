import { Button } from "@/components/ui/button";

interface AdSectionProps {
  content: {
    text: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

const AdSection = ({ content }: AdSectionProps) => {
  return (
    <aside
      className="my-12 p-8 bg-gradient-accent rounded-lg shadow-soft text-center"
      aria-label="Advertisement"
    >
      <p className="text-xl sm:text-2xl font-bold text-foreground mb-6">
        {content.text}
      </p>
      {content.ctaText && content.ctaLink && (
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <a href={content.ctaLink}>{content.ctaText}</a>
        </Button>
      )}
    </aside>
  );
};

export default AdSection;
