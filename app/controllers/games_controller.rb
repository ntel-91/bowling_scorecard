class GamesController < ApplicationController
    protect_from_forgery with: :null_session
    def create
        game = Game.create
        player = Player.create(game_id: game.id, player_name: params[:playerName])
        render json: {game_id: game.id, players: game.players}
    end
end
