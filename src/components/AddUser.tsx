import React, { FormEvent } from "react";

interface AddUserProps {
  onAdd: (name: string, email: string) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onAdd }) => {
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(e.currentTarget.name, e.currentTarget.email.value);
    e.currentTarget.name = "";
    e.currentTarget.email.value = "";
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h3>Add User</h3>
        <input placeholder="Name" name="name" />
        <input placeholder="Email" name="email" />
        <button type="submit">Add</button>
        <hr />
      </form>
    </div>
  );
};

export default AddUser;
