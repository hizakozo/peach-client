import {ColorValue, StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {ListItem} from "@rneui/themed";
import {Card} from '@rneui/themed';

type BaseCardProps = {
    title: string,
    subTitle: string,
    onPress: () => void,
    backgroundColor?: ColorValue | undefined;
}
export const BaseCard = ({title, subTitle, onPress, backgroundColor}: BaseCardProps) => {
    return (
        <>
            <Card containerStyle={{padding: 0}}>
                <ListItem containerStyle={{
                    ...style.BaseCard,
                    backgroundColor
                }} onPress={onPress}>
                    <ListItem.Content>
                        <ListItem.Title
                            style={style.BaseCard__Title}>{title}</ListItem.Title>
                        <ListItem.Subtitle
                            style={style.BaseCard__SubTitle}>{subTitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </Card>
        </>
    )
}

const style = StyleSheet.create({
    BaseCard: {
    },
    BaseCard__Title: {
        fontSize: 24
    },
    BaseCard__SubTitle: {
        fontSize: 12
    },
})