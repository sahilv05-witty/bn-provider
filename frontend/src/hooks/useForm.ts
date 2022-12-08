import { useState } from 'react';

export function useForm<T>(callback: any, initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  const onChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,    
    setFormState,
    formState,
  };
}
