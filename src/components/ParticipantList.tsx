import { Participant } from "../types/Participant";
import ParticipantItem from "./ParticipantItem";

type ParticipantListProps = {
  participants: Participant[];
  onDeleteParticipant: (id: string) => void;
};

const ParticipantList = ({
  participants,
  onDeleteParticipant,
}: ParticipantListProps) => {
  return (
    <div className="participant-list">
      {participants.length === 0 ? (
        <p>No participants</p>
      ) : (
        participants.map((participant) => (
          <ParticipantItem
            key={participant.id}
            participant={participant}
            onDeleteParticipant={onDeleteParticipant}
          />
        ))
      )}
    </div>
  );
};

export default ParticipantList;
