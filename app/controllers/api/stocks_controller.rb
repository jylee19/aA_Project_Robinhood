class Api::StocksController < ApplicationController

    # buy
    def create 
        @stock = Stock.new(stock_params)
        if @stock.save!
            @portfolio = Portfolio.find_by(id: )
    end

    # sell
    def destroy

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
        @stock.comp_description = Stock.get_description('AAPL')
        render :show
    end



    private
    def stock_params
        params.require(:stock).permit(:NYSE_abv)
    end

end