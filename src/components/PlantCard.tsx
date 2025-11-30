import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Leaf, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import type { Plant } from "./GardenInterface";

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
}

export const PlantCard = ({ plant, onClick }: PlantCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        y: -12, 
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
    >
      <Card 
        className="h-full bg-gradient-card border-border/50 shadow-card-soft hover:shadow-garden cursor-pointer group overflow-hidden hover:border-green-400/50 transition-all duration-500"
      >
      {/* Plant Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <motion.img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover"
          whileHover={{ 
            scale: 1.2,
            rotate: 2,
            filter: "brightness(1.1) saturate(1.2)"
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onError={(e) => {
            // Fallback to a beautiful placeholder
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%234ade80'/%3E%3Cstop offset='100%25' stop-color='%2322c55e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23a)'/%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M100 40c-8 0-15 3-20 8-5-5-12-8-20-8-16 0-30 14-30 30 0 20 30 50 50 50s50-30 50-50c0-16-14-30-30-30z'/%3E%3Cpath d='M100 160l-10-30h20l-10 30z'/%3E%3C/g%3E%3C/svg%3E";
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-green-400/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full text-sm"
          initial={{ scale: 0, rotate: -180 }}
          whileHover={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          ✨
        </motion.div>
        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground border-border/50">
          {plant.category}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {plant.name}
          </h3>
          <p className="text-sm text-muted-foreground italic">
            {plant.scientificName}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {plant.description}
        </p>

        {/* Medicinal Uses */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Medicinal Uses</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {plant.medicinalUses.slice(0, 3).map((use, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary-foreground border-primary/20"
              >
                {use}
              </Badge>
            ))}
            {plant.medicinalUses.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{plant.medicinalUses.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Active Compounds */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-foreground">Key Compounds</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {plant.activeCompounds.slice(0, 2).map((compound, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="text-xs bg-accent/10 text-accent-foreground border-accent/20"
              >
                {compound}
              </Badge>
            ))}
            {plant.activeCompounds.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{plant.activeCompounds.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* View Details Indicator */}
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center group-hover:text-primary transition-colors duration-300">
            Click to view 3D model and detailed information →
          </p>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
};