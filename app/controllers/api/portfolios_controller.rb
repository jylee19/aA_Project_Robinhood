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
        stocks = Stock.where(portfolio_id: 6);
        value = 0
        prev_close = 0
        stocks.each do |stock|
            value = value + stock.value
            prev_close = prev_close + (stock.previous_close * stock.number)
        end
        value = value.round(2)
        prev_close = prev_close.round(2)
        @portfolio.value = value + @portfolio.funds
        @portfolio.prev_close = prev_close + @portfolio.funds
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
