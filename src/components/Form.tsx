import { useEffect, useState } from "react";
import { Error } from "./Error";

interface FormProps {
  setPatients: (patient: PatientInterface) => void;
  update: {
    patient: PatientInterface | null;
    isUpdate: boolean;
  };
  onUpdatePatients: (patient: PatientInterface) => void;
  handleUpdateState: (
    patient: PatientInterface | null,
    isUpdate: boolean
  ) => void;
  patients: PatientInterface[];
}

const initialInputState = {
  petName: "",
  ownerName: "",
  email: "",
  hight: "",
  sintoms: "",
};

export const Form: React.FC<FormProps> = ({
  setPatients,
  update,
  onUpdatePatients,
  handleUpdateState,
  patients,
}) => {
  const [inputState, setInputState] = useState(initialInputState);

  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    if (update.isUpdate) {
      setInputState(update.patient!);
    }
  }, [update]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    const elements = Object.values(inputState);
    if (!elements.every((e) => e.trim() !== "")) {
      setErrorText("Todos los campos son requeridos");
      setError(true);
      return;
    }

    if (patients.some((e) => e.email == inputState.email) && !update.isUpdate) {
      setErrorText("Ese paciente ya se encuentra registrado");
      setError(true);
      return;
    }

    if (update.isUpdate) {
      onUpdatePatients(inputState);
      handleUpdateState(null, false);
    } else {
      setPatients(inputState);
    }
    setInputState(initialInputState);
  };

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-2xl text-center">Seguimiento pacientes</h2>
      <p className="text-sm mt-1 text-center">
        Añade tus pacientes y{" "}
        <span className="text-indigo-700">administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="mb-2 px-2 py-3 shadow-lg bg-white rounded-lg"
      >
        {error && <Error errorMessage={errorText} />}

        <div>
          <label
            className="mt-1 font-medium uppercase text-start block"
            htmlFor="mascota"
          >
            Nombre mascota
          </label>
          <input
            value={inputState.petName}
            onChange={handleChange}
            name={"petName"}
            className="px-2 py-2 mt-1 w-full border-2 placeholder-gray-800 rounded-md"
            id="mascota"
            placeholder="Nombre de la mascota"
            type="text"
          />

          <label
            className="mt-1 font-medium uppercase text-start block"
            htmlFor="propietario"
          >
            Nombre propietario
          </label>
          <input
            value={inputState.ownerName}
            onChange={handleChange}
            name={"ownerName"}
            className="px-2 py-2 mt-1 w-full border-2 placeholder-gray-800 rounded-md"
            id="propietario"
            placeholder="Nombre del propietario"
            type="text"
          />

          <label
            className="mt-1 font-medium uppercase text-start block"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={inputState.email}
            onChange={handleChange}
            name={"email"}
            className="px-2 py-2 mt-1 w-full border-2 placeholder-gray-800 rounded-md"
            id="email"
            placeholder="Email"
            type="email"
          />

          <label
            className="mt-1 font-medium uppercase text-start block"
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            value={inputState.hight}
            onChange={handleChange}
            name={"hight"}
            className="px-2 py-2 mt-1 w-full border-2 placeholder-gray-800 rounded-md"
            id="alta"
            type="date"
          />

          <label
            className="mt-1 font-medium uppercase text-start block"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            value={inputState.sintoms}
            onChange={handleChange}
            name={"sintoms"}
            className="px-2 py-2 mt-1 w-full border-2 placeholder-gray-800 rounded-md"
            id="sintomas"
            placeholder="¿Cuáles son sus sintomas?"
          ></textarea>

          <input
            onChange={handleChange}
            className="bg-indigo-700 text-white w-full p-2 text-bold cursor-pointer hover:bg-indigo-900 transition-all"
            type="submit"
            value={update.isUpdate ? "Editar Paciente" : "Agregar Paciente"}
          />
        </div>
      </form>
    </div>
  );
};
