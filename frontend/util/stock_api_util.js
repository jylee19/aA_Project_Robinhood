import { $CombinedState } from "redux"

export const fetchStock = (stockAbv) => {
    return $.ajax({
        url: `/api/stocks/${stockAbv}`,
        method: 'GET'
    })
}