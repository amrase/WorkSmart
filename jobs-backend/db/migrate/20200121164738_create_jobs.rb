class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :company
      t.integer :company_id
      t.datetime :post_date
      t.string :description

      t.timestamps
    end
  end
end
