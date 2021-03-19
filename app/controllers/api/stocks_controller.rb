class Api::StocksController < ApplicationController

    # buy
    def create 
        @stock = Stock.new(stock_params)
        @portfolio = Portfolio.find_by(id: @stock.portfolio_id)
        if @portfolio.funds >= (@stock.value * @stock.number)
            @stock.save!
            @portfolio.funds = @portfolio.funds - (@stock.value * @stock.number)
            Portfolio.update(@portfolio.id, :funds => @portfolio.funds)
            num_stocks = @portfolio.num_stocks + @stock.number
            Portfolio.update(@portfolio.id, :num_stocks => num_stocks)
            render :show
        else
            render json: @stock.errors.full_messages, status: 422
        end
    end

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
        params.require(:stock).permit(:NYSE_abv, :portfolio_id, :value, :comp_description, :number, :purchase_price)
    end

end