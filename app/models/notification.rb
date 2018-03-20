class Notification < ApplicationRecord
  acts_as_readable on: :created_at

  belongs_to :recipient, class_name: "User"
  belongs_to :actor, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  scope :recent, -> { order(created_at: :desc).limit(10) }

  after_commit -> { NotificationRelayJob.perform_later(self) }
end
