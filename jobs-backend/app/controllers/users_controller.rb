class UsersController < ApplicationController

    require 'jwt'

    def index
        @users = User.all
        render json: @users
    end

    def destroy
        @user = User.find_by(id: params[:id])
        @user.destroy()
        render json: @user 
    end

    def update
        @user = User.find_by(id: params[:id])
        match = User.all.map{|user|
            user.username
        }.find{|username|
            username == params[:username]
        }
        if match
            render json: {error: "Someone already has that username"}
        else
            @user.update(username: params[:username])
            @user.save
            render json: @user
        end
    end

    def show
        if params[:id].to_i == token_user_id
            @user = User.find_by(id: params[:id])
            render json: @user
        else
            render json: {go_away: true}, status: :unauthorized
        end
    end

    def login
        @user = User.find_by(username: params[:username])
        if @user
            if @user.authenticate(params["password"])
                render json: {id: @user.id, type: "user", token: genToken(@user)}
            else
                render json: {errors: ["Password incorrect"]}
            end
            
        else
            render json: {errors: ["Did not find a user matching that username"]}
        end
    end

    def create
        @user = User.create(username: params[:username], password: params[:password])
        if @user.valid?
            render json: {id: @user.id, type: "user", token: genToken(@user)}
        else 
            render json: {errors: @user.errors.full_messages}
        end
    end

    private
    def hmac_secret
        "yeetOnTheHaters"
    end

    def genToken(user)
        payload = {id: @user.id, type: "user"}
        token = JWT.encode payload, hmac_secret, "HS256"
    end

    def token_user_id
        token = request.headers["Authorization"]
        arr = JWT.decode(token, hmac_secret, true, {algorithm: "HS256"})
        arr.first["id"]
    end
end
