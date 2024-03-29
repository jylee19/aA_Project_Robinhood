class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        @user.trades_made_today = 0
        @user.total_trades_made = 0
        if @user.save!
            login!(@user)
            @user.portfolio_id = @user.id
            @user.update(user_params)
            @portfolio = Portfolio.new()
            @portfolio.user_id = @user.id
            @portfolio.value = 10000.00
            @portfolio.num_stocks = 0
            @portfolio.funds = 10000.00
            @portfolio.save!
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :username, :password, :portfolio_id)
    end

end
