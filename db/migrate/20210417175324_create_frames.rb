class CreateFrames < ActiveRecord::Migration[6.0]
  def change
    create_table :frames do |t|
      t.integer :frame_number
      t.integer :shot_1
      t.integer :shot_2
      t.integer :shot_3
      t.integer :score
      t.boolean :frame_complete
      t.boolean :is_spare
      t.boolean :is_strike
      t.belongs_to :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
