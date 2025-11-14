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
import BookAppointment from "@/components/BookAppointment";

const Index = () => {
  const { data, errors, isLoading } = useSiteData();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <Header title={data?.title} menuItems={data?.menuItems} />
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

        {/* Google Calendar - Opcional desde Sanity */}
        <BookAppointment />
        {/* {data?.agendaSection?.enabled && (
          <ErrorBoundary sectionName="Calendar">
            <section id="agenda" className="py-20 bg-background">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">
                  {data?.agendaSection?.title || "Agenda tu Cita"}
                </h2>
                <div className="max-w-5xl mx-auto">
                  <iframe
                    src={
                      data?.agendaSection?.agendaLink ||
                      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0PDh9sjuV2dCuW2JLJOFm6I0ctN2yQXJofHZGsvRZUtrONfQhp9yxoZFTstiVIadteRlKhhuSf?gv=true"
                    }
                    style={{ border: 0 }}
                    width="100%"
                    height={data?.agendaSection?.height || 600}
                    frameBorder="0"
                    title="Google Calendar Appointment Scheduling"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </ErrorBoundary>
        )} */}

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
