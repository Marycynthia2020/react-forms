
import { useState } from "react";

const INITIAL_STATE = { name: "", email: "", subject: "", message: "" };

const VALIDATION = {
  email: [
    {
      isValid: (value) => !!value,
      message: "Required",
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Needs to be an email.",
    },
  ],
  name: [
    {
      isValid: (value) => !!value,
      message: "Required",
    },
  ],
  message: [
    {
      isValid: (value) => !!value,
      message: "Required",
    },
  ],
};

const getErrorFields = (form) =>
  Object.keys(form).reduce((acc, key) => {
    if (!VALIDATION[key]) return acc;

    const errorsPerField = VALIDATION[key]
      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});

const Forms = (props) => {
  const [submission, setSubmission] = useState(false);

  const [form, setForm] = useState(INITIAL_STATE);

  const errorFields = getErrorFields(form);
  console.log(errorFields);

  const handleChange = (event) => {
    const upDatedForm = {
      ...form,
      [event.target.id]: event.target.value,
    };
    setForm(upDatedForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;
    // console.log(`${form.name} ${form.email} ${form.subject} ${form.message}`)
    props.submitForm(form);
    setSubmission(true);
    setForm(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit} class="form-row">
      {submission && (
        <div style={{ color: "green" }} class="form-control">
          Form succesfully submitted
        </div>
      )}

      <div class="form-group col-md-6">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          class="form-control"
        />
        {errorFields.name?.length ? (
          <span style={{ color: "red" }}>{errorFields.name[0].message}</span>
        ) : null}
      </div>

      <div class="form-group col-md-6">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          class="form-control"
        />
        {errorFields.email?.length ? (
          <span style={{ color: "red" }}>{errorFields.email[0].message}</span>
        ) : null}
      </div>

      <div class="form-group col-md-6">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          class="form-control"
        />
      </div>

      <div class="form-group col-md-6">
        <label htmlFor="message">Message</label>
        <input
          id="message"
          type="text"
          value={form.message}
          onChange={handleChange}
          class="form-control"
        />
        {errorFields.message?.length ? (
          <span style={{ color: "red" }}>{errorFields.message[0].message}</span>
        ) : null}
      </div>

      <div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Forms;
