import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import { Helmet } from "react-helmet";

// Mock blog data - in production, this would come from backend
const mockBlogPosts = [
  {
    id: "dental-health",
    slug: "dental-health",
    title: "Understanding Your Pet's Dental Health",
    excerpt: "Dental health is one of the most overlooked aspects of pet care, yet it's crucial for your pet's overall wellbeing.",
    date: "March 15, 2024",
    category: "Dental Health",
    imageUrl: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
  },
  {
    id: "spring-allergies",
    slug: "spring-allergies",
    title: "Spring Allergies in Pets: What to Watch For",
    excerpt: "Discover common allergy symptoms in dogs and cats and how to help your pet find relief during allergy season.",
    date: "March 10, 2024",
    category: "Seasonal Care",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  },
  {
    id: "senior-nutrition",
    slug: "senior-nutrition",
    title: "Nutrition Tips for Senior Pets",
    excerpt: "As pets age, their nutritional needs change. Find out how to adjust your senior pet's diet for optimal health.",
    date: "March 5, 2024",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  },
  {
    id: "emergency-care",
    slug: "emergency-care",
    title: "Emergency Care: When to Rush Your Pet to the Vet",
    excerpt: "Learn to recognize critical signs that require immediate veterinary attention and how to prepare for emergencies.",
    date: "February 28, 2024",
    category: "Emergency Care",
    imageUrl: "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=800&q=80",
  },
  {
    id: "vaccination-guide",
    slug: "vaccination-guide",
    title: "Complete Vaccination Guide for Puppies and Kittens",
    excerpt: "Everything you need to know about vaccinating your new pet, from core vaccines to optional immunizations.",
    date: "February 20, 2024",
    category: "Preventive Care",
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80",
  },
  {
    id: "grooming-tips",
    slug: "grooming-tips",
    title: "Professional Grooming Tips for Home Care",
    excerpt: "Maintain your pet's coat, nails, and hygiene with these expert grooming techniques you can do at home.",
    date: "February 15, 2024",
    category: "Grooming",
    imageUrl: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&q=80",
  },
];

const BlogListPage = () => {
  const [isLoading] = useState(false);
  const [blogPosts] = useState(mockBlogPosts);

  return (
    <>
      <Helmet>
        <title>Pet Health Blog | Expert Veterinary Advice & Tips</title>
        <meta 
          name="description" 
          content="Browse our collection of veterinary articles covering pet health, nutrition, preventive care, and wellness tips from experienced veterinarians." 
        />
        <meta property="og:title" content="Pet Health Blog | Expert Veterinary Advice" />
        <meta property="og:description" content="Expert veterinary articles and tips for keeping your pets healthy and happy" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Pet Health Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Expert advice and tips for keeping your pets happy and healthy
              </p>
            </header>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    category={post.category}
                    imageUrl={post.imageUrl}
                    slug={post.slug}
                    animationDelay={`${index * 0.1}s`}
                  />
                ))}
              </div>
            )}

            {!isLoading && blogPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No blog posts available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogListPage;
