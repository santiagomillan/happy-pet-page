import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  slug: string;
  animationDelay?: string;
}

const BlogCard = ({ title, excerpt, date, category, imageUrl, slug, animationDelay = "0s" }: BlogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      className="border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in overflow-hidden"
      style={{ animationDelay }}
    >
      {imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-accent text-foreground rounded-full mb-3 w-fit">
          {category}
        </span>
        <CardTitle className="text-xl hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-4">
          {excerpt}
        </CardDescription>
        <Button 
          variant="link" 
          className="p-0 h-auto text-primary"
          asChild
        >
          <a href={`/blog/${slug}`}>
            Read More <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
