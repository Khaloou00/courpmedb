import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import logoDB from "@/assets/LogoDB.png";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
                <img 
                  src={logoDB} 
                  alt="Decide and Build" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-xl font-bold text-white">PMP Prep</span>
            </div>
            <p className="text-sidebar-foreground/70 text-sm">
              Formation complète pour réussir votre certification PMP du premier coup.
              Basée sur le best-seller de Rita Mulcahy.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-sidebar-foreground/70 hover:text-secondary transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Guide PMBOK
                </a>
              </li>
              <li>
                <a href="#" className="text-sidebar-foreground/70 hover:text-secondary transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  PMI.org
                </a>
              </li>
              <li>
                <a href="#" className="text-sidebar-foreground/70 hover:text-secondary transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  RMC Learning Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <a 
              href="mailto:contact@decideandbuild.ci" 
              className="text-sidebar-foreground/70 hover:text-secondary transition-colors flex items-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4" />
              contact@decideandbuild.ci
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sidebar-border">
          <p className="text-center text-sidebar-foreground/50 text-sm">
            © 2024 PMP Prep. Contenu basé sur "Préparation à l'Examen PMP" par Rita Mulcahy.
            PMP est une marque déposée du Project Management Institute.
          </p>
        </div>
      </div>
    </footer>
  );
}
