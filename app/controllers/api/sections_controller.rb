class Api::SectionsController < ApplicationController

    def create
        @section = Section.new(section_params)
        if @section.save
            render :show
        else
            render json: @section.errors.full_messages
        end
    end

    def index
        # @sections = current_user.sections
        current_project = Project.find_by(project_id: params[:section][:project_id])  # need to structure Ajax request to include projectId in the params
        @sections = current_project.sections
    end

    def show
        @section = Section.find_by(id: params[:id])
        # below is copied from ProjectsController --> is it necessary?
        if @section
            render :show
        else
            render json: "Section not found", status: 422
        end
    end

    def update
        @section = Section.find_by(id: params[:id])
        if @section.update(section_params)
            render :show
        else
            render json: @section.errors.full_messages
        end
    end

    def destroy
        @section = Section.find_by(id: params[:id])
        if @section.destroy
            render :show
        else
            render json: @section.errors.full_messages
        end
    end

    private
    def section_params
        params.require(:section).permit(:name, :description, :layout, :project_id, :assignee_id, :due_on, :completed, :completed_at)
    end
end