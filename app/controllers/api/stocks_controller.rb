class Api::StocksController < ApplicationController

    def create
        @stock = Stock.new(stock_params)
        
    end

    def update

    end

    private
    def stock_params
        params.require(:stock).permit(:NYSE_abv)
    end

end