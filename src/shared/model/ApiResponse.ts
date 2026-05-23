/*



public class ApiError
{
  public string Code { get; set; } = string.Empty;
  public string Message { get; set; } = string.Empty;
  public Dictionary<string, string[]>? Details { get; set; }
  public Dictionary<int, Dictionary<string, string[]>>? RowErrors { get; set; }
}



public class ApiResponse
{
  public bool Success { get; set; }
  public string Message { get; set; } = string.Empty;
  public T? Data { get; set; }
  public ApiError? Error { get; set; }
  public HttpStatusCode StatusCode { get; set; }
  public DateTime Timestamp { get; set; } = DateTime.UtcNow;
  public int? Page { get; set; }
  public int? PageSize { get; set; }
  public int? TotalCount { get; set; }
  public bool? HasNext { get; set; }
  public bool? HasPrevious { get; set; }
  public string? NextCursor { get; set; }
  public string? PreviousCursor { get; set; }
}
*/

export type ApiError = {
  code: string;
  message: string;
  details: Record<string, string[]>;
  rowErrors: Record<number, Record<string, string[]>>;
};

export type HttpStatusCode = number;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  error?: ApiError;
  data?: T;
  statusCode: HttpStatusCode;
  timestamp: Date; // utc timestamp
  page?: number;
  pageSize?: number;
  totalCount?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  nextCursor?: string;
  previousCursor?: string;
};
