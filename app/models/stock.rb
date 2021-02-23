require 'rubygems'


class Stock < ApplicationRecord
    # client = IEX::Api::Client.new(
    #  publishable_token: 'pk_d6ac2345a70741dd9e38b135c73547dd',
    #  endpoint: 'https://sandbox.iexapis.com/stable'
    # )

    def stock_price
            client = IEX::Api::Client.new(
     publishable_token: 'Tpk_8ecd293d171f48c793e2a1435a284f9c',
     endpoint: 'https://sandbox.iexapis.com/stable'
    )

        quote = client.quote('AAPL')
        symbols = client.ref_data_symbols()
        puts quote.latest_price;
        puts symbols.first;
    end

end
