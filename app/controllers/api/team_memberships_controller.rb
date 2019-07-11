class Api::TeamMembershipsController < ApplicationController
    # def index   # redundant with Teams#index
    #     @team_memberships = current_user.memberships
    # end

    def create
        @team_membership = TeamMembership.new(team_membership_params)
        if @team_membership.save
            render :show
        else
            render json: @team_membership.errors.full_messages
        end
    end

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
        params.require(:team_membership).permit(:team_id, :user_id)
    end
end