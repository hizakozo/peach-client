import {Button, TextInput, View} from "react-native";
import {
    Control,
    Controller,
    DefaultValues,
    FieldValues, Path, RegisterOptions,
    useForm,
    UseFormProps
} from "react-hook-form";
import React, {useEffect} from "react";

export type TRecord = Record<string, unknown>
export type TInputFieldProps<TFormValues extends FieldValues> = Omit<InputFieldProps<TFormValues>, "control">
export type AsyncDefaultValues<TFieldValues> = (
    payload?: unknown
) => Promise<TFieldValues>
type FormProps<TFormValues extends FieldValues> = {
    onSubmit: (params: TFormValues) => void;
    inputFields:  TInputFieldProps<TFormValues>[];
    options?: UseFormProps<TFormValues>;
    defaultValues?: DefaultValues<TFormValues> | AsyncDefaultValues<TFormValues>
}
export const Form = <
    TFormValues extends TRecord = TRecord
>(
    {
        options, defaultValues, inputFields, onSubmit
    }: FormProps<TFormValues>
) => {
    const methods = useForm<TFormValues>(
        {
            ...options,
            defaultValues
        }
    )

    useEffect(() => {
        if (methods.formState.isSubmitted) {
            methods.reset()
        }
    }, [methods.formState.isSubmitted])

    return (
        <View>
            {
                inputFields.map((field, i) => (
                    <View key={i}>
                        <InputField<TFormValues>
                            control={methods.control}
                            {...field}
                        />
                    </View>
                ))
            }
            <Button title="Submit" onPress={methods.handleSubmit(onSubmit)}/>
        </View>
    )
}

type InputFieldProps<TFormValues extends FieldValues> = {
    control: Control<TFormValues>;
    rules?: Omit<RegisterOptions<TFormValues, Path<TFormValues>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
    placeholder: string
    name: Path<TFormValues>
}
export const InputField = <TFormValues extends TRecord = TRecord>(
    {control, rules, placeholder, name}: InputFieldProps<TFormValues>
) => {
    return <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
            <TextInput
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
            />
        )}
        name={name}
    />
}