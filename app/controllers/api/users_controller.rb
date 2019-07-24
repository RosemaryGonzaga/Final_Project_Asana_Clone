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

    def show
        if params[:email]
            # NOTE: need case-insensitive search, hence the user of UPPER and #upcase
            @user = User.where("UPPER(primary_email) LIKE ?", "#{params[:email]}".upcase)
            # debugger
            if @user.empty?
                # debugger
                render json: "User not found"#, status: 200 
                # Question: do I need to send a status at all? if so, what type? 200? 422?
            else
                # debugger
                @user = @user.first
                render :show
            end
        elsif params[:user][:primary_email] && params[:user][:password]
            @user = User.find_by_credentials(params[:user][:primary_email], params[:user][:password])
            if @user
                render :show, status: 200
            else
                render json: 'You have entered your current password incorrectly.', status: 401
            end
        else 
            render json: "You've hit the UsersController#show action and there is no key of :email in the params"#, status: 200 
            # Question: do I need to send a status at all? if so, what type? 200? 422?
        end
    end

    def update
        @user = User.find_by(id: params[:id]) # or update current_user
        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages
        end
    end

    # def destroy
    #     @user = User.find_by(id: params[:id])
    #     if @user.destroy
    #         render :show
    #     else
    #         render json: @user.errors.full_messages
    #     end
    # end

    private
    def user_params
        params.require(:user).permit(:primary_email, :password, :full_name, :photo_url, :pronouns, :role, :department, :about)
    end
end