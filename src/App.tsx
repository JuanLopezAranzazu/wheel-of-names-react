import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Missing from "./components/Missing";
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
            />
          }
        />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
