import { useState } from "react";

export function useEdit() {
  const [form, setForm] = useState({
    name: "",
  });

  function handleChange(field: string, value: any) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit() {
    console.log("Salvando:", form);
  }

  return {
    form,
    handleChange,
    handleSubmit,
  };
}