
export const fetchStock = (stockAbv) => {
    return $.ajax({
        url: `/api/stocks/${stockAbv}`,
        method: 'GET'
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