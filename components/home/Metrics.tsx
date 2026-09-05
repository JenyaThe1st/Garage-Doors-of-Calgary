import { metrics } from "@/data/metrics";
import { MetricsBar } from "@/components/home/MetricsBar";

export function Metrics() {
  return (
    <div className="relative z-10 border-t border-white/10">
      <MetricsBar items={metrics} className="border-0 border-t border-white/10" />
    </div>
  );
}
