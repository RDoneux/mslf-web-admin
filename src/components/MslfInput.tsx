import { Input } from '@material-tailwind/react';

interface MslfInputProps {
  value?: string;
  onChange: (value: string) => void;
  type?: string;
  label: string;
  error?: boolean;
}

export default function MslfInput({
  value,
  type = 'text',
  label,
  error,
  onChange
}: MslfInputProps) {
  return (
    <Input
      type={type}
      variant="standard"
      color="orange"
      label={label}
      value={value}
      error={error}
      className="dark:text-white dark:border-gray-600 dark:before:border-gray-500 dark:after:border-blue-500"
      labelProps={{
        className: 'dark:text-gray-400' // Label color in dark mode
      }}
      onChange={(e) => onChange(e.target.value)}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      crossOrigin={undefined}
    />
  );
}
