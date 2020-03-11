class CompanySerializer < ActiveModel::Serializer
  attributes :id,:username,:password_digest, :logo,:name,:address,:city,:email,:website

  has_many :jobs
  has_many :job_states,through: :jobs

end
