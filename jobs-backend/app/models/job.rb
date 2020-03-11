class Job < ApplicationRecord
    belongs_to :company, foreign_key: :company_id
    # belongs_to: job_state
    
    has_many :job_states, dependent: :destroy
    has_many :users, through: :job_states

    
end
