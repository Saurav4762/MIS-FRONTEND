import { IdCard } from "lucide-react";
export default function Header() {
  return (
    <header>
      <div className="flex gap-6 items-center justify-start p-6 border-b border-ink-200">
        <div className="p-6 w-fit rounded-lg bg-pri-100">
          <IdCard className="h-6 w-6 text-pri-700" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Details of Facilities Accessed</h1>
          <p className="text-xs text-ink-400 font-bold">
            सुविधाहरूको पहुँच सम्बन्धी विवरण
          </p>
        </div>
      </div>
    </header>
  );
}
