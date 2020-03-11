class JobStatesController < ApplicationController
    def index
        @job_states =  JobState.all
        render json: @job_states
    end

    def create
        @job_state = JobState.create(user_id: params[:user_id], job_id: params[:job_id], status: params[:status])
        render json: @job_state
    end

    def update
        @job_state = JobState.find_by(id: params[:id])
        @job_state.update(status: params[:status])
        render json: @job_state
    end

    def destroy
        @job_state = JobState.find_by(id: params[:id])
        render json: @job_state.destroy()
    end
end
