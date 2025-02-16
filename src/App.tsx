import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./scenes/Home";
import Missing from "./scenes/Missing";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Participant, ParticipantData } from "./types/Participant";
import { v4 as uuidV4 } from "uuid";

function App() {
  // lista de participantes
  const [participants, setParticipants] = useLocalStorage<Participant[]>(
    "participants",
    []
  );

  // adicionar participante
  const onAddParticipant = (data: ParticipantData) => {
    setParticipants((prevParticipants) => {
      return [...prevParticipants, { id: uuidV4(), ...data }];
    });
  };

  // eliminar participante
  const onDeleteParticipant = (id: string) => {
    setParticipants((prevParticipants) => {
      return prevParticipants.filter((participant) => participant.id !== id);
    });
  };

  // ordenar participantes por nombre
  const sortedParticipants = () => {
    setParticipants((prevParticipants) => {
      const sorted = [...prevParticipants].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return sorted;
    });
  };

  // ordenar participantes aleatoriamente
  const shuffleParticipants = () => {
    setParticipants((prevParticipants) => {
      const shuffled = [...prevParticipants].sort(() => Math.random() - 0.5);
      return shuffled;
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home
              participants={participants}
              onAddParticipant={onAddParticipant}
              onDeleteParticipant={onDeleteParticipant}
              sortedParticipants={sortedParticipants}
              shuffleParticipants={shuffleParticipants}
            />
          }
        />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
