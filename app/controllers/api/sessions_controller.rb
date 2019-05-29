require_relative '../../../lib/controller_helpers/auth_error_helpers.rb'    # is this right???

class Api::SessionsController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.find_by_credentials(params[:user][:primary_email], params[:user][:password])
        @errors = validate_email_login(params[:user][:primary_email])   # defined in auth_error_helpers.rb

        if @errors
            render 'api/errors/auth_errors', status: 401
        elsif !@user
            @errors = "The username or password is not correct. Did you forget your password?"
            render 'api/errors/auth_errors', status: 401
        elsif @user     # convert to "else"?
            login!(@user)
            render 'api/users/show', status: 200
        end
    end

    def destroy
        logout!
        redirect_to new_api_session_url
        # or should I render an empty {} upon logout? (BenchBnB instructions)
    end
end