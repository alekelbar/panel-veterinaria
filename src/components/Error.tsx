interface ErrorProps {
  errorMessage?: string;
}

export const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <p className="text-white font-bold text-md mt-2 text-center bg-red-500 rounded-lg px-1 py-2">
      {errorMessage}
    </p>
  );
};
