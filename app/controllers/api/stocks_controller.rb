class Api::StocksController < ApplicationController

    def create

    end

    def update

    end

    private
    def stock_params
        params.require(:stock).permit(:email, :username, :password, :portfolio_id)
    end

end