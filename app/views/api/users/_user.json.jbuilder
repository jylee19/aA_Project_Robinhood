json.user do 
    json.extract! user, :id, :username, :email, :total_trades_made, :trades_made_today, :portfolio_id
end

json.portfolio do
    json.extract! user.portfolio, :id, :user_id, :value, :num_stocks, :funds
end