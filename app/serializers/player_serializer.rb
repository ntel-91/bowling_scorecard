class PlayerSerializer < ActiveModel::Serializer
  has_many: frames
  attributes :id, :frames 
end
