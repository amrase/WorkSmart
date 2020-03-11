class CompaniesController < ApplicationController
    
    require 'jwt'

    def index 
        @companies = Company.all
        render json: @companies
    end
    
    
    def show
        @company = Company.find(params[:id])
        render json: @company
    end    



    def create 
        @company = Company.create(username: params["companyName"], password: params["companyPass"])
        if @company.valid?
            render json: {id: @company.id, type: "company", token: genToken(@company)}
        else 
            render json: {errors: @company.errors.full_messages} 
        end
    end   


    def login
        @company = Company.find_by(username: params[:companyName])
        if @company 
            if @company.authenticate(params["companyPassword"])
                render json: {id: @company.id, type: "company", token: genToken(@company)}
                # render json: {token: genToken(@company)}
            else 
                render json: {errors: ["Password Incorrect"]}
            end
        else 
            render json: {errors: ["Company not found"]}
        end    
    end    
   
    
    private

    def hmac_secret
        'justmyrandompassword'
    end    
    

    def genToken(company)
        payload ={id: @company.id,type: "company"}
        token = JWT.encode payload, hmac_secret, "HS256"
    end

     def token_user_id
        token = request.headers["Authorization"]
        arr = JWT.decode(token, hmac_secret, true, {algorithm: "HS256"})
        arr.first["id"]
    end

end