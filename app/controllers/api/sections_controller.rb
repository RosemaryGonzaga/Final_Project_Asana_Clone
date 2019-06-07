class Api::SectionsController < ApplicationController

    def create
        @section = Section.new(section_params)
        # debugger
        if @section.save
            # debugger
            render :show
        else
            # debugger
            render json: @section.errors.full_messages
        end
    end

    def index
        # @sections = current_user.sections
        # debugger
        current_project = Project.find_by(id: params[:project_id])  # need to structure Ajax request to include projectId in the params
        @sections = current_project.sections
        # render :index
        # render 'api/sections/index.json.jbuilder'
        # render 'api/sections/index'
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
        # debugger
        params.require(:section).permit(:name, :description, :layout, :project_id, :assignee_id, :due_on, :completed, :completed_at)
    end
end


# # JS code for manual testing w/ AJAX functions in Chrome console:
# let section_params = {
#     name: 'another section',
#     description: 'descriptive description',
#     layout: 'board',
#     projectId: 62,
#     assigneeId: 15,
#     dueOn: new Date(),
#     completed: false,
# }

# $.ajax({
#     method: 'POST',
#     url: '/api/sections',
#     data: {
#         section: section_params
#     }
# })

# $.ajax({
#     method: 'GET',
#     url: '/api/sections',
#     data: { project_id: 62 }
# })

# $.ajax({
#     method: 'GET',
#     url: '/api/sections/1',
# })

# $.ajax({
#     method: 'PATCH',
#     url: '/api/sections/2',
#     data: {
#         section: section_params
#     }
# })

# $.ajax({
#     method: 'DELETE',
#     url: '/api/sections/3',
# })