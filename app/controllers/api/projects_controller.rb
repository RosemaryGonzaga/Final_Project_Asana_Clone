class Api::ProjectsController < ApplicationController
    # def new
    #     @project = Project.new
    # end

    def create
        @project = Project.new(project_params)
        if @project.save
            render :show#, status: 200
        else
            render json: @project.errors.full_messages
            # @errors = @project.errors.full_messages
            # render 'api/errors/auth_errors', status: 401

            # # the long way :(
            # error_msgs = @project.errors.messages.reject { |k, v| v.empty? }
            # @errors = error_msgs.keys.map do |field| 
            #     "#{field.to_s} #{error_msgs[field].first}"
            # end
        end
    end

    def index
        # @projects = Project.all
        # @projects = current_user.projects   # this fetches all projects for which user is the owner --> change this later!
        @projects = current_user.team_projects   # this fetches all projects for all the user's teams / workspaces --> change this later!
        # TO DO: NEED TO REFACTOR to only get all projects for current user's CURRENTLY DISPLAYED TEAM / WORKSPACE
            # OR: leave it like this and filter out team-specific projects on the front end
    end

    def show
        @project = Project.find_by(id: params[:id])
        # need the below conditional in order to avoid serving a 500-level error
        if @project
            render :show
        else
            render json: "Project not found", status: 422
        end
    end

    # def edit
    #     @project = Project.find_by(id: params[:id])
    # end

    def update
        @project = Project.find_by(id: params[:id])
        if @project.update(project_params)
            render :show
        else
            render json: @project.errors.full_messages
        end
    end

    def destroy
        @project = Project.find_by(id: params[:id])
        if @project.destroy
            render :show    # is this the correct response to send back? info about the deleted project?
        else
            render json: @project.errors.full_messages
        end
    end

    private
    def project_params
        params.require(:project).permit(:name, :description, :layout, :privacy, :owner_id, :due_on, :color, :team_id)
    end
end