import React, { useState } from 'react';
import './style.css';

function CandidateForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    cv: null,
  });


  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('cv', formData.cv);

    try {
      const response = await fetch('http://localhost:3001/candidate', {
        method: 'POST',
        body: formDataToSend,
      });

        const responseBody = await response.json();
        setResponseMessage(responseBody["message"]);
  } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      {responseMessage && (
        <div className="alert ">
          {responseMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Last Name"
            className="form-control"
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Description"
            className="form-control"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Email"
            className="form-control"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            accept=".pdf,.docx"
            className="form-control"
            onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CandidateForm;
