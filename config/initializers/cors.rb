Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://robingoods.herokuapp.com/'

    resource '*',
      headers: :any,
      methods: [:get]
  end
end