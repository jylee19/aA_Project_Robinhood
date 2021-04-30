class Api::StocksController < ApplicationController

    # buy
    def create 
        @stock = Stock.find_by(NYSE_abv: params[:stock][:NYSE_abv], portfolio_id: params[:stock][:portfolio_id])
        @portfolio = Portfolio.find_by(id: params[:stock][:portfolio_id])
        holder = Stock.new(stock_params)
        if @portfolio.funds < (holder.current_price * holder.number)
            render json: @stock.errors.full_messages, status: 422
        elsif @stock.nil?
            @stock = Stock.new(stock_params)
            @stock.value = @stock.current_price * @stock.number
            @stock.previous_close = Stock.get_close(@stock.NYSE_abv)
            desc = Stock.get_description(@stock.NYSE_abv)
            @stock.company_name = desc.company_name
            @stock.comp_description = desc.description
            @stock.purchase_price = @stock.current_price
            @stock.save!
            @portfolio.funds = @portfolio.funds - (@stock.current_price * @stock.number)
            Portfolio.update(@portfolio.id, funds: @portfolio.funds)
            num_stocks = @portfolio.num_stocks + @stock.number
            Portfolio.update(@portfolio.id, num_stocks: num_stocks)
            render :show
        else
            new_value = @stock.value + (holder.current_price * holder.number)
            new_number = @stock.number + holder.number
            avg_cost = (new_value) / (new_number)
            current_price = holder.current_price
            Stock.update(@stock.id, purchase_price: avg_cost, value: new_value, number: new_number, current_price: current_price)
            @portfolio.funds = @portfolio.funds - (holder.current_price * holder.number)
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
            new_value = @stock.value - (holder.current_price * holder.number)
            new_number = @stock.number - holder.number
            avg_cost = (new_value) / (new_number)
            Stock.update(@stock.id, purchase_price: avg_cost, value: new_value, number: new_number)
            @portfolio.funds = @portfolio.funds + (holder.current_price * holder.number)
            num_stocks = @portfolio.num_stocks - holder.number
            Portfolio.update(@portfolio.id, funds: @portfolio.funds, num_stocks: num_stocks)
            if new_number > 0        
            else
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
        @stock = Stock.find_by(NYSE_abv: params[:stock][:NYSE_abv], portfolio_id: params[:stock][:portfolio_id])
        if @stock.nil?
            @stock = Stock.new(stock_params)
            @stock.current_price = Stock.stock_price(@stock.NYSE_abv)
            desc = Stock.get_description(@stock.NYSE_abv)
            @stock.comp_description = desc.description
            @stock.previous_close = Stock.get_close(@stock.NYSE_abv)
            @stock.company_name = desc.company_name
            render :show
        else
            @stock.current_price = Stock.stock_price(@stock.NYSE_abv)
            @stock.previous_close = Stock.get_close(@stock.NYSE_abv)
            render :show
        end
    end



    private
    def stock_params
        params.require(:stock).permit(:NYSE_abv, :portfolio_id, :value, :comp_description, :number, :purchase_price, :current_price, :company_name)
    end

end