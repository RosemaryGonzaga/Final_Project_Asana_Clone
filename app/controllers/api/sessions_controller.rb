class Api::SessionsController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user
            login!(@user)
        else
            render json: ["Invalid credentials"]
        end
    end

    def destroy
        logout!
        redirect_to new_api_session_url
    end
end