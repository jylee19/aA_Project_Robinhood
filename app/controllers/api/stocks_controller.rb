class Api::StocksController < ApplicationController

    # buy
    def create 
        @stock = Stock.new(stock_params)
        @stock.value = Stock.stock_price(@stock.NYSE_abv)
    end

    # update ticker
    def update

    end

    # Stock page
    def show
        # @stock = Stock.new(stock_params)
        @stock = Stock.new()
        puts @stock
        # @stock.value = Stock.stock_price(@stock.NYSE_abv)
        @stock.NYSE_abv = 'AAPL'
        @stock.value = Stock.stock_price('AAPL')
        render :show
    end

    private
    def stock_params
        params.require(:stock).permit(:NYSE_abv)
    end

end