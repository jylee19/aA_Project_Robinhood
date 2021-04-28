require_relative "stocks_controller"

class Api::PortfoliosController < ApplicationController

    def create
        @portfolio = Portfolio.new(portfolio_params)
        @portfolio.value = 0
        @portfolio.num_stocks = 0
        if @portfolio.save!
            render :show
        else
            render json: @portfolio.errors.full_messages, status: 422
        end
    end

    def show
        @portfolio = Portfolio.find(params[:id])
        stocks = Stock.where(portfolio_id: params[:id]);
        value = 0
        prev_close = 0
        graph_data = [];
        stocks.each do |stock|
            value = value + stock.value
            prev_close = prev_close + (stock.previous_close * stock.number)
        end
        value = value.round(2)
        prev_close = prev_close.round(2)
        @portfolio.value = value + @portfolio.funds
        @portfolio.prev_close = prev_close + @portfolio.funds
        data = nil
        stocks.each do |stock|
            graph_data = Portfolio.get_price(stock.NYSE_abv, stock.number)
            if data.nil? 
                data = graph_data
            else
                graph_data.each_with_index do |point, index|
                    data[index][1] = (data[index][1] + point[1]).round(2)
                end
            end
        end
        assets = []
        holder = []
        stocks.each do |stock|
            holder = [stock.NYSE_abv, stock.current_price, stock.previous_close, stock.number]
            assets.push(holder)
        end
        @portfolio.assets_owned = assets
        @portfolio.graph_data = data
        @portfolio.save!
        render :show
    end

    def update

    end

    def destroy

    end

    private

    def portfolio_params
        params.require(:portfolio).permit(:user_id)
    end

end
