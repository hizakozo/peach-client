import {StyleSheet, View} from "react-native";
import {ListItem} from "@rneui/themed";
import {Card} from '@rneui/themed';

type BaseCardProps = {
    title: string,
    subTitle: string,
    onPress: () => void
}
export const BaseCard = ({title, subTitle, onPress}: BaseCardProps) => {
    return (
        <>
            <Card>
                <ListItem containerStyle={style.BaseCard} onPress={onPress}>
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
        padding: 4
    },
    BaseCard__Title: {
        fontSize: 24
    },
    BaseCard__SubTitle: {
        fontSize: 12
    },
})