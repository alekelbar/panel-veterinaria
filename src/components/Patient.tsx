interface PatientProps {
  patient: PatientInterface;
  onRemovePatient: (patient: PatientInterface) => void;
  handleUpdateState: (patient: PatientInterface, isUpdate: boolean) => void;
}

export const Patient: React.FC<PatientProps> = ({
  patient,
  onRemovePatient,
  handleUpdateState,
}) => {
  return (
    <div className="bg-white shadow-lg m-3 px-3 py-3">
      <p className="font-bold uppercase mt-2">
        Nombre:{" "}
        <span className="font-normal normal-case">{patient.petName}</span>
      </p>
      <p className="font-bold uppercase mt-2">
        Propietario:{" "}
        <span className="font-normal normal-case">{patient.ownerName}</span>
      </p>
      <p className="font-bold uppercase mt-2">
        Email: <span className="font-normal normal-case">{patient.email}</span>
      </p>
      <p className="font-bold uppercase mt-2">
        Alta: <span className="font-normal normal-case">{patient.hight}</span>
      </p>
      <p className="font-bold uppercase mt-2">
        sintomas:{" "}
        <span className="font-normal normal-case">{patient.sintoms}</span>
      </p>

      <input
        onClick={() => handleUpdateState(patient, true)}
        type="button"
        value={"editar"}
        className="bg-blue-700 hover:bg-blue-800 rounded-lg px-2 py-1 text-center font-bold text-white uppercase m-2"
      />

      <input
        onClick={() => onRemovePatient(patient)}
        type="button"
        value={"eliminar"}
        className="bg-red-700 rounded-lg px-2 py-1 text-center font-bold text-white uppercase m-2 hover:bg-red-800"
      />
    </div>
  );
};
