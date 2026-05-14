import DataCollectionHeader from "./components/DataCollectionHeader";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";

export default function DataCollection() {
  return (
    <div className="space-y-6 h-full w-full">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-ink-700">
          Survey Records
        </h2>
        <p className="mt-2 text-ink-400">
          View, manage and record the survey infomation.
        </p>
      </div>
      <div className="h-full w-full">
        <div className=" w-full! bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <DataCollectionHeader />
          </div>
          <div>
            <DataTable />
          </div>
          <div className="flex justify-between items-center px-6 py-3">
            <div className="text-sm text-slate-500">
              Showing 1 to 5 of 120 results
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
