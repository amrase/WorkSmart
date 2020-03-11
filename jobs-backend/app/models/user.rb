class User < ApplicationRecord
    has_secure_password
    has_many :job_states, dependent: :destroy
    has_many :jobs, through: :job_states
    has_many :companies,through: :jobs

    validates :username, uniqueness: {message: "must be unique"}
    validates :username, presence: {message: "can't be blank"}
    # validates :password, presence: {message: "can't be blank"}
end
