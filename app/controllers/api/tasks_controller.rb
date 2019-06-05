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
        @tasks = current_user.tasks
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