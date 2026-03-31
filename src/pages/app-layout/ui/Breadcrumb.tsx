import { Link, useMatches } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

export function Breadcrumb() {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.staticData?.breadcrumb)
    .map((match) => ({
      title: match.staticData.breadcrumb!,
      path: match.pathname,
    }));

  return (
    <nav className="flex items-center gap-2 text-xs">
      <span>
        <Landmark size={14} color="#3b82f6" />
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
