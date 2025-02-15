import { useState } from "react";
import { ParticipantData } from "../types/Participant";
import { FormErrors } from "../types/FormErrors";

type ParticipantFormProps = {
  onAddParticipant: (data: ParticipantData) => void;
};

const specialCharPattern = /[^a-zA-Z0-9 ]/;

const ParticipantList = ({ onAddParticipant }: ParticipantFormProps) => {
  const [formValues, setFormValues] = useState<ParticipantData>({
    name: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({ name: "" });

  // actualiza el estado de formValues con el valor del input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const errors = { ...formErrors };

    switch (name) {
      case "name":
        if (value.length < 3) {
          errors.name = "The name is very short";
        } else if (specialCharPattern.test(value)) {
          errors.name = "The name contains special characters";
        } else {
          errors.name = "";
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  // valida que el formulario no tenga errores
  const validateForm = (errors: FormErrors): boolean => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  // envía el formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formErrors)) {
      console.log("Invalid form");
      return;
    }
    onAddParticipant(formValues);
    setFormValues({ name: "" });
    setFormErrors({ name: "" });
  };

  return (
    <div className="participant-form">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={formValues.name}
            name="name"
            placeholder="Name..."
            onChange={handleChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
            required
          />
          {formErrors.name && <span>{formErrors.name}</span>}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ParticipantList;
