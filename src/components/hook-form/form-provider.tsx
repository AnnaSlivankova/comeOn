import {FormProvider as Form, UseFormReturn} from "react-hook-form";
import {ReactNode} from "react";

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}

export default function FormProvider({children, methods, onSubmit}: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  )
}