import { Instagram, Facebook, Twitter } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border px-6 md:px-12 lg:px-24 py-16">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-4">
        <span className="font-display text-xl tracking-wider text-foreground">
          TANDAV <span className="text-gradient-copper">CAFÉ</span>
        </span>
        <p className="text-sm text-muted-foreground font-body">
          Where every sip tells a story.
        </p>
        <div className="flex gap-4">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="label-sm mb-4 text-foreground">Quick Links</p>
        <div className="space-y-2">
          {["Menu", "Our Story", "Origins", "Reserve"].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">
              {link}
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="label-sm mb-4 text-foreground">Hours</p>
        <div className="space-y-2 text-sm text-muted-foreground font-body">
          <p>Mon — Fri: 7AM – 11PM</p>
          <p>Sat — Sun: 8AM – 12AM</p>
        </div>
      </div>

      <div>
        <p className="label-sm mb-4 text-foreground">Contact</p>
        <div className="space-y-2 text-sm text-muted-foreground font-body">
          <p>42 Artisan Lane, CP</p>
          <p>New Delhi, 110001</p>
          <p>hello@tandavcafe.com</p>
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border text-center">
      <p className="text-xs text-muted-foreground font-body">
        © 2024 Tandav Café. All rights reserved.
      </p>
    </div>
  </footer>
);

export default FooterSection;
