


export function getSafePagination(current, perPage, total) {
    const totalPages = Math.max(1, Math.ceil(total / perPage));

    const safeCurrent = Math.min(Math.max(current, 1), totalPages);

    if (current > totalPages) {
        current = totalPages;
    }

    const start = (current - 1) * perPage;
    const end = start + perPage - 1;

    return {
        start,
        end
    };
}