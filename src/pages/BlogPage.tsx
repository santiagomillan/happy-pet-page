import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSection from "@/components/blog/BlogSection";
import { Helmet } from "react-helmet";

// Example blog data structure that would come from backend
const mockBlogData = {
  title: "Understanding Your Pet's Dental Health",
  author: "Dr. Sarah Mitchell",
  date: "March 15, 2024",
  readTime: "5 min read",
  sections: [
    {
      id: "intro",
      type: "text" as const,
      content: {
        text: "Dental health is one of the most overlooked aspects of pet care, yet it's crucial for your pet's overall wellbeing. Just like humans, pets can suffer from gum disease, tooth decay, and other oral health issues that can lead to serious complications if left untreated.",
      },
    },
    {
      id: "signs",
      type: "text-image" as const,
      content: {
        heading: "5 Warning Signs of Dental Disease",
        text: "Watch for these common indicators that your pet may need a dental checkup: bad breath, difficulty eating, pawing at the mouth, bleeding gums, and loose or discolored teeth. Early detection is key to preventing more serious issues down the line.",
        imageUrl: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
        imageAlt: "Veterinarian examining a dog's teeth",
        imagePosition: "right" as const,
      },
    },
    {
      id: "prevention",
      type: "text-image" as const,
      content: {
        heading: "Prevention is Better Than Treatment",
        text: "Regular brushing, dental chews, and annual professional cleanings can help prevent dental disease. Start dental care early in your pet's life to establish good habits. If your pet resists brushing, there are many alternative products available, from dental wipes to water additives.",
        imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
        imageAlt: "Pet dental care tools and toothbrush",
        imagePosition: "left" as const,
      },
    },
    {
      id: "video",
      type: "media" as const,
      content: {
        heading: "How to Brush Your Pet's Teeth",
        mediaType: "video" as const,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        caption: "Step-by-step guide to proper pet dental care at home",
      },
    },
    {
      id: "ad-1",
      type: "ad" as const,
      enabled: true,
      content: {
        text: "Schedule Your Pet's Dental Checkup Today",
        ctaText: "Book Appointment",
        ctaLink: "#contact",
      },
    },
    {
      id: "professional",
      type: "text" as const,
      content: {
        text: "Professional dental cleanings are essential, typically recommended annually. During these procedures, we remove tartar and plaque buildup, polish teeth, and check for any underlying issues. Some pets may require more frequent cleanings depending on their breed, age, and overall health.",
      },
    },
    {
      id: "conclusion-image",
      type: "media" as const,
      content: {
        mediaType: "image" as const,
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80",
        imageAlt: "Happy healthy dog smiling",
        caption: "A healthy smile leads to a happy pet",
      },
    },
  ],
};

const BlogPage = () => {
  const [blogData] = useState(mockBlogData);

  return (
    <>
      <Helmet>
        <title>{blogData.title} | Veterinary Care Blog</title>
        <meta name="description" content={blogData.sections[0]?.content?.text?.substring(0, 160)} />
        <meta property="og:title" content={blogData.title} />
        <meta property="og:description" content={blogData.sections[0]?.content?.text?.substring(0, 160)} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main>
          <article className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <header className="max-w-4xl mx-auto mb-12 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {blogData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="font-medium text-foreground">{blogData.author}</span>
                  <span>•</span>
                  <time dateTime={blogData.date}>{blogData.date}</time>
                  <span>•</span>
                  <span>{blogData.readTime}</span>
                </div>
              </header>

              <div className="max-w-4xl mx-auto space-y-12">
                {blogData.sections.map((section, index) => (
                  <BlogSection
                    key={section.id}
                    section={section}
                    index={index}
                  />
                ))}
              </div>

              <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-border">
                <p className="text-muted-foreground text-center">
                  Have questions about your pet's dental health?{" "}
                  <a href="#contact" className="text-primary hover:underline font-medium">
                    Contact us today
                  </a>
                </p>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
