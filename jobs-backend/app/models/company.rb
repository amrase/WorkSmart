class Company < ApplicationRecord
    has_secure_password
    has_many :jobs, dependent: :destroy
    has_many :job_states,through: :jobs

    has_many :users ,through: :job_states


    # validates :username, uniqueness: {message: "must be unique"}
    validates :username, presence: {message: "can't be blank"}
    validates :password, presence: {message: "can't be blank"}
end
