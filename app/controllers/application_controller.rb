class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?
    # remember to use :ensure_logged_in before_action in the other controllers!

    # celll
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def ensure_logged_in
        redirect_to new_api_session_url unless logged_in?   # review this syntax (url helper)
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def logout!
        current_user.reset_session_token! # temporarily comment this out b/c it's not letting me reset my currentUser! --> the fix: change @current_user to current_user
        session[:session_token] = nil
        @current_user = nil
    end

    def logged_in?
        !!current_user
    end
end
