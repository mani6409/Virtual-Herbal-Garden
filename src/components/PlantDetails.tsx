import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, FlaskConical, Heart, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Plant, HighlightedPart } from "./GardenInterface";

interface PlantDetailsProps {
  plant: Plant;
  onBack: () => void;
}

export const PlantDetails = ({ plant, onBack }: PlantDetailsProps) => {
  const [selectedPart, setSelectedPart] = useState<HighlightedPart | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <Button
          onClick={onBack}
          variant="outline"
          size="icon"
          className="shadow-card-soft hover:shadow-garden transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{plant.name}</h1>
          <p className="text-muted-foreground italic">{plant.scientificName}</p>
        </div>
        <Badge className="ml-auto" variant="secondary">
          {plant.category}
        </Badge>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 3D Model Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-card border-border/50 shadow-garden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                3D Plant Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Plant Image */}
                <img 
                  src={plant.image} 
                  alt={plant.name}
                  className="w-full h-full object-contain"
                />

                {/* Interactive highlighted points */}
                {plant.highlightedParts?.map((part, index) => (
                  <motion.div
                    key={index}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="absolute w-6 h-6 bg-red-500 rounded-full shadow-lg cursor-pointer border-2 border-white flex items-center justify-center"
                    style={{ 
                      left: `${part.position.x}%`, 
                      top: `${part.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedPart(part)}
                    whileHover={{ scale: 1.5, boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
                    title={`${part.part} - Click to learn more`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                ))}

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-xs text-muted-foreground bg-background/80 px-3 py-2 rounded-lg">
                    Click on red points to learn about medicinal parts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plant Information */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Description */}
          <Card className="bg-gradient-card border-border/50 shadow-card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Info className="w-5 h-5 text-accent-foreground" />
                </div>
                About This Plant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{plant.description}</p>
            </CardContent>
          </Card>

          {/* Medicinal Uses */}
          <Card className="bg-gradient-card border-border/50 shadow-card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                Medicinal Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {plant.medicinalUses.map((use, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary-foreground border-primary/20"
                  >
                    {use}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Compounds */}
          <Card className="bg-gradient-card border-border/50 shadow-card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <FlaskConical className="w-5 h-5 text-accent-foreground" />
                </div>
                Active Compounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {plant.activeCompounds.map((compound, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/30"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground font-medium">{compound}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Conditions */}
          <Card className="bg-gradient-card border-border/50 shadow-card-soft">
            <CardHeader>
              <CardTitle>Treats These Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {plant.diseases.map((disease, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-accent/30 text-accent-foreground hover:bg-accent/10 transition-colors"
                  >
                    {disease}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sidebar for highlighted part details */}
      <AnimatePresence>
        {selectedPart && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedPart(null)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-96 bg-gradient-card border-l border-border/50 shadow-garden z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">{selectedPart.part}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPart(null)}
                    className="hover:bg-background/50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Plant name */}
                <div className="border-b border-border/30 pb-3">
                  <p className="text-sm text-muted-foreground">Part of</p>
                  <p className="font-semibold text-primary">{plant.name}</p>
                  <p className="text-sm italic text-muted-foreground">{plant.scientificName}</p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Medicinal Properties
                  </h4>
                  <p className="text-foreground leading-relaxed bg-background/30 p-4 rounded-lg">
                    {selectedPart.description}
                  </p>
                </div>

                {/* Related uses for this part */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent-foreground" />
                    Common Uses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plant.medicinalUses.map((use, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary-foreground border-primary/20"
                      >
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Active compounds */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-accent-foreground" />
                    Key Compounds
                  </h4>
                  <div className="space-y-2">
                    {plant.activeCompounds.map((compound, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-2 bg-background/50 rounded-lg border border-border/20"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-foreground text-sm">{compound}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};