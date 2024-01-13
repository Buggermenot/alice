import { Label, Input, InputProps } from ".";

interface InputControlProps extends InputProps {
  label: string;
}

export const InputControl: React.FC<InputControlProps> = ({
  label,
  ...props
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...props} />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quis.
      </p>
    </div>
  );
};
