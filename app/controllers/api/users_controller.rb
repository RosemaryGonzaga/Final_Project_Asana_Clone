class Api::UsersController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            # redirect to projects index page?
        else
            # render json: ["Invalid username or password"], status: 401
            render @user.errors # is this right?
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end