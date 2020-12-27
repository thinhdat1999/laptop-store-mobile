import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Text } from "react-native";
import CpuConstants from "../../../../../../values/constants/CpuConstants";
import ResolutionConstants from "../../../../../../values/constants/ResolutionConstants";
import CpuModel from "../../../../../../values/models/CpuModel";
import HardDriveModel from "../../../../../../values/models/HardDriveModel";
import MonitorModel from "../../../../../../values/models/MonitorModel";
import RamModel from "../../../../../../values/models/RamModel";
import { SC } from "./styles";


type SpecState = {
    cpu: CpuModel,
    ram: RamModel,
    hardDrive: HardDriveModel,
    monitor: MonitorModel,
}

const SpecInfo = (props: any) => {
    const spec = props.productSpec;
    const navigation = useNavigation();
    const specs = [
        {
            title: "CPU",
            content: `${CpuConstants[spec["cpu"]["type"]]}, ${spec["cpu"]["speed"]} GHz`,
        },
        {
            title: "RAM",
            content: `${spec["ram"]["size"]} GB ${spec["ram"]["type"]} ${spec["ram"]["bus"]} MHz`,
        },
        {
            title: "Ổ cứng",
            content: `${spec["hard_drive"]["type"]} ${spec["hard_drive"]["size"] >= 1024 ? `${spec["hard_drive"]["size"] / 1024} TB` : `${spec["hard_drive"]["size"]} GB`} ${spec["hard_drive"]["detail"]}`,
        },
        {
            title: "Màn hình",
            content: `${spec["monitor"]["size"]} inch, ${ResolutionConstants[spec["monitor"]["resolution_type"]]} (${spec["monitor"]["resolution_width"]} x ${spec["monitor"]["resolution_height"]})`,
        },
    ];

    // React.useEffect(() => {
    // }, [])

    return (
        <SC.Container>
            {/* <SC.List
                data={Object.values(specs)}
                keyExtractor={(item) => item.title.toString()}
                renderItem={({ item }) => (
                    <View>
                    <SC.Text>{item.title}</SC.Text>
                    <SC.Text>{item.content}</SC.Text>
                    </View>
                )}
            /> */}
            {specs.map((item, index) => (
                <SC.InfoRow key={item.title}  isEven={index % 2 === 0 ? true : false}>
                    <SC.Title>{item.title}</SC.Title>
                    <SC.Content>{item.content}</SC.Content>
                </SC.InfoRow>
            ))}
            <SC.NavigateButton onPress={() => { navigation.navigate("ProductDetail", {product: spec}) }}>
                <Text style={{ color: 'red' }}>Xem thông số chi tiết</Text>
            </SC.NavigateButton>
        </SC.Container>
    );
}

export default SpecInfo;