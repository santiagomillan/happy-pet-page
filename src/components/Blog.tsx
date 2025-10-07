import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "5 Signs Your Pet Needs a Dental Cleaning",
    excerpt: "Learn to recognize the warning signs of dental disease and when to schedule a professional cleaning for your furry friend.",
    date: "March 15, 2024",
    category: "Dental Health",
  },
  {
    title: "Spring Allergies in Pets: What to Watch For",
    excerpt: "Discover common allergy symptoms in dogs and cats and how to help your pet find relief during allergy season.",
    date: "March 10, 2024",
    category: "Seasonal Care",
  },
  {
    title: "Nutrition Tips for Senior Pets",
    excerpt: "As pets age, their nutritional needs change. Find out how to adjust your senior pet's diet for optimal health.",
    date: "March 5, 2024",
    category: "Nutrition",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Pet Health Blog
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert advice and tips for keeping your pets happy and healthy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={post.title}
              className="border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-accent text-foreground rounded-full mb-3 w-fit">
                  {post.category}
                </span>
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {post.excerpt}
                </CardDescription>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
                  asChild
                >
                  <a href="/blog/dental-health">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-2" asChild>
            <a href="/blog">View All Articles</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
