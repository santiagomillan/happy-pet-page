import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
} from "lucide-react";
import logo from "@/assets/logo.png";

interface FooterProps {
  data?: {
    businessInfo?: {
      logo?: { alt?: string; asset?: { url?: string } };
      name?: string;
      description?: string;
    };
    contactInfo?: {
      address?: string;
      phone?: string;
      email?: string;
    };
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
      youtube?: string;
      tiktok?: string;
    };
    copyright?: string;
  };
}

const Footer = ({ data: footerData }: FooterProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Datos dinámicos con fallbacks
  const businessName = footerData?.businessInfo?.name || "Paws & Care";
  const businessDescription =
    footerData?.businessInfo?.description ||
    "Providing compassionate veterinary care for your beloved pets since 2009.";
  const businessLogo = footerData?.businessInfo?.logo?.asset?.url || logo;

  const address =
    footerData?.contactInfo?.address ||
    "123 Veterinary Lane\nPet City, PC 12345";
  const phone = footerData?.contactInfo?.phone || "(555) 123-4567";
  const email = footerData?.contactInfo?.email || "info@pawsandcare.com";

  const copyright =
    footerData?.copyright ||
    `© ${new Date().getFullYear()} Paws & Care Veterinary Clinic. All rights reserved.`;

  // Redes sociales - solo las que tienen URL
  const socialLinks = [
    {
      name: "Facebook",
      url: footerData?.socialLinks?.facebook,
      icon: Facebook,
      hoverColor: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "Instagram",
      url: footerData?.socialLinks?.instagram,
      icon: Instagram,
      hoverColor:
        "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
    },
    {
      name: "Twitter",
      url: footerData?.socialLinks?.twitter,
      icon: Twitter,
      hoverColor: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      name: "LinkedIn",
      url: footerData?.socialLinks?.linkedin,
      icon: Linkedin,
      hoverColor: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      name: "YouTube",
      url: footerData?.socialLinks?.youtube,
      icon: Youtube,
      hoverColor: "hover:bg-[#FF0000] hover:text-white",
    },
  ].filter((social) => social.url); // Solo mostrar las que tienen URL

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Business Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={businessLogo}
                alt={businessName}
                className="h-10 w-10"
              />
              <span className="text-lg font-bold text-foreground">
                {businessName}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              {businessDescription}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Enlaces rapidos
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Acerca de
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Informacion de contacto
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {address.split("\n").map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
              <li>{phone}</li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {email}
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Siguenos</h3>
            {socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`w-10 h-10 rounded-full bg-muted transition-all duration-300 flex items-center justify-center ${social.hoverColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Conéctate con nosotros en las redes sociales
              </p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
