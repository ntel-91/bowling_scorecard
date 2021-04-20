require 'rails_helper'

RSpec.describe Player, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
    
    context 'can bowl' do
        it 'a scratch game' do
            current_game = Game.create
            player = Player.create(game_id: current_game.id)
            20.times do
                player.add_shot('0')
                player.reload
            end
            expect(player.final_score).to eq(0)
        end
    end

    context 'a spare' do
        it 'adds next shot to frame score' do
            current_game = Game.create
            player = Player.create(game_id: current_game.id)
            
            3.times do 
                player.add_shot('5')
                player.reload
            end
            expect(player.frames.first.score).to eq(15)
        end
    end

    context 'a strike' do
        it 'adds next two shots to frame score when next frame is not strike' do
            current_game = Game.create
            player = Player.create(game_id: current_game.id)

            player.add_shot('10')
            player.reload
            2.times do
                player.add_shot('4')
                player.reload
            end
            expect(player.frames.first.score).to eq(18)
        end

        it 'adds next two shots to frame score when next frame is strike' do
            current_game = Game.create
            player = Player.create(game_id: current_game.id)

            2.times do
                player.add_shot('10')
                player.reload
            end
            player.add_shot('5')
            player.reload
            expect(player.frames.first.score).to eq(25)
        end
    end

    context 'bonus shot is given when' do
        current_game = Game.create
        player = Player.create(game_id: current_game.id)
        
        it 'last frame is spare' do
            18.times do
                player.add_shot('0')
                player.reload
            end

            3.times do
                player.add_shot('5')
                player.reload
            end
            expect(player.final_score).to eq(15)
        end

        it 'last frame first shot is strike' do
            18.times do
                player.add_shot('0')
                player.reload
            end

            player.add_shot('10')
            player.reload
            2.times do 
                player.add_shot('4')
            end
            expect(player.final_score).to eq(18)
        end
    end


end
