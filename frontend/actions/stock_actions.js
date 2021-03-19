import * as StockAPIUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK'

const receiveStock = (stock) => {
    return {
        type: RECEIVE_STOCK,
        stock
    }
}

export const showStock = (stockAbv) => dispatch => {
    return StockAPIUtil.fetchStock(stockAbv).then(s => dispatch(receiveStock(s)))
}

export const buyStock = (stock) => dispatch => {
    return StockAPIUtil.postStock(stock).then(s => dispatch(receiveStock(s)))
}
