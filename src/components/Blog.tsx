import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

// Query optimizada para obtener posts del blog desde Sanity
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  category->{
    title
  },
    author->{
    name,
    image{
      alt,
      asset->{_id, url}
    }
  },
  "bodyPreview": pt::text(body)[0...150] + "...",
  tags[]->{ title, slug }
}`;

const Blog = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false); // ⚡ Cambiar a false inicial
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // ⚡ Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px", // Cargar 50px antes de que sea visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // ⚡ Fetch data solo cuando la sección es visible
  useEffect(() => {
    if (!isVisible) return;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // ⚡ Cache con stale-while-revalidate pattern
        const cacheKey = "blog-posts";
        const cachedData = sessionStorage.getItem(cacheKey);
        const cacheTimestamp = sessionStorage.getItem(`${cacheKey}-timestamp`);
        const now = Date.now();
        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

        // Si hay cache válido, usarlo primero
        if (
          cachedData &&
          cacheTimestamp &&
          now - parseInt(cacheTimestamp) < CACHE_DURATION
        ) {
          setPosts(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }

        const fetchedPosts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

        // ⚡ Guardar en cache
        sessionStorage.setItem(cacheKey, JSON.stringify(fetchedPosts));
        sessionStorage.setItem(`${cacheKey}-timestamp`, now.toString());

        setPosts(fetchedPosts);
      } catch (err) {
        console.error("❌ Error fetching posts:", err);

        // ⚡ Manejo específico de errores
        if (err instanceof Error) {
          if (err.message.includes("CORS")) {
            setError(
              "Problema de configuración. Estamos trabajando para solucionarlo."
            );
          } else if (err.message.includes("fetch")) {
            setError("Problema de conexión. Verifica tu internet.");
          } else {
            setError("Error temporal del servidor. Intenta en unos minutos.");
          }
        } else {
          setError("Error inesperado. Intenta recargar la página.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [isVisible]);
  return (
    <section id="blog" className="py-20 bg-muted/30" ref={sectionRef}>
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
          {isLoading ? (
            // Skeleton loading
            [...Array(3)].map((_, index) => (
              <Card key={index} className="border-border animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            // Error state - Sin contenido quemado
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No pudimos cargar los artículos
                </h3>
                <p className="text-muted-foreground mb-4">
                  Parece que hay un problema con la conexión. Intenta recargar
                  la página.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="mr-2"
                >
                  Reintentar
                </Button>
                <Button asChild variant="link">
                  <Link to="/">Volver al inicio</Link>
                </Button>
              </div>
            </div>
          ) : posts.length > 0 ? (
            // Render Sanity posts optimizado
            posts.map((post, index) => (
              <Card
                key={post._id}
                className="border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* ⚡ Imagen lazy loading*/}
                {/* {post.author && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`${post.author.image.asset?.url}`}
                      alt={post.imageAlt || post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )} */}

                <CardHeader className="pb-3">
                  {/* ⚡ Metadatos mejorados - Alineados en una sola línea */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    {/* Fecha */}
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

                    {/* Autor */}
                    {post.author?.name && (
                      <div className="flex items-center gap-2">
                        {post.author?.image ? (
                          <img
                            src={post.author.image.asset?.url}
                            alt={post.author.name}
                            className="w-4 h-4 rounded-full object-cover border border-muted/50"
                            loading="lazy"
                            onError={(e) => {
                              // Reemplazar con User icon cuando falla
                              const img = e.target as HTMLImageElement;
                              const userIcon = document.createElement("div");
                              userIcon.innerHTML =
                                '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                              img.parentNode?.replaceChild(userIcon, img);
                            }}
                          />
                        ) : (
                          <User className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span>{post.author.name}</span>
                      </div>
                    )}

                    {/* Tiempo de lectura (opcional) */}
                    {/* {post.estimatedReadingTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.estimatedReadingTime} min</span>
                      </div>
                    )} */}
                  </div>

                  {/* ⚡ Categoría con color dinámico */}
                  {post.category && (
                    <span className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-3 w-fit bg-emerald-500">
                      {post.category.title}
                    </span>
                  )}

                  <CardTitle className="text-xl  line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base mb-4 line-clamp-3">
                    {
                      post.excerpt || post.bodyPreview
                      // ||
                      // "Descubre más sobre este interesante tema de salud animal."
                    }
                  </CardDescription>

                  {/* ⚡ Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags
                        .slice(0, 3)
                        .map(
                          (
                            tag: { title: string; slug: { current: string } },
                            tagIndex: number
                          ) => (
                            <span
                              key={tagIndex}
                              className="inline-block px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                            >
                              #{tag.title}
                            </span>
                          )
                        )}
                    </div>
                  )}

                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    asChild
                  >
                    <Link
                      to={`/blog/${post.slug?.current || post._id}`}
                      className="inline-flex items-center"
                    >
                      Leer más <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            // Empty state - No posts available
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

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-2" asChild>
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
