class Api::TeamMembershipsController < ApplicationController
    # def index   # redundant with Teams#index
    #     @team_memberships = current_user.memberships
    # end

    # def create_helper(membership_params)
    #     @team_membership = TeamMembership.new(membership_params)
    #     if @team_membership.save
    #         render :show
    #     else
    #         render json: @team_membership.errors.full_messages
    #     end
    # end

    def create
        # debugger
        if params[:team_membership][:emails]
            # iterate through each email and create at team_membership for each one (if they're in DB)
            @users = []
            params[:team_membership][:emails].each do |email|
                # check if email is in DB
                user = User.where("UPPER(primary_email) LIKE ?", "#{email}".upcase)
                if user.empty?
                    next
                else
                    user = user.first   # user is an ActiveRecord collection
                    @users.push(user)   # add user to @users array
                    # Also create membership...
                    # debugger
                    membership_params = { team_id: team_membership_params[:team_id], user_id: user.id }
                    team_membership = TeamMembership.new(membership_params)
                    team_membership.save # to think about later: store errors in array and serve back to front end?
                    # create_helper({ team_id: team_membership_params[:team_id], user_id: user.id })
                    # NEXT STEPS: REFACTOR NewTeamForm
                end
            end
            # debugger
            render 'api/users/index', status: 200
        else
            # create team_membership for the one user
            @team_membership = TeamMembership.new(team_membership_params)
            if @team_membership.save
                render :show
                # should I send back the user info instead? (this would be consistent with the above branch of code)
            else
                render json: @team_membership.errors.full_messages
            end
        end
    end

    # def create
    #     @team_membership = TeamMembership.new(team_membership_params)
    #     if @team_membership.save
    #         render :show
    #     else
    #         render json: @team_membership.errors.full_messages
    #     end
    # end

    def destroy
        # @team_membership = TeamMembership.find_by(id: params[:id])  # refactored AJAX to take in team_id and user_id instead of the team_membership_id
        @team_membership = TeamMembership.where("team_id = #{team_membership_params[:team_id]} AND 
                                                user_id = #{team_membership_params[:user_id]}")
        @team_membership = @team_membership.first
        if @team_membership.destroy
            render :show
        else
            render json: @team_membership.errors.full_messages
        end
    end

    private
    def team_membership_params
        # params.require(:team_membership).permit(:team_id, :user_id)
        params.require(:team_membership).permit(:team_id, :user_id, :emails)
    end
end