# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  primary_email   :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  full_name       :string
#  photo_url       :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    validates :primary_email, :password_digest, :session_token, presence: true
    validates :primary_email, :session_token, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    after_initialize :ensure_session_token
    attr_reader :password

    # may need to rewrite this later to allow for many-to-many association...
    has_many :projects,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :Project

    has_many :assigned_tasks,
        primary_key: :id,
        foreign_key: :assignee_id,
        class_name: :Task

    has_many :project_tasks,
        through: :projects,
        source: :tasks

    has_many :memberships,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :TeamMemberships

    has_many :teams,
        through: :memberships,
        source: :team

    has_many :team_projects
        through: :teams,
        source: :projects

    has_many :favorited_project_associations,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :FavoritedProject

    has_many :favorite_projects
        through: :favorited_project_associations
        source: :project

    # figvaper

    # class methods

    def self.find_by_credentials(primary_email, password)
        user = User.find_by(primary_email: primary_email)
        (user && user.is_password?(password)) ? user : nil
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64(16)
    end

    # instance methods

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        password_obj = BCrypt::Password.new(self.password_digest)
        password_obj.is_password?(password)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!          # forgot to save to DB!
        self.session_token  # forgot to return session_token!
    end
end
