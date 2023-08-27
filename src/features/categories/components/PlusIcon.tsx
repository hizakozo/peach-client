import {Icon} from "@rneui/themed";
import {GestureResponderEvent, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {appColor} from "../../../shared/styles";

type Props = {
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: (event: GestureResponderEvent) => void;
}
export const PlusIcon = ({containerStyle, onPress}: Props) => {
    return <Icon containerStyle={containerStyle} raised size={30} type="ionicon" name={"add-outline"} color={appColor} onPress={onPress} />
}