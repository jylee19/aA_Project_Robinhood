class Api::StocksController < ApplicationController

    # buy
    def create 
        @stock = Stock.find_by(NYSE_abv: params[:stock][:NYSE_abv], portfolio_id: params[:stock][:portfolio_id])
        @portfolio = Portfolio.find_by(id: params[:stock][:portfolio_id])
        holder = Stock.new(stock_params)
        if @portfolio.funds < (holder.value * holder.number)
            render json: @stock.errors.full_messages, status: 422
        elsif @stock.nil?
            @stock = Stock.new(stock_params)
            @stock.save!
            @portfolio.funds = @portfolio.funds - (@stock.purchase_price * @stock.number)
            Portfolio.update(@portfolio.id, funds: @portfolio.funds)
            num_stocks = @portfolio.num_stocks + @stock.number
            Portfolio.update(@portfolio.id, num_stocks: num_stocks)
            render :show
        else
            new_value = @stock.value + holder.value
            new_number = @stock.number + holder.number
            avg_cost = (new_value) / (new_number)
            Stock.update(@stock.id, purchase_price: avg_cost, value: new_value, number: new_number)
            @portfolio.funds = @portfolio.funds - holder.value
            num_stocks = @portfolio.num_stocks + holder.number
            Portfolio.update(@portfolio.id, funds: @portfolio.funds, num_stocks: num_stocks)
            render :show
        end
    end


    # sell
    def destroy
        @stock = Stock.find_by(NYSE_abv: params[:stock][:NYSE_abv], portfolio_id: params[:stock][:portfolio_id])
        @portfolio = Portfolio.find_by(id: params[:stock][:portfolio_id])
        holder = Stock.new(stock_params)
        if holder.number > @stock.number
            render json: @stock.errors.full_messages, status: 422
        else
            new_value = @stock.value - @holder.value
            new_number = @stock.number - @holder.number
            avg_cost = (new_value) / (new_number)
            Stock.update(@stock.id, purchase_price: avg_cost, value: new_value, number: new_number)
            @portfolio.funds = @portfolio.funds + holder.value
            num_stocks = @portfolio.num_stocks - holder.number
            Portfolio.update(@portfolio.id, funds: @portfolio.funds, num_stocks: num_stocks)
            if new_number = 0
                Stock.destroy(@stock.id)
            end
            render :show
        end
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