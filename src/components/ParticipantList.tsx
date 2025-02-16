import { Participant } from "../types/Participant";
import ParticipantItem from "./ParticipantItem";

type ParticipantListProps = {
  participants: Participant[];
  onDeleteParticipant: (id: string) => void;
  sortedParticipants: () => void;
  shuffleParticipants: () => void;
};

const ParticipantList = ({
  participants,
  onDeleteParticipant,
  sortedParticipants,
  shuffleParticipants,
}: ParticipantListProps) => {
  const hasParticipants = participants.length > 0;

  return (
    <div className="participant-list">
      <div className="participant-list-controls">
        <button onClick={sortedParticipants} disabled={!hasParticipants}>
          Sort
        </button>
        <button onClick={shuffleParticipants} disabled={!hasParticipants}>
          Shuffle
        </button>
      </div>
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
