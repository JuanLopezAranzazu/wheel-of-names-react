import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Error 404</h1>
      <button type="button" onClick={goBack}>
        Go back
      </button>
    </div>
  );
};

export default Missing;
