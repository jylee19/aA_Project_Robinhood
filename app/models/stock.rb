require 'rubygems'


class Stock < ApplicationRecord


    def self.stock_price(symbol)
        client = IEX::Api::Client.new(
        publishable_token: 'Tpk_8ecd293d171f48c793e2a1435a284f9c',
        endpoint: 'https://sandbox.iexapis.com/stable'
        )

        quote = client.quote(symbol)
        # symbols = client.ref_data_symbols()
        quote.latest_price;
        # puts symbols.first;
    end

end
