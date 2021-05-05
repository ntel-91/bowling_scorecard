class PlayersController < ApplicationController
    protect_from_forgery with: :null_session

    def create
        player = Player.find(params[:currentPlayerId])
        begin 
            frames = player.add_shot(params[:score])
            render json: {frames: frames, final_score: player.final_score}
        rescue StandardError => e 
            render json: {error: true, exception: e.message}, status: 400
        end
    end
end