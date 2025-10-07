import { Stethoscope, Syringe, Activity, Scissors, AlertCircle, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Stethoscope,
    title: "Wellness Check-ups",
    description: "Comprehensive physical examinations to keep your pet healthy and detect issues early.",
    color: "text-primary",
  },
  {
    icon: Syringe,
    title: "Vaccinations",
    description: "Essential vaccines to protect your pets from preventable diseases and illnesses.",
    color: "text-secondary",
  },
  {
    icon: Activity,
    title: "Surgical Services",
    description: "Advanced surgical procedures performed with precision and care in our modern facility.",
    color: "text-accent",
  },
  {
    icon: Scissors,
    title: "Grooming & Care",
    description: "Professional grooming services to keep your pets clean, comfortable, and looking their best.",
    color: "text-primary",
  },
  {
    icon: AlertCircle,
    title: "Emergency Care",
    description: "24/7 emergency services for urgent medical situations requiring immediate attention.",
    color: "text-destructive",
  },
  {
    icon: Heart,
    title: "Dental Care",
    description: "Complete dental services including cleanings, extractions, and oral health maintenance.",
    color: "text-secondary",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Veterinary Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive care for every stage of your pet's life
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-4">
                    <Icon className={`w-12 h-12 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
