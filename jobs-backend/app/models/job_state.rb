class JobState < ApplicationRecord
    belongs_to :user
    belongs_to :job

    validates :job_id, uniqueness: {scope: :user_id}

    # has_one :jobs
    # has_many :companies, through: :jobs
end
