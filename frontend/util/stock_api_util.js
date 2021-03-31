
export const fetchStock = (stock) => {
    return $.ajax({
        url: `/api/stocks/${stock.NYSE_abv}`,
        method: 'GET',
        data: { stock }
    })
}

export const postStock = (stock) => {
    return $.ajax({
        url: `/api/stocks`,
        method: 'POST',
        data: { stock }
    })
}

export const deleteStock = (stock) => {
    return $.ajax({
        url: `/api/stocks/${stock.id}`,
        method: 'DELETE',
        data: { stock }
    })
}