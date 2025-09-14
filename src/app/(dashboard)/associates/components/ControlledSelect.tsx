import { Control, Controller, FieldPath, FieldValues, ControllerProps } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface ControlledSelectProps<T extends FieldValues> {
  control: Control<any>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  options: SelectOption[];
  rules?: ControllerProps['rules'];
}

export function ControlledSelect<T extends FieldValues>({
  control, name, label, placeholder, options, rules,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full flex flex-col gap-1.5">
          <Label htmlFor={name}>{label}</Label>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              id={name}
              className={cn(
                "w-full h-[46px] rounded-md border text-base md:text-sm transition px-2 text-left",
                "border-gray-300",
                "focus:border-blue-600 focus:ring-2 focus:ring-blue-600/50",
                "disabled:cursor-not-allowed disabled:opacity-50",
                !field.value && "text-gray-400",
                error && "border-red-500 focus:ring-red-500/50"
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
  );
}