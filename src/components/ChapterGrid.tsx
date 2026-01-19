import { motion } from "framer-motion";
import { ChevronRight, Clock, CheckCircle } from "lucide-react";
import { chapters, Chapter } from "@/data/courseData";

interface ChapterGridProps {
  onSelectChapter: (chapter: Chapter) => void;
  completedChapters?: number[];
}

export function ChapterGrid({
  onSelectChapter,
  completedChapters = [],
}: ChapterGridProps) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Programme de Formation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {chapters.length} chapitres structurés pour maîtriser tous les
            domaines de connaissance du PMP
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const isCompleted = completedChapters.includes(chapter.id);
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => onSelectChapter(chapter)}
                  className="chapter-card w-full text-left group overflow-hidden relative"
                >
                  {/* Banner */}
                  <div
                    className="absolute top-0 left-0 right-0 h-28 rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background:
                        chapter.banner ||
                        "linear-gradient(135deg, hsl(220 70% 35%) 0%, hsl(220 60% 25%) 100%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent rounded-t-xl" />
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20.5V18H0v-2h20v-4H0v-2h20v-4H0v-2h20v-4H0V0h22v20.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>

                  {/* Chapter number badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 z-20 shadow-lg">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-sm font-bold text-white">
                        {chapter.id}
                      </span>
                    )}
                  </div>

                  {/* Icon - positioned in banner area */}
                  <div className="text-4xl mb-4 relative z-10 mt-2">
                    {chapter.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-white mb-2 text-center group-hover:bg-gradient-to-r group-hover:from-[#DAA520] group-hover:via-[#FFD700] group-hover:to-[#B8860B] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 relative z-10">
                    {chapter.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 relative z-10">
                    {chapter.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{chapter.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Lire</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Progress bar */}
                  {isCompleted && (
                    <div className="progress-indicator mt-4">
                      <div className="progress-indicator-fill w-full" />
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
