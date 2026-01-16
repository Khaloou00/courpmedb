import { motion } from "framer-motion";
import { LayoutGrid, Table2, BarChart3, ImageIcon, ZoomIn, X } from "lucide-react";
import { Figure } from "@/data/courseData";
import { useState } from "react";

// Import all figures
import figProgramme from "@/assets/figures/fig-programme.jpg";
import figPortefeuille from "@/assets/figures/fig-portefeuille.jpg";
import figOpm from "@/assets/figures/fig-opm.jpg";
import figPmo from "@/assets/figures/fig-pmo.jpg";
import figStructures from "@/assets/figures/fig-structures.jpg";
import figLessons from "@/assets/figures/fig-lessons.jpg";
import figProcessus from "@/assets/figures/fig-processus.jpg";

interface FigureDisplayProps {
  figure: Figure;
}

// Mapping of figure IDs to imported images
const figureImages: { [key: string]: string } = {
  "fig-2-1": figProgramme,
  "fig-2-2": figPortefeuille,
  "fig-2-3": figOpm,
  "fig-2-4": figStructures,
  "fig-2-5": figLessons,
  "fig-3-1": figProcessus,
  "fig-pmo": figPmo,
  // Nouvelles figures ajoutées
  "fig-1-1": figProcessus, // Caractéristiques d'un Projet
  "fig-1-2": figProcessus, // Projets vs Opérations
  "fig-1-7": figStructures, // Contraintes du Projet
  "fig-1-8": figProcessus, // Parties Prenantes
  "fig-1-9": figOpm, // Facteurs Environnementaux
  "fig-1-11": figProcessus, // Cycle de Vie vs Processus
  "fig-2-2-start": figPortefeuille, // Démarrage
  "fig-2-3-plan": figProcessus, // Planification
  "fig-2-4-exec": figProcessus, // Exécution
  "fig-2-6": figProcessus, // Données de Performance
  "fig-2-7": figProcessus, // Clôture
  "fig-3-1-integration": figProcessus, // Gestion de l'Intégration
  "fig-3-2": figProcessus, // Charte du Projet
  "fig-3-3": figProcessus, // Diriger et Gérer
  "fig-4-1-plan": figProcessus, // Planification du Contenu
  "fig-5-1-plan": figProcessus, // Planification de l'Échéancier
  "fig-6-1": figProcessus, // Estimation des Coûts
  "fig-6-2": figProcessus, // Gestion de la Valeur Acquise
  "fig-7-1": figProcessus, // Planification de la Qualité
  "fig-8-1": figProcessus, // Gestion des Ressources Humaines
  "fig-9-1": figProcessus, // Planification des Communications
  "fig-10-1": figProcessus, // Identification des Risques
  "fig-10-2": figProcessus, // Stratégies de Réponse aux Risques
  "fig-11-1": figProcessus, // Planification des Approvisionnements
  "fig-13-1": figProcessus, // Code de Déontologie PMI
};

