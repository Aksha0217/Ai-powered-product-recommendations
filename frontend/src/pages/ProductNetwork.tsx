import { useState } from "react";
import { Card } from "@/components/ui/card";
import { generateMockData, MockData } from "@/lib/mockData";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the 3D component
const ProductNetwork3D = lazy(() => 
  import("@/components/3d/ProductNetwork3D").then(module => ({ 
    default: module.ProductNetwork3D 
  }))
);

const ProductNetwork = () => {
  const [mockData] = useState<MockData>(generateMockData());

  const uniqueProducts = Array.from(
    new Set([
      ...mockData.productRelations.map((r) => r.source),
      ...mockData.productRelations.map((r) => r.target),
    ])
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6">
        <div className="space-y-6">
          <Card className="p-6">
            <h1 className="text-3xl font-bold mb-4">3D Product Relationship Network</h1>
            <p className="text-muted-foreground mb-6">Explore the interconnected web of product recommendations and associations.</p>
            <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
              <ProductNetwork3D />
            </Suspense>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductNetwork;
