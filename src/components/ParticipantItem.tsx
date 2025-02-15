import { Participant } from "../types/Participant";

type ParticipantListProps = {
  participant: Participant;
  onDeleteParticipant: (id: string) => void;
};

const ParticipantList = ({
  participant,
  onDeleteParticipant,
}: ParticipantListProps) => {
  return (
    <div className="participant-item">
      {participant.name}
      <button onClick={() => onDeleteParticipant(participant.id)}>
        Delete
      </button>
    </div>
  );
};

export default ParticipantList;
