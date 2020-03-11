class JobSerializer < ActiveModel::Serializer
  attributes :id, :title, :post_date, :description, :companyName
  belongs_to :company
  has_many :job_states


end
