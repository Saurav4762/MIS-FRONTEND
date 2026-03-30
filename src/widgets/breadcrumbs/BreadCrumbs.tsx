import { Link, useMatches } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

export function Breadcrumb() {
  const matches = useMatches();

  console.log(matches);

  const crumbs = matches
    .filter((match) => match.staticData?.breadcrumb)
    .map((match) => ({
      title: match.staticData.breadcrumb!,
      path: match.pathname,
    }));

  return (
    <nav className="flex items-center gap-2 text-sm">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <>
            <div className="flex items-center gap-2">
              <span>
                <Landmark size={14} color="#3b82f6" />
              </span>
              <span>
                <h3 className="text-xs font-normal text-gray-400">
                  Municipality
                </h3>
              </span>
              <span className="text-xs text-gray-400">/</span>
            </div>
            <span key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <span className="text-muted-foreground">/</span>}
              {isLast ? (
                <span className="font-semibold text-xs">{crumb.title}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {crumb.title}
                </Link>
              )}
            </span>
          </>
        );
      })}
    </nav>
  );
}
