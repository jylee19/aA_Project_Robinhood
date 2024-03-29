# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_28_045736) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "holders", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_holders_on_user_id", unique: true
  end

  create_table "portfolios", force: :cascade do |t|
    t.integer "user_id", null: false
    t.float "value", null: false
    t.integer "num_stocks", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "funds"
    t.float "prev_close"
    t.string "graph_data", default: [], array: true
    t.string "assets_owned", default: [], array: true
    t.index ["user_id"], name: "index_portfolios_on_user_id", unique: true
  end

  create_table "stocks", force: :cascade do |t|
    t.string "NYSE_abv", null: false
    t.integer "portfolio_id"
    t.float "value", null: false
    t.string "comp_description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "number"
    t.float "purchase_price"
    t.float "current_price"
    t.float "previous_close"
    t.string "company_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.integer "trades_made_today", null: false
    t.integer "total_trades_made", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "portfolio_id"
    t.index ["email"], name: "index_users_on_email"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username", "email"], name: "index_users_on_username_and_email", unique: true
  end

end
