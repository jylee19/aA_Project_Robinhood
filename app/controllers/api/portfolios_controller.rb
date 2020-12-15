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
