class Player < ApplicationRecord
    belongs_to :game
    has_many :frames

    NUMBER_PINS = 10
    NUMBER_FRAMES = 10

    def add_shot pins_knocked
        current_shot = pins_knocked.to_i
        raise(StandardError, "Invalid Input") if !valid_pin_num?(current_shot)
        player = Player.find(self.id)
        if self.frames.size == 0
            Frame.create(player_id: self.id, shot_1: current_shot, frame_complete: false, frame_number: 1, score: 0, is_strike: is_strike?(current_shot))
        else
            update_frames(current_shot)
        end
        player.frames.sort_by{ |f| f.frame_number}
    end

    private

    def update_frames pins_knocked
        current_max_frame = self.frames.max_by {|f| f.frame_number }
        if (current_max_frame.frame_complete || (current_max_frame.is_spare && !last_frame?(current_max_frame)) || (current_max_frame.is_strike && !last_frame?(current_max_frame)))
            new_frame_num = current_max_frame.frame_number + 1
            Frame.create(player_id: self.id, shot_1: pins_knocked, frame_complete: false, frame_number: new_frame_num, is_strike: is_strike?(pins_knocked))
        else
            raise(StandardError, "Invalid Shot") if !valid_shot?(current_max_frame, pins_knocked, last_frame?(current_max_frame))
            if last_frame?(current_max_frame)
                if second_shot_complete?(current_max_frame)
                    current_max_frame.update(shot_3: pins_knocked)
                else
                    current_max_frame.update(shot_2: pins_knocked)
                end
            else
                current_max_frame.update(shot_2: pins_knocked)
            end
        end
        self.reload
        calc_score(self.frames)
    end

    def calc_score frames
        unfinished_frames = frames.select { |f| !f.frame_complete}.sort_by{|f| f.frame_number}
        current_score = 0
        if unfinished_frames.length != frames.length
            current_score = frames.select { |f| f.frame_complete}.sort_by{|f| f.frame_number}.last.score
        end
        unfinished_frames.each_with_index do |f, i|
            if is_strike?(f.shot_1)
                next_frame = unfinished_frames[i + 1]
                if last_frame?(f) && third_shot_complete?(f)
                    if second_shot_complete?(f) 
                        current_score = current_score + f.shot_1 + f.shot_2 + f.shot_3
                        f.update(score: current_score, frame_complete: true)
                    end
                elsif next_frame
                    if next_frame.is_strike
                        next_next_frame = unfinished_frames[i + 2]
                        if last_frame?(next_frame) 
                            if second_shot_complete?(next_frame)
                                current_score = current_score + NUMBER_PINS + next_frame.shot_1 + next_frame.shot_2
                                f.update(score: current_score, frame_complete: true)
                            end
                        elsif next_next_frame
                            current_score = current_score + NUMBER_PINS + NUMBER_PINS + next_next_frame.shot_1
                            f.update(score: current_score, frame_complete: true)
                        end
                    elsif second_shot_complete?(next_frame)
                        current_score = current_score + NUMBER_PINS + next_frame.shot_1 + next_frame.shot_2
                        f.update(score: current_score, frame_complete: true)
                    end
                end

            
            elsif second_shot_complete?(f)
                if is_spare?(f)
                    f.update(is_spare: true)
                    if last_frame?(f) && third_shot_complete?(f)
                        current_score = current_score + f.shot_1 + f.shot_2 + f.shot_3
                        f.update(score: current_score, frame_complete: true)
                    else
                        next_frame = unfinished_frames[i + 1]
                        if next_frame
                            current_score = current_score + NUMBER_PINS + next_frame.shot_1
                            f.update(score: current_score, frame_complete: true)
                        end
                    end
                else
                    current_score = current_score + f.shot_1 + f.shot_2
                    f.update(score: current_score, frame_complete: true)

                end
            end
        end

        if self.frames.length == NUMBER_FRAMES
            last_frame = self.frames.find_by(frame_number: NUMBER_FRAMES)
            if last_frame.frame_complete
                self.update(final_score: last_frame.score)
            end
        end
        
    end

    # TODO: MOVE TO METHODS IN FRAME CLASS

    def second_shot_complete? frame
        frame.shot_2 != nil
    end

    def third_shot_complete? frame
        frame.shot_3 != nil
    end

    def is_strike? shot
        shot == NUMBER_PINS
    end

    def is_spare? frame
        frame.shot_1 + frame.shot_2 == NUMBER_PINS
    end

    def last_frame? frame
        frame.frame_number == 10
    end

    def valid_pin_num? pins
        pins >= 0 && pins <= 10
    end

    def valid_shot? frame, shot, last_frame
        if last_frame
            if frame.shot_2 == nil
                remaining = frame.shot_1 == NUMBER_PINS ? NUMBER_PINS : NUMBER_PINS - frame.shot_1
                valid = remaining >= shot
                return valid
            elsif !frame.frame_complete
                remaining = frame.is_spare ? NUMBER_PINS : frame.shot_2 == NUMBER_PINS ? NUMBER_PINS : NUMBER_PINS - frame.shot_2
                valid = remaining >= shot
            end
        else
            remaining = NUMBER_PINS - frame.shot_1
            valid = remaining >= shot
            return valid
        end
    end

end
