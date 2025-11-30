import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Leaf, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useTextSize } from "@/contexts/TextSizeContext";

interface SearchSectionProps {
  onSearch: (query: string, type: 'plant' | 'disease') => void;
  isLoading: boolean;
}

export const SearchSection = ({ onSearch, isLoading }: SearchSectionProps) => {
  const [plantQuery, setPlantQuery] = useState("");
  const [diseaseQuery, setDiseaseQuery] = useState("");
  const { getTextSizeClass } = useTextSize();

  const handlePlantSearch = () => {
    if (plantQuery.trim()) {
      onSearch(plantQuery.trim(), 'plant');
    }
  };

  const handleDiseaseSearch = () => {
    if (diseaseQuery.trim()) {
      onSearch(diseaseQuery.trim(), 'disease');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'plant' | 'disease') => {
    if (e.key === 'Enter') {
      if (type === 'plant') {
        handlePlantSearch();
      } else {
        handleDiseaseSearch();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-card rounded-2xl p-8 shadow-garden border border-border/50 mb-12"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Plant Search */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h3 className={`text-xl font-semibold text-foreground text-scalable-lg`}>
              Search Plants
            </h3>
          </div>
          <p className={`text-muted-foreground mb-4 text-scalable ${getTextSizeClass()}`}>
            Find specific medicinal plants and herbs by their common or scientific names
          </p>
          <div className="flex gap-3">
            <Input
              placeholder="e.g., Aloe Vera, Turmeric, Lavender..."
              value={plantQuery}
              onChange={(e) => setPlantQuery(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'plant')}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
            />
            <Button
              onClick={handlePlantSearch}
              disabled={!plantQuery.trim() || isLoading}
              variant="default"
              size="icon"
              className="bg-gradient-search shadow-card-soft hover:shadow-garden transition-all duration-300"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Disease Search */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Heart className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className={`text-xl font-semibold text-foreground text-scalable-lg`}>
              Search by Condition
            </h3>
          </div>
          <p className={`text-muted-foreground mb-4 text-scalable ${getTextSizeClass()}`}>
            Discover plants that can help with specific health conditions or symptoms
          </p>
          <div className="flex gap-3">
            <Input
              placeholder="e.g., Headache, Anxiety, Burns..."
              value={diseaseQuery}
              onChange={(e) => setDiseaseQuery(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'disease')}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
            />
            <Button
              onClick={handleDiseaseSearch}
              disabled={!diseaseQuery.trim() || isLoading}
              variant="secondary"
              size="icon"
              className="shadow-card-soft hover:shadow-garden transition-all duration-300"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Searching our botanical database...
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};