import { Patient } from "./Patient";

interface ListProps {
  patients: PatientInterface[];
  onRemovePatient: (patient: PatientInterface) => void;
  handleUpdateState: (patient: PatientInterface, isUpdate: boolean) => void;
}

export const List: React.FC<ListProps> = ({
  patients,
  onRemovePatient,
  handleUpdateState,
}) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 h-screen mb-4 sm:overflow-y-auto">
      <div className="text-center mx-auto font-black text-2xl w-1/2">
        Listado pacientes
      </div>
      <p className="text-center">
        administra tus{" "}
        <span className="text-indigo-700">Pacientes y citas</span>
      </p>
      {patients.length === 0 ? (
        <p className="border bg-indigo-700 text-white font-bold text-center mx-3">
          Ningún paciente en seguimiento
        </p>
      ) : null}

      {patients.map((patient) => (
        <Patient
          handleUpdateState={handleUpdateState}
          onRemovePatient={onRemovePatient}
          key={Date.now() + Math.random().toString()}
          patient={patient}
        />
      ))}
    </div>
  );
};
