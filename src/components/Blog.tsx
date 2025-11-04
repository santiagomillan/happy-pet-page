import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogProps {
  data?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    viewAllButton?: string;
    blogPageLink?: string;
  };
  posts?: Array<{
    _id: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    publishedAt?: string;
    featuredImage?: {
      alt?: string;
      asset?: {
        _id?: string;
        url?: string;
      };
    };
    author?: {
      name?: string;
      image?: {
        alt?: string;
        asset?: {
          _id?: string;
          url?: string;
        };
      };
    };
    bodyPreview?: string;
    tags?: Array<{ title?: string }>;
  }>;
}

const Blog = ({ data: blogData, posts = [] }: BlogProps) => {
  const title = blogData?.title || "Pet Health Blog";
  const subtitle =
    blogData?.subtitle ||
    "Expert advice and tips for keeping your pets happy and healthy";

  return (
    <section id="blog" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.length > 0 ? (
            posts.map((post, index: number) => (
              <Card
                key={post._id}
                className="border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {post.featuredImage?.asset?.url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage.asset.url}
                      alt={post.featuredImage.alt || post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(
                              "es-ES",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Sin fecha"}
                      </span>
                    </div>

                    {post.author?.name && (
                      <div className="flex items-center gap-2">
                        {post.author.image?.asset?.url ? (
                          <img
                            src={post.author.image.asset.url}
                            alt={post.author.name}
                            className="w-4 h-4 rounded-full object-cover border border-muted/50"
                            loading="lazy"
                          />
                        ) : (
                          <User className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span>{post.author.name}</span>
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-xl line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base mb-4 line-clamp-3">
                    {post.excerpt || post.bodyPreview}
                  </CardDescription>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags
                        .slice(0, 3)
                        .map((tag: { title: string }, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                          >
                            #{tag.title}
                          </span>
                        ))}
                    </div>
                  )}

                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    asChild
                  >
                    <Link
                      to={`/blog/${post.slug || post._id}`}
                      className="inline-flex items-center"
                    >
                      Leer más <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Próximamente nuevos artículos
                </h3>
                <p className="text-muted-foreground">
                  Estamos preparando contenido valioso sobre salud animal.
                  ¡Vuelve pronto!
                </p>
              </div>
            </div>
          )}
        </div>

        {posts.length > 3 && (
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-2" asChild>
              <Link to={blogData?.blogPageLink || "/blog"}>
                {blogData?.viewAllButton || "View All Articles"}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
