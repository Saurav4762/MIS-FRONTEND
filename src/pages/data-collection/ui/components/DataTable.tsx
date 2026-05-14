import AvatarInitial from "./AvatarInitial";
import ActionButtons from "./ActionButtons";

const sample = [
  { id: 1, name: "Rajesh Jha", date: "Oct 24, 2023", house: "#BHA-402" },
  { id: 2, name: "Sita Adhikari", date: "Oct 23, 2023", house: "#BHA-115" },
  { id: 3, name: "Nirmal Sharma", date: "Oct 22, 2023", house: "#BHA-908" },
  { id: 4, name: "Prakash Karki", date: "Oct 22, 2023", house: "#BHA-221" },
  { id: 5, name: "Anjali Bista", date: "Oct 21, 2023", house: "#BHA-774" },
];

export default function DataTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="border-t border-ink-200 bg-ink-50/50">
          <tr className="border-b border-ink-200">
            <th className="pl-6 py-4 text-ink-600 text-left">
              Survey User Name
            </th>
            <th className="py-4 px-6 text-ink-600 text-left">Survey Date</th>
            <th className="py-4 px-6 text-ink-600 text-left">House Number</th>
            <th className="py-4 px-6 text-ink-600 text-right pr-6">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sample.map((row) => (
            <tr key={row.id} className="border-b border-ink-200">
              <td className="pl-6 py-3.5">
                <div className="flex items-center gap-4">
                  <AvatarInitial name={row.name} />
                  <div>
                    <div className="font-semibold text-ink-800">{row.name}</div>
                  </div>
                </div>
              </td>

              <td className="py-3.5 px-6 text-ink-600 ">{row.date}</td>

              <td className="py-3.5 px-6 text-ink-800 font-medium">
                {row.house}
              </td>

              <td className="py-3.5 px-6 text-right">
                <ActionButtons />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
