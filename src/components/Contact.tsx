import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";

const CONTACT_QUERY = `*[_type == "siteSettings"][0].contactSection{
  enabled,
  title,
  subtitle,
  contactInfo{
    address,
    phone,
    email,
    schedule[]{
      days,
      hours
    }
  }
}`;

const Contact = () => {
  const { toast } = useToast();
  const [contactData, setContactData] = useState<SanityDocument | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fetch contact data from Sanity
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await client.fetch<SanityDocument>(CONTACT_QUERY);
        setContactData(data);
      } catch (err) {
        console.error("Error fetching contact data:", err);
      }
    };

    fetchContactData();
  }, []);

  const title = contactData?.title || "Get In Touch";
  const subtitle =
    contactData?.subtitle ||
    "We're here to answer your questions and schedule appointments";
  const contactInfo = contactData?.contactInfo;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-slide-up">
            {/* Address */}
            {contactInfo?.address && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Address
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            )}

            {/* Phone */}
            {contactInfo?.phone && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground">{contactInfo.phone}</p>
                </div>
              </div>
            )}

            {/* Email */}
            {contactInfo?.email && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">{contactInfo.email}</p>
                </div>
              </div>
            )}

            {/* Schedule */}
            {contactInfo?.schedule && contactInfo.schedule.length > 0 && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                  <div className="text-muted-foreground space-y-1">
                    {contactInfo.schedule.map(
                      (
                        item: { days: string; hours: string },
                        index: number
                      ) => (
                        <p key={index}>
                          {item.days}: {item.hours}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-lg overflow-hidden shadow-card border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98823492346592!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1710432000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paws & Care Clinic Location"
              ></iframe>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-scale-in">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[150px]"
                placeholder="Tell us how we can help your pet..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
