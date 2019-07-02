class Api::TeamsController < ApplicationController
    def index
        @teams = current_user.teams
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
        params.require(:team).permit(:name, :description, :privacy)
    end
end