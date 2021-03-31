import Stock from '../components/stock/stock';
import * as StockAPIUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK'

const receiveStock = (stock) => {
    return {
        type: RECEIVE_STOCK,
        stock
    }
}

export const showStock = (stock) => dispatch => {
    return StockAPIUtil.fetchStock(stock).then(s => dispatch(receiveStock(s)))
}

export const buyStock = (stock) => dispatch => {
    return StockAPIUtil.postStock(stock)
}

export const sellStock = (stock) => dispatch => {
    return StockAPIUtil.deleteStock(stock)
}