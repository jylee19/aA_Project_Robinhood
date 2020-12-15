class Portfolio < ApplicationRecord
    #validates :user_id, :value, :num_stocks, presence: true, uniqueness: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    def ob_price

    end

    def ob_num

    end

end
