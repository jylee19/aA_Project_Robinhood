require 'rubygems'
# require 'rest-client'
# require 'alphavantagerb'

class Stock < ApplicationRecord


    def self.stock_price(symbol)
        client = IEX::Api::Client.new(
        publishable_token: 'pk_338de47bba214f5bb31b35bd33a273e8',
        endpoint: 'https://cloud.iexapis.com/stable'
        )
        quote = client.price(symbol)
        quote
    end

    def self.get_description(symbol)
        client = IEX::Api::Client.new(
        publishable_token: 'pk_338de47bba214f5bb31b35bd33a273e8',
        endpoint: 'https://cloud.iexapis.com/stable'
        )

        description = client.company(symbol);
        description

    end

    def self.get_close(symbol)
        client = Avantage::Client.new('JLIBEKIH4Z1YQDP1')
        stock = client.get(:global_quote, symbol: symbol)
        stock["Global Quote"]["08. previous close"]
    end
        

end
