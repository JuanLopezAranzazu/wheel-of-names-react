import { Participant, ParticipantData } from "../types/Participant";
import ParticipantList from "./ParticipantList";
import ParticipantForm from "./ParticipantForm";
import Wheel from "./Wheel";

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
      <h1>Wheel of Names</h1>
      <p>
        Enter the names of the participants and click on the "Spin" button to
        select a random participant.
      </p>
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
