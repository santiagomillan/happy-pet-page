interface TextSectionProps {
  content: {
    heading?: string;
    text: string;
  };
}

const TextSection = ({ content }: TextSectionProps) => {
  return (
    <section className="prose prose-lg max-w-none">
      {content.heading && (
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {content.heading}
        </h2>
      )}
      <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">
        {content.text}
      </p>
    </section>
  );
};

export default TextSection;
