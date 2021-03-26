require 'rubygems'
require 'rest-client'

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

    def self.get_open(symbol)
        # client = Alphavantage::Client.new key: "JLIBEKIH4Z1YQDP1"
        # stock = Alphavantage::Stock.new symbol: symbol, key: "JLIBEKIH4Z1YQDP1"
        puts symbol
        response = RestClient.get 'https://www.alphavantage.co/query', {params: {
            function: 'GLOBAL_QUOTE',
            symbol: `IBM`,
            apikey: 'JLIBEKIH4Z1YQDP1'       
        } }

        stock = JSON.parse(response)
        puts stock


    end
        

end
