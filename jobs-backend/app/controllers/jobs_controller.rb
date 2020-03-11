class JobsController < ApplicationController
    def index
        @jobs = Job.all
        render json: @jobs
    end

    def show
        @job = Job.find_by(id: params[:id])
        render json: @job
    end

    def update
        @job = Job.find_by(id: params[:id])
        @job.update(description: params[:description])
        render json: @job
    end


    def create 
        @job = Job.create(job_params)
        if @job.valid?
            render json: @job
        else 
            render json: {errors: @job.errors.full_messages} 
        end
    end   

    def destroy
        @job = Job.find_by(id: params[:id])
        render json: @job.destroy()
    end

    private


    def job_params
        # params.require(:job).permit(:title,:company_id, :description, :companyName)
        return {
            title: params[:title],
            company_id: params[:company_id],
            post_date: Time.now,
            description: params[:description],
            companyName: params[:companyName]
        }
    end    

end
