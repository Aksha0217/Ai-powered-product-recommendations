import { Card } from "@/components/ui/card";
import { MockData } from "@/lib/mockData";
import { useState, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the 3D component
const ProductNetwork3D = lazy(() => 
  import("@/components/3d/ProductNetwork3D").then(module => ({ 
    default: module.ProductNetwork3D 
  }))
);

interface ProductNetworkTabProps {
  data: MockData;
}

const ProductNetworkTab = ({ data }: ProductNetworkTabProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const uniqueProducts = Array.from(
    new Set([
      ...data.productRelations.map((r) => r.source),
      ...data.productRelations.map((r) => r.target),
    ])
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">3D Product Relationship Network</h3>
        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <ProductNetwork3D />
        </Suspense>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Association Rules</h3>
          <div className="space-y-3">
            {data.productRelations.slice(0, 8).map((relation, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{relation.source}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium">{relation.target}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-purple to-neon-blue"
                      style={{ width: `${relation.strength * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {(relation.strength * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Product Clusters</h3>
          <div className="grid grid-cols-2 gap-4">
            {["Electronics", "Fashion", "Home", "Sports"].map((category, idx) => (
              <div
                key={category}
                className="p-4 rounded-lg bg-gradient-to-br from-card to-muted/20 border border-border hover:shadow-lg transition-all cursor-pointer"
              >
                <div
                  className="w-full h-2 rounded-full mb-3"
                  style={{
                    background: `linear-gradient(90deg, hsl(var(--chart-${idx + 1})) 0%, hsl(var(--chart-${((idx + 1) % 5) + 1})) 100%)`,
                  }}
                />
                <div className="text-sm font-medium mb-1">{category}</div>
                <div className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 50 + 20)} products
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductNetworkTab;
