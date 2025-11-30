import { motion } from "framer-motion";
import { PlantCard } from "./PlantCard";
import { useTextSize } from "@/contexts/TextSizeContext";
import type { Plant } from "./GardenInterface";

interface PlantGridProps {
  plants: Plant[];
  onPlantSelect: (plant: Plant) => void;
  searchQuery: string;
}

export const PlantGrid = ({ plants, onPlantSelect, searchQuery }: PlantGridProps) => {
  const { getTextSizeClass } = useTextSize();

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className={`text-2xl font-semibold text-foreground mb-2 text-scalable-xl`}>
          Search Results
        </h2>
        <p className={`text-muted-foreground text-scalable ${getTextSizeClass()}`}>
          Found {plants.length} {plants.length === 1 ? 'plant' : 'plants'} 
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </motion.div>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant, index) => (
          <motion.div
            key={plant.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ y: -8 }}
            className="h-full"
          >
            <PlantCard 
              plant={plant}
              onClick={() => onPlantSelect(plant)}
            />
          </motion.div>
        ))}
      </div>

      {plants.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center py-16"
        >
          <div className="bg-muted/50 rounded-2xl p-8 border border-border/50">
            <h3 className={`text-xl font-semibold text-foreground mb-2 text-scalable-lg`}>
              No plants found
            </h3>
            <p className={`text-muted-foreground text-scalable ${getTextSizeClass()}`}>
              Try adjusting your search terms or browse our complete collection
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};