import { $CombinedState } from "redux"

export const fetchStock = (stockAbv) => {
    return $CombinedState.ajax({
        url: `/api/${stockAbv}`,
        method: 'GET'
    })
}