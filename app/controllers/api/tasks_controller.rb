class Api::TasksController < ApplicationController

    def create
        @task = Task.new(task_params)
        if @task.save
            render :show
        else
            render json: @task.errors.full_messages
        end
    end

    def index
        @tasks = current_user.project_tasks # get user's project_tasks, which encompasses their assigned_tasks
    end

    def show
        @task = Task.find_by(id: params[:id])
        # below is copied from ProjectsController --> is it necessary?
        if @task
            render :show
        else
            render json: "Task not found", status: 422
        end
    end

    def update
        @task = Task.find_by(id: params[:id])
        if @task.update(task_params)
            render :show
        else
            render json: @task.errors.full_messages
        end
    end

    def destroy
        @task = Task.find_by(id: params[:id])
        if @task.destroy
            render :show
        else
            render json: @task.errors.full_messages
        end
    end

    private
    def task_params
        params.require(:task).permit(:name, :description, :project_id, :section_id, :assignee_id, :due_on, :completed, :completed_at)
    end
end


# # JS code for manual testing w/ AJAX functions in Chrome console:
# let task_params = {
#     name: 'first task',
#     description: 'optional',
#     project_id: 62,
#     section_id: 1,
#     assignee_id: 15,
#     due_on: new Date(),
#     completed: false,
# }

# $.ajax({
#     method: 'POST',
#     url: '/api/tasks',
#     data: {
#         task: task_params
#     }
# })

# $.ajax({
#     method: 'GET',
#     url: '/api/tasks',
# })

# $.ajax({
#     method: 'GET',
#     url: '/api/tasks/1',
# })

# $.ajax({
#     method: 'PATCH',
#     url: '/api/tasks/1',
#     data: {
#         task: task_params
#     }
# })

# $.ajax({
#     method: 'DELETE',
#     url: '/api/tasks/1',
# })