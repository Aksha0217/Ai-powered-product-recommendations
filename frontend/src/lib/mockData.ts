export interface MetricsData {
  precision: number;
  recall: number;
  ctr: number;
  conversionRate: number;
  aov: number;
  timestamp: number;
}

export interface UserSegment {
  name: string;
  count: number;
  engagement: number;
  revenue: number;
}

export interface ProductRelation {
  source: string;
  target: string;
  strength: number;
}

export interface RecommendationPerformance {
  algorithm: string;
  accuracy: number;
  latency: number;
  coverage: number;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  category: string;
}

export interface RadarData {
  algorithm: string;
  precision: number;
  recall: number;
  coverage: number;
  diversity: number;
  novelty: number;
  serendipity: number;
}

export interface ScatterData {
  ctr: number;
  conversionRate: number;
  segment: string;
}

export interface BubbleData {
  category: string;
  ctr: number;
  conversion: number;
  revenue: number;
}

export interface AreaData {
  month: string;
  users: number;
  cumulative: number;
}

export interface MixedData {
  month: string;
  revenue: number;
  recommendations: number;
}

export interface HeatMapData {
  hour: number;
  day: string;
  activity: number;
}

export interface GaugeData {
  value: number;
  max: number;
  label: string;
}

export interface TreeMapData {
  name: string;
  size: number;
  children?: TreeMapData[];
}

export interface SankeyData {
  nodes: { name: string }[];
  links: { source: number; target: number; value: number }[];
}

export interface ConversionFunnelData {
  stage: string;
  users: number;
  conversion: number;
}

export interface MockData {
  metrics: MetricsData;
  userSegments: UserSegment[];
  productRelations: ProductRelation[];
  performance: RecommendationPerformance[];
  timeSeries: TimeSeriesData[];
  liveUsers: number;
  radarData: RadarData[];
  scatterData: ScatterData[];
  bubbleData: BubbleData[];
  areaData: AreaData[];
  mixedData: MixedData[];
  heatMapData: HeatMapData[];
  gaugeData: GaugeData;
  treeMapData: TreeMapData[];
  sankeyData: SankeyData;
  conversionFunnel: ConversionFunnelData[];
}

const categories = ["Electronics", "Fashion", "Home", "Sports", "Books"];
const algorithms = ["Collaborative", "Content-Based", "Hybrid", "Association Rules"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const generateMockData = (): MockData => {
  const now = Date.now();
  
  return {
    metrics: {
      precision: 0.78 + Math.random() * 0.15,
      recall: 0.72 + Math.random() * 0.15,
      ctr: 0.12 + Math.random() * 0.05,
      conversionRate: 0.08 + Math.random() * 0.04,
      aov: 85 + Math.random() * 30,
      timestamp: now,
    },
    userSegments: [
      {
        name: "New Users",
        count: Math.floor(1200 + Math.random() * 300),
        engagement: 0.45 + Math.random() * 0.2,
        revenue: Math.floor(25000 + Math.random() * 10000),
      },
      {
        name: "Returning",
        count: Math.floor(3500 + Math.random() * 500),
        engagement: 0.68 + Math.random() * 0.15,
        revenue: Math.floor(85000 + Math.random() * 20000),
      },
      {
        name: "VIP",
        count: Math.floor(450 + Math.random() * 100),
        engagement: 0.92 + Math.random() * 0.05,
        revenue: Math.floor(120000 + Math.random() * 30000),
      },
      {
        name: "Inactive",
        count: Math.floor(800 + Math.random() * 200),
        engagement: 0.15 + Math.random() * 0.1,
        revenue: Math.floor(5000 + Math.random() * 3000),
      },
    ],
    productRelations: Array.from({ length: 20 }, (_, i) => ({
      source: `Product ${String.fromCharCode(65 + (i % 10))}`,
      target: `Product ${String.fromCharCode(65 + ((i + 3) % 10))}`,
      strength: 0.3 + Math.random() * 0.7,
    })),
    performance: algorithms.map(algo => ({
      algorithm: algo,
      accuracy: 0.7 + Math.random() * 0.25,
      latency: 20 + Math.random() * 80,
      coverage: 0.6 + Math.random() * 0.35,
    })),
    timeSeries: Array.from({ length: 24 }, (_, i) => ({
      timestamp: `${i}:00`,
      value: 50 + Math.random() * 150,
      category: categories[Math.floor(Math.random() * categories.length)],
    })),
    liveUsers: Math.floor(2500 + Math.random() * 1000),
    radarData: algorithms.map(algo => ({
      algorithm: algo,
      precision: 0.7 + Math.random() * 0.25,
      recall: 0.65 + Math.random() * 0.25,
      coverage: 0.6 + Math.random() * 0.35,
      diversity: 0.55 + Math.random() * 0.35,
      novelty: 0.5 + Math.random() * 0.4,
      serendipity: 0.45 + Math.random() * 0.4,
    })),
    scatterData: Array.from({ length: 50 }, () => ({
      ctr: 0.05 + Math.random() * 0.2,
      conversionRate: 0.02 + Math.random() * 0.15,
      segment: ["New", "Returning", "VIP", "Inactive"][Math.floor(Math.random() * 4)],
    })),
    bubbleData: categories.map(cat => ({
      category: cat,
      ctr: 0.08 + Math.random() * 0.12,
      conversion: 0.05 + Math.random() * 0.1,
      revenue: 10000 + Math.random() * 50000,
    })),
    areaData: months.map((month, i) => ({
      month,
      users: 1000 + i * 200 + Math.random() * 500,
      cumulative: 1000 + (i + 1) * 1000 + Math.random() * 1000,
    })),
    mixedData: months.slice(0, 6).map((month, i) => ({
      month,
      revenue: 50000 + i * 10000 + Math.random() * 20000,
      recommendations: 10000 + i * 2000 + Math.random() * 5000,
    })),
    heatMapData: Array.from({ length: 168 }, (_, i) => ({
      hour: i % 24,
      day: days[Math.floor(i / 24)],
      activity: Math.random() * 100,
    })),
    gaugeData: {
      value: 75 + Math.random() * 20,
      max: 100,
      label: "System Performance Score",
    },
    treeMapData: [
      {
        name: "Electronics",
        size: 50000,
        children: [
          { name: "Smartphones", size: 20000 },
          { name: "Laptops", size: 15000 },
          { name: "Accessories", size: 15000 },
        ],
      },
      {
        name: "Fashion",
        size: 35000,
        children: [
          { name: "Clothing", size: 20000 },
          { name: "Shoes", size: 10000 },
          { name: "Accessories", size: 5000 },
        ],
      },
      {
        name: "Home & Garden",
        size: 25000,
        children: [
          { name: "Furniture", size: 15000 },
          { name: "Decor", size: 7000 },
          { name: "Tools", size: 3000 },
        ],
      },
    ],
    sankeyData: {
      nodes: [
        { name: "Visitors" },
        { name: "Product Views" },
        { name: "Add to Cart" },
        { name: "Checkout" },
        { name: "Purchase" },
      ],
      links: [
        { source: 0, target: 1, value: 1000 },
        { source: 1, target: 2, value: 300 },
        { source: 2, target: 3, value: 150 },
        { source: 3, target: 4, value: 120 },
      ],
    },
    conversionFunnel: [
      { stage: "Visitors", users: 10000, conversion: 100 },
      { stage: "Product Views", users: 3000, conversion: 30 },
      { stage: "Add to Cart", users: 900, conversion: 9 },
      { stage: "Checkout", users: 450, conversion: 4.5 },
      { stage: "Purchase", users: 360, conversion: 3.6 },
    ],
  };
};
