import { motion } from "framer-motion";
import { BookOpen, Clock, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courseInfo } from "@/data/courseData";

interface HeroSectionProps {
  onStartCourse: () => void;
}

export function HeroSection({ onStartCourse }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container relative z-10 px-4 py-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/30 mb-8"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Certification PMP® Officielle</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {courseInfo.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {courseInfo.subtitle}
          </motion.p>

          <motion.p 
            className="text-base text-white/60 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {courseInfo.author}
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {courseInfo.description}
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">{courseInfo.totalChapters}</p>
                <p className="text-sm text-white/60">Chapitres</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">{courseInfo.estimatedTime}</p>
                <p className="text-sm text-white/60">De formation</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">Quiz</p>
                <p className="text-sm text-white/60">Interactifs</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onStartCourse}
              className="group"
            >
              Commencer la Formation
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              onClick={onStartCourse}
              className="group"
            >
              Voir le Programme
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
