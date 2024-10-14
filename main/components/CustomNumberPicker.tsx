import { FC } from "react"
import { TouchableOpacity } from "../utils/imports"
import CustomTextInput from "./CustomInput"
import placeholders from "../constants/placeHolders"
import { colors } from "../utils/Colors"
interface props {
    onPress: () => void,
    value: string,
    text:string,
}
const CustomNumberPicker: FC<props> = ({ onPress, value,text }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>

            <CustomTextInput
                placeholder={text}
                pointerEvents="none"
                value={value} onChangeText={() => { }}
                error={false}
                backgroundColor={colors.white}
                borderRadius={10}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={10}
                paddingBottom={10}
                borderColor={colors.TextInputBorderColor}
                borderWidth={1}
                editable={false}
                color={colors.black}
            />

        </TouchableOpacity>

    )
}

export default CustomNumberPicker