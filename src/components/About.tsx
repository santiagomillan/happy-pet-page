import { Heart, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Meet Dr. Sarah Mitchell
          </h2>
          <p className="text-lg text-muted-foreground">
            Your Trusted Partner in Pet Healthcare
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <p className="text-lg text-foreground leading-relaxed">
              With over 15 years of experience in veterinary medicine, Dr. Sarah Mitchell has dedicated her career to providing exceptional care for animals of all kinds. Her passion for animal welfare began in childhood and has only grown stronger through years of practice.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Dr. Mitchell believes in treating every pet as if they were her own, combining advanced medical expertise with genuine compassion. She specializes in preventive care, emergency medicine, and building lasting relationships with both pets and their families.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              When she's not caring for patients, Dr. Mitchell enjoys hiking with her two rescue dogs and volunteering at local animal shelters.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-card p-6 rounded-lg shadow-card border border-border animate-scale-in">
              <Heart className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Compassionate Care</h3>
              <p className="text-muted-foreground">
                Every pet receives individualized attention and gentle treatment tailored to their unique needs.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card border border-border animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Certified Excellence</h3>
              <p className="text-muted-foreground">
                Board-certified with continuous education in the latest veterinary advances and techniques.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card border border-border animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <Clock className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Always Available</h3>
              <p className="text-muted-foreground">
                Extended hours and emergency services to ensure your pet gets care when they need it most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
