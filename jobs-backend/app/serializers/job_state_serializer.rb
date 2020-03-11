class JobStateSerializer < ActiveModel::Serializer
  attributes :id, :status, :job, :user
  belongs_to :job
  belongs_to :user
end
