import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FilterSidebarProps {
  filters: {
    dateRange: number[];
    algorithms: {
      collaborative: boolean;
      content: boolean;
      hybrid: boolean;
    };
    minConfidence: number;
    userSegment: string;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  return (
    <div className="w-80 p-6 border-l border-border bg-card/30 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>
      
      <div className="space-y-6">
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Date Range</Label>
          <Slider
            value={filters.dateRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, dateRange: value })
            }
            min={0}
            max={100}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Last 30 days</span>
            <span>Today</span>
          </div>
        </Card>

        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Algorithms</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collaborative"
                checked={filters.algorithms.collaborative}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    ...filters,
                    algorithms: { ...filters.algorithms, collaborative: !!checked },
                  })
                }
              />
              <label htmlFor="collaborative" className="text-sm cursor-pointer">
                Collaborative Filtering
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="content"
                checked={filters.algorithms.content}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    ...filters,
                    algorithms: { ...filters.algorithms, content: !!checked },
                  })
                }
              />
              <label htmlFor="content" className="text-sm cursor-pointer">
                Content-Based
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hybrid"
                checked={filters.algorithms.hybrid}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    ...filters,
                    algorithms: { ...filters.algorithms, hybrid: !!checked },
                  })
                }
              />
              <label htmlFor="hybrid" className="text-sm cursor-pointer">
                Hybrid Model
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">
            Min Confidence: {filters.minConfidence.toFixed(2)}
          </Label>
          <Slider
            value={[filters.minConfidence]}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, minConfidence: value[0] })
            }
            min={0}
            max={1}
            step={0.01}
          />
        </Card>

        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">User Segment</Label>
          <RadioGroup
            value={filters.userSegment}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, userSegment: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="text-sm cursor-pointer">All Users</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new" className="text-sm cursor-pointer">New Users</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="returning" id="returning" />
              <Label htmlFor="returning" className="text-sm cursor-pointer">Returning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vip" id="vip" />
              <Label htmlFor="vip" className="text-sm cursor-pointer">VIP</Label>
            </div>
          </RadioGroup>
        </Card>
      </div>
    </div>
  );
};

export default FilterSidebar;
