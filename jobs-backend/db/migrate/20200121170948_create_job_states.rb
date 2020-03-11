class CreateJobStates < ActiveRecord::Migration[6.0]
  def change
    create_table :job_states do |t|
      t.string :status
      t.belongs_to :user
      t.belongs_to :job

      t.timestamps
    end
  end
end
