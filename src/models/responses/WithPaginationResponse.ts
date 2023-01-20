interface PaginationInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface WithPaginationResponse<T> {
    info: PaginationInfo;
    results: T[];
}
