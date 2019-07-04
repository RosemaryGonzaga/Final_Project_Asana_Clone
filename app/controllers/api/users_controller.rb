require_relative '../../../lib/controller_helpers/auth_error_helpers.rb'    # is this right??? --> seems to work...

class Api::UsersController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
        @errors = validate_email_signup(@user.primary_email)  # defined in auth_error_helpers.rb
        
        if @errors
            render 'api/errors/auth_errors', status: 401
        elsif !@user.valid?
            if @user.errors.messages[:primary_email].include?("has already been taken")
                @errors = "Hey there, we’ve already met! Looks like you already have an account. Please sign in."
            else    # not sure if I need this branch?
                @errors = "Something doesn't look right. Please check the email and try again."
            end
            render 'api/errors/auth_errors', status: 401
        elsif @user.save    # convert to "else", or is it better to be explicit here?
            login!(@user)
            render :show, status: 200
        end
    end

    def index
        # @users = User.all   # may refactor later to only fetch current user's teammates
        current_team = Team.find_by(id: params[:team_id])  # structured Ajax request to include teamId in the params
        @users = current_team.members   # this only fetches current user's current team's teammates
    end

    private
    def user_params
        params.require(:user).permit(:primary_email, :password)
    end
end