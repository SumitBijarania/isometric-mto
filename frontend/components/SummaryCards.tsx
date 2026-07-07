import { Summary } from "@/lib/types";

export default function SummaryCards({ summary }: { summary: Summary }) {
  const cards = [
    { label: "Total Pipe Length", value: `${summary.total_pipe_length_m.toFixed(2)} m` },
    { label: "Fittings", value: summary.fittings },
    { label: "Flanges", value: summary.flanges },
    { label: "Valves", value: summary.valves },
    { label: "Gaskets", value: summary.gaskets },
    { label: "Bolt Sets", value: summary.bolt_sets },
    { label: "Field Welds", value: summary.field_welds },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-lg shadow p-4">
          <dt className="text-sm text-gray-500">{card.label}</dt>
          <dd className="text-2xl font-bold text-gray-900">{card.value}</dd>
        </div>
      ))}
    </div>
  );
}