class Portfolio < ApplicationRecord
    #validates :user_id, :value, :num_stocks, presence: true, uniqueness: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    def self.get_price(symbol, number)
        client = IEX::Api::Client.new(
        publishable_token: 'Tpk_8ecd293d171f48c793e2a1435a284f9c',
        endpoint: 'https://sandbox.iexapis.com/stable'
        )

        data = client.chart(symbol, '1d', chart_interval: 5)
        graph = []
        average = 0
        data.each do |point|
            average = point.average
            if average.nil?
                graph.push([point.label, graph.last[1]])
            else
                total = (average * number).round(2)
                graph.push([point.label, total.round(2)])
            end    
        end
        return graph
    end


end
