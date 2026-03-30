import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateUser, createUserSchema } from "../model/CreateUserInput";

export const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema), // The "Bridge"
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (data: CreateUser) => {
    console.log("Validated Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <button type="submit">Create</button>
    </form>
  );
};
