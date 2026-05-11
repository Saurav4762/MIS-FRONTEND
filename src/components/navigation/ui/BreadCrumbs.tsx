import { Link, useChildMatches } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

export default function Breadcrumbs() {
  const matches = useChildMatches();

  const crumbs: { title: string; path: string }[] = matches

    .filter((match) => {
      return match?.context?.breadcrumb;
    })
    .map((match) => {
      return {
        title: match.context.breadcrumb!,
        path: match.pathname,
      };
    })
    .reduce(
      (unique, crumb) => {
        // Only add if this title hasn't been added yet
        if (!unique.some((c) => c.title === crumb.title)) {
          unique.push(crumb);
        }
        return unique;
      },
      [] as typeof crumbs,
    );

  return (
    <nav className="flex items-center gap-2 text-xs">
      <span className="text-(--mis-color-pri-500)">
        <Landmark size={14} />
      </span>
      <h3 className="text-xs font-normal text-gray-400">Municipality</h3>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.path} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {isLast ? (
              <span className="text-xs font-semibold">{crumb.title}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-xs underline underline-offset-4 text-gray-400 hover:text-gray-200 transition-colors"
              >
                {crumb.title}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
