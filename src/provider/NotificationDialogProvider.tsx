import React, {createContext, useContext, useState} from "react";
import {View, Text} from "react-native";
import {Dialog} from "@rneui/themed";
import {set} from "react-hook-form";

type NotificationProps = {
    title: string;
    action: () => void
    description?: string;
}
type NotificationDialog = {
    openNotifier: (props: NotificationProps) => void
}
const NotificationDialogContext = createContext<NotificationDialog>({} as NotificationDialog)

export const useNotificationDialog = () => useContext(NotificationDialogContext)

type ProviderProps = {
    children: React.ReactNode
}

export const NotificationDialogProvider = ({children}: ProviderProps) => {
    const [open, setOpen] = useState(false)
    const [props, setProps] = useState<NotificationProps>({} as NotificationProps)
    const openNotifier = (props: NotificationProps) => {
        setProps(props)
        setOpen(true)
    }
    const action = () => {
        props.action()
        setOpen(false)
    }
    return <NotificationDialogContext.Provider value={
        {openNotifier}
    }>
        {children}
        {
            <Dialog
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
            >
                <Dialog.Title title={props.title}/>
                { props.description && <Text>{ props.description }</Text>}
                <Dialog.Actions>
                    <Dialog.Button title="キャンセル" onPress={() => setOpen(false)}/>
                    <Dialog.Button title="OK" onPress={action}/>
                </Dialog.Actions>
            </Dialog>
        }
    </NotificationDialogContext.Provider>
}