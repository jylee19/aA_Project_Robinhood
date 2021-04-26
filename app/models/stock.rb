require 'rubygems'
# require 'rest-client'
# require 'alphavantagerb'

class Stock < ApplicationRecord


    def self.stock_price(symbol)
        client = IEX::Api::Client.new(
        publishable_token: 'Tpk_8ecd293d171f48c793e2a1435a284f9c',
        endpoint: 'https://sandbox.iexapis.com/stable'
        )
        quote = client.quote(symbol)
        quote.latest_price;
    end

    def self.get_description(symbol)
        client = IEX::Api::Client.new(
        publishable_token: 'Tpk_8ecd293d171f48c793e2a1435a284f9c',
        endpoint: 'https://sandbox.iexapis.com/stable'
        )

        description = client.company(symbol);
        description.description;

    end

    def self.get_name(symbol)
        client = IEX::Api::Client.new(
        publishable_token: 'Tpk_8ecd293d171f48c793e2a1435a284f9c',
        endpoint: 'https://sandbox.iexapis.com/stable'
        )

        name = client.company(symbol);
        name.company_name;

    end

    def self.get_close(symbol)
        client = Avantage::Client.new('JLIBEKIH4Z1YQDP1')
        stock = client.get(:global_quote, symbol: 'AAPL')
        stock["Global Quote"]["08. previous close"]
    end
        

end
