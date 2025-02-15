// datos de los participantes
export type ParticipantData = {
  name: string;
};

// datos de los participantes con un id
export type Participant = ParticipantData & {
  id: string;
};