export function FigureDisplay({ figure }: FigureDisplayProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  
  const getIcon = () => {
    switch (figure.type) {
      case 'table':
        return <Table2 className="w-6 h-6 text-secondary" />;
      case 'chart':
        return <BarChart3 className="w-6 h-6 text-secondary" />;
      case 'image':
        return <ImageIcon className="w-6 h-6 text-secondary" />;
      default:
        return <LayoutGrid className="w-6 h-6 text-secondary" />;
    }
  };

  const hasImage = figure.imageUrl || figureImages[figure.id];
  const imageSrc = figure.imageUrl || figureImages[figure.id];

  const renderDiagramContent = () => {
    // If figure has an image, display it
    if (hasImage) {
      return (
        <div className="relative group">
          <img 
            src={imageSrc} 
            alt={figure.title}
            className="w-full rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setIsZoomed(true)}
          />
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
        </div>
      );
    }

    // Fallback to SVG diagrams for figures without images
    if (figure.id === "fig-2-1" || figure.id === "fig-2-2") {
      return (
        <div className="flex flex-col items-center py-6">
          <div className="w-32 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm mb-4">
            Portefeuille
          </div>
          <div className="w-0.5 h-6 bg-border" />
          <div className="flex gap-4 mb-4">
            <div className="w-28 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-medium text-sm">
              Programme A
            </div>
            <div className="w-28 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-medium text-sm">
              Programme B
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-14 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                Projet {i}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (figure.id === "fig-3-1") {
      return (
        <div className="relative h-40 py-4">
          <svg viewBox="0 0 400 120" className="w-full h-full">
            {/* Curves for each process group */}
            <path
              d="M 20 100 Q 60 20, 100 80"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M 60 100 Q 120 10, 180 70"
              stroke="hsl(var(--secondary))"
              strokeWidth="3"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M 100 100 Q 200 0, 300 60"
              stroke="hsl(var(--success))"
              strokeWidth="3"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M 40 95 Q 200 15, 360 95"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M 280 100 Q 340 30, 380 80"
              stroke="hsl(var(--destructive))"
              strokeWidth="3"
              fill="none"
              opacity="0.9"
            />
            
            {/* Labels */}
            <text x="50" y="115" fontSize="10" className="fill-foreground" opacity="0.7">Démarrage</text>
            <text x="120" y="115" fontSize="10" className="fill-foreground" opacity="0.7">Planification</text>
            <text x="200" y="115" fontSize="10" className="fill-foreground" opacity="0.7">Exécution</text>
            <text x="270" y="115" fontSize="10" className="fill-foreground" opacity="0.7">S&M</text>
            <text x="340" y="115" fontSize="10" className="fill-foreground" opacity="0.7">Clôture</text>
          </svg>
        </div>
      );
    }

    if (figure.id === "fig-2-4" || figure.type === 'table') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-3 text-left font-semibold">Structure</th>
                <th className="py-2 px-3 text-left font-semibold">Autorité du CP</th>
                <th className="py-2 px-3 text-left font-semibold">Ressources</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 px-3">Fonctionnelle</td>
                <td className="py-2 px-3 text-destructive">Faible</td>
                <td className="py-2 px-3">RF contrôle</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-3">Matricielle faible</td>
                <td className="py-2 px-3 text-warning">Faible à modérée</td>
                <td className="py-2 px-3">Partagé</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-3">Matricielle équilibrée</td>
                <td className="py-2 px-3 text-secondary">Modérée</td>
                <td className="py-2 px-3">Partagé</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-3">Matricielle forte</td>
                <td className="py-2 px-3 text-accent">Modérée à élevée</td>
                <td className="py-2 px-3">CP contrôle</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Par projets</td>
                <td className="py-2 px-3 text-success">Élevée</td>
                <td className="py-2 px-3">CP contrôle total</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    if (figure.id === "fig-4-1") {
      return (
        <div className="flex flex-col items-center py-6">
          <div className="w-48 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm mb-4">
            Projet: Nouveau Système
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-border" />
              <div className="w-32 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-medium text-xs mb-2">
                1.1 Analyse
              </div>
              <div className="flex gap-2">
                <div className="w-14 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  1.1.1
                </div>
                <div className="w-14 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  1.1.2
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-border" />
              <div className="w-32 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-medium text-xs mb-2">
                1.2 Design
              </div>
              <div className="flex gap-2">
                <div className="w-14 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  1.2.1
                </div>
                <div className="w-14 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  1.2.2
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-border" />
              <div className="w-32 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-medium text-xs mb-2">
                1.3 Dev
              </div>
              <div className="flex gap-2">
                <div className="w-14 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  1.3.1
                </div>
                <div className="w-14 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  1.3.2
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (figure.id === "fig-5-1") {
      return (
        <div className="flex items-center justify-center py-6">
          <svg viewBox="0 0 500 100" className="w-full max-w-lg h-24">
            {/* Nodes */}
            <circle cx="50" cy="50" r="25" className="fill-primary" />
            <text x="50" y="55" textAnchor="middle" className="fill-primary-foreground" fontSize="12">Start</text>
            
            <circle cx="150" cy="30" r="25" className="fill-secondary" />
            <text x="150" y="35" textAnchor="middle" className="fill-secondary-foreground" fontSize="12">A</text>
            
            <circle cx="150" cy="70" r="25" className="fill-secondary" />
            <text x="150" y="75" textAnchor="middle" className="fill-secondary-foreground" fontSize="12">B</text>
            
            <circle cx="250" cy="50" r="25" className="fill-accent" />
            <text x="250" y="55" textAnchor="middle" className="fill-accent-foreground" fontSize="12">C</text>
            
            <circle cx="350" cy="30" r="25" className="fill-secondary" />
            <text x="350" y="35" textAnchor="middle" className="fill-secondary-foreground" fontSize="12">D</text>
            
            <circle cx="350" cy="70" r="25" className="fill-accent" />
            <text x="350" y="75" textAnchor="middle" className="fill-accent-foreground" fontSize="12">E</text>
            
            <circle cx="450" cy="50" r="25" className="fill-success" />
            <text x="450" y="55" textAnchor="middle" className="fill-success-foreground" fontSize="12">Fin</text>
            
            {/* Arrows */}
            <path d="M75 45 L120 33" className="stroke-foreground" strokeWidth="2" fill="none" />
            <path d="M75 55 L120 67" className="stroke-foreground" strokeWidth="2" fill="none" />
            <path d="M175 30 L220 45" className="stroke-foreground" strokeWidth="2" fill="none" />
            <path d="M175 70 L220 55" className="stroke-foreground" strokeWidth="2" fill="none" />
            <path d="M275 45 L320 33" className="stroke-foreground" strokeWidth="2" fill="none" />
            <path d="M275 55 L320 67" className="stroke-foreground" strokeWidth="2" fill="none" />
            <path d="M375 30 L420 45" className="stroke-foreground" strokeWidth="2" fill="none" />
            <path d="M375 70 L420 55" className="stroke-foreground" strokeWidth="2" fill="none" />
          </svg>
        </div>
      );
    }

    if (figure.id === "fig-12-1") {
      return (
        <div className="flex flex-col items-center py-6">
          <div className="grid grid-cols-2 gap-1 w-64">
            <div className="aspect-square bg-destructive/20 border border-destructive/40 rounded-tl-lg flex items-center justify-center p-2 text-center text-xs">
              <span>Gérer de près</span>
            </div>
            <div className="aspect-square bg-warning/20 border border-warning/40 rounded-tr-lg flex items-center justify-center p-2 text-center text-xs">
              <span>Garder satisfait</span>
            </div>
            <div className="aspect-square bg-accent/20 border border-accent/40 rounded-bl-lg flex items-center justify-center p-2 text-center text-xs">
              <span>Garder informé</span>
            </div>
            <div className="aspect-square bg-muted border border-border rounded-br-lg flex items-center justify-center p-2 text-center text-xs">
              <span>Surveiller</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>← Faible Pouvoir — Élevé →</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ↑ Faible Intérêt — Élevé ↓
          </div>
        </div>
      );
    }

    // Default diagram placeholder
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-48 h-32 rounded-lg bg-muted/50 flex items-center justify-center">
          <LayoutGrid className="w-12 h-12 text-muted-foreground/50" />
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
          {getIcon()}
          <div>
            <h4 className="font-semibold">{figure.title}</h4>
            <p className="text-sm text-muted-foreground">{figure.description}</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {renderDiagramContent()}
        </div>
      </motion.div>

      {/* Zoom modal */}
      {isZoomed && hasImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={imageSrc}
            alt={figure.title}
            className="max-w-full max-h-[90vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
}
