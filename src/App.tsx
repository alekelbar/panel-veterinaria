import { useEffect, useState } from "react";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { List } from "./components/List";

function App() {
  const [patients, setPatients] = useState<PatientInterface[]>([]);

  const [updateState, setUpdateState] = useState<{
    patient: PatientInterface | null;
    isUpdate: boolean;
  }>({
    patient: null,
    isUpdate: false,
  });

  // Cada que se monta el componente...
  useEffect(() => {
    const items = localStorage.getItem("patients");
    items && setPatients(JSON.parse(items));
    return () => {};
  }, []);

  useEffect(() => {
    if (patients.length > 0)
      localStorage.setItem("patients", JSON.stringify(patients));
    return () => {};
  }, [patients]);

  const handleUpdateState = (
    patient: PatientInterface | null,
    isUpdate: boolean
  ) => {
    setUpdateState({ patient, isUpdate });
  };

  const onSetPatients = (patient: PatientInterface) => {
    setPatients([patient, ...patients]);
  };

  const onRemovePatients = (patient: PatientInterface) => {
    setPatients(patients.filter((p) => p.email !== patient.email));
  };

  const onUpdatePatients = (patient: PatientInterface) => {
    setPatients(patients.map((p) => (p.email === patient.email ? patient : p)));
  };

  return (
    <div className="container mx-auto m-4">
      <Header />
      <div className="sm:flex mt-4">
        <Form
          patients={patients}
          handleUpdateState={handleUpdateState}
          onUpdatePatients={onUpdatePatients}
          update={updateState}
          setPatients={onSetPatients}
        />
        <List
          handleUpdateState={handleUpdateState}
          onRemovePatient={onRemovePatients}
          patients={patients}
        />
      </div>
    </div>
  );
}

export default App;
