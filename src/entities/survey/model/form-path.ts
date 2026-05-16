import type { FormPath, FormPathSegment } from "./types";

const MIN_DEPTH = 1;
const MAX_DEPTH = 3;

export function assertFormPathDepth(segments: readonly FormPathSegment[]): void {
  if (segments.length < MIN_DEPTH || segments.length > MAX_DEPTH) {
    throw new Error(
      `Form path must have ${MIN_DEPTH}–${MAX_DEPTH} segments (levels 2–4), got ${segments.length}`,
    );
  }
}

/** "household-profile/family/member-details" */
export function formPathToString(path: readonly FormPathSegment[]): string {
  assertFormPathDepth(path);
  return path.join("/");
}

/** Parse a stored progress key or route path back into segments */
export function formPathFromString(pathKey: string): FormPath {
  const segments = pathKey.split("/").filter(Boolean);
  assertFormPathDepth(segments);
  return segments as FormPath;
}

export function toFormPath(
  ...segments: [FormPathSegment, ...FormPathSegment[]]
): FormPath {
  assertFormPathDepth(segments);
  return segments;
}
