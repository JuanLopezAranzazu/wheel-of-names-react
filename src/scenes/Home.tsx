import { Participant, ParticipantData } from "../types/Participant";
import ParticipantList from "./../components/ParticipantList";
import ParticipantForm from "./../components/ParticipantForm";
import Wheel from "./../components/Wheel";

type HomeProps = {
  participants: Participant[];
  onAddParticipant: (data: ParticipantData) => void;
  onDeleteParticipant: (id: string) => void;
  sortedParticipants: () => void;
  shuffleParticipants: () => void;
};

const Home = ({
  participants,
  onAddParticipant,
  onDeleteParticipant,
  sortedParticipants,
  shuffleParticipants,
}: HomeProps) => {
  return (
    <div className="home">
      <div className="home-content">
        <Wheel participants={participants} />
        <div className="participant-content">
          <ParticipantForm onAddParticipant={onAddParticipant} />
          <ParticipantList
            participants={participants}
            onDeleteParticipant={onDeleteParticipant}
            sortedParticipants={sortedParticipants}
            shuffleParticipants={shuffleParticipants}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
