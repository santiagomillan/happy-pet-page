import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingScreen from "@/components/LoadingScreen";
import { useSiteData } from "@/hooks/use-site-data";

const Index = () => {
  const { data, errors, isLoading } = useSiteData();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        {data?.heroSection?.enabled !== false && (
          <ErrorBoundary sectionName="Hero">
            <Hero data={data?.heroSection} />
          </ErrorBoundary>
        )}

        {/* About Section */}
        {data?.aboutSection?.enabled !== false && (
          <ErrorBoundary sectionName="About">
            <About data={data?.aboutSection} />
          </ErrorBoundary>
        )}

        {/* Services Section */}
        {data?.servicesSection?.enabled !== false && (
          <ErrorBoundary sectionName="Services">
            <Services data={data?.servicesSection} />
          </ErrorBoundary>
        )}

        {/* Blog Section */}
        {data?.blogSection?.enabled !== false && (
          <ErrorBoundary sectionName="Blog">
            <Blog data={data?.blogSection} posts={data?.posts} />
          </ErrorBoundary>
        )}

        {/* Contact Section */}
        {data?.contactSection?.enabled !== false && (
          <ErrorBoundary sectionName="Contact">
            <Contact data={data?.contactSection} />
          </ErrorBoundary>
        )}
      </main>

      {/* Footer Section */}
      {data?.footerSection?.enabled !== false && (
        <ErrorBoundary sectionName="Footer">
          <Footer data={data?.footerSection} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Index;
