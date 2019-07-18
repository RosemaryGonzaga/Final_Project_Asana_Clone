class Api::TeamsController < ApplicationController
    def index
        @teams = current_user.teams
        # debugger
    end

    def show
        @team = Team.find_by(id: params[:id])
        if @team
            render :show
        else
            render json: "Team not found", status: 422
        end
    end

    def create
        @team = Team.new(team_params)
        if @team.save
            render :show
        else
            render json: @team.errors.full_messages
        end
    end

    def update
        @team = Team.find_by(id: params[:id])
        if @team.update(team_params)
            render :show
        else
            render json: @team.errors.full_messages
        end
    end

    def destroy
        @team = Team.find_by(id: params[:id])
        if @team.destroy
            render :show
        else
            render json: @team.errors.full_messages
        end
    end

    private
    def team_params
        params.require(:team).permit(:name, :description)
        # params.require(:team).permit(:name, :description, :privacy)   # not sure if :description and :privacy are needed -> these fields don't appear in the create / manage workspace forms
    end
end

# # CODE FOR TESTING CONTROLLER ACTIONS IN CHROME CONSOLE
# let team_params = {
#     name: 'Manhattan',
#     description: 'one of the 4th floor pods',
# }

# $.ajax({
#     method: 'POST',
#     url: '/api/teams',
#     data: { team: team_params },
# })