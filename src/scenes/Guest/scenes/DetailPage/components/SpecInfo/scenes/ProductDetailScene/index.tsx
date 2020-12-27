import { HeaderTitle } from '@react-navigation/stack';
import React, { useEffect, useLayoutEffect } from 'react';
import BatteryDesignConstants from '../../../../../../../../values/constants/BatteryDesignConstants';
import BrandConstants from '../../../../../../../../values/constants/BrandConstants';
import CardDesignConstants from '../../../../../../../../values/constants/CardDesignConstants';
import CpuConstants from '../../../../../../../../values/constants/CpuConstants';
import ResolutionConstants from '../../../../../../../../values/constants/ResolutionConstants';
import { SC } from './styles';

const ProductDetailScene = ({ navigation, route }: any) => {
    const { product } = route.params;

    const { cpu, ram, hard_drive, monitor, battery } = product;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Thông tin chi tiết",
        });
    }, [])

    const specs = [
        {
            title: "Thương hiệu",
            detail: BrandConstants[product["brand"]],
        },
        {
            title: "CPU",
            detail: `${CpuConstants[cpu["type"]]} ${cpu["detail"]}, ${cpu["speed"]
                } GHz`,
        },
        {
            title: "Tốc độ CPU tối đa",
            detail: cpu["max_speed"],
        },
        {
            title: "RAM",
            detail: `${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz${ram["detail"] === null ? "" : ` (${ram["detail"]})`
                }, ${ram["max_size"] === null
                    ? "Không hỗ trợ nâng cấp"
                    : `Hỗ trợ tối đa ${ram["max_size"]} GB`
                }`,
        },
        {
            title: "Ổ cứng",
            detail: `${hard_drive["type"]} ${hard_drive["size"] >= 1024
                    ? `${hard_drive["size"] / 1024} TB`
                    : `${hard_drive["size"]} GB`
                } ${product["hard_drive"]?.["detail"] ?? ""}`,
        },
        {
            title: "Màn hình",
            detail: `${monitor["size"]} inch, ${ResolutionConstants[monitor["resolution_type"]]} (${monitor["resolution_width"]} x ${monitor["resolution_height"]})`,
        },
        {
            title: "Card màn hình",
            detail: `${monitor["graphics_card"]} (${CardDesignConstants[monitor["card_design"]]
                })`,
        },
        {
            title: "Cổng kết nối",
            detail: product["ports"],
        },
        {
            title: "Kết nối không dây",
            detail: product["wireless"],
        },
        {
            title: "Khe đọc thẻ nhớ",
            detail: product?.["sd_cards"] ?? " Không hỗ trợ",
        },
        {
            title: "Thông tin PIN",
            detail: `${battery["detail"]} (${BatteryDesignConstants[battery["type"]]
                })`,
        },
        {
            title: "Webcam",
            detail: product?.["webcam"] ?? " Không hỗ trợ",
        },
        {
            title: "Công nghệ âm thanh",
            detail: product["sound_tech"],
        },
        {
            title: "Hệ điều hành",
            detail: product["os"],
        },
        {
            title: "Thiết kế",
            detail: product["design"],
        },
        {
            title: "Kích thước",
            detail: product["size"],
        },
        {
            title: "Khối lượng",
            detail: `${product["weight"]} kg`,
        },
        {
            title: "Tính năng khác",
            detail: product?.["specials"] ?? "Không",
        },
    ];

    return (
        <SC.Container>
            {specs.map((item, index) => (
                <SC.InfoRow key={item.title} isEven={index % 2 === 0 ? true : false}>
                    <SC.Title>{item.title}</SC.Title>
                    <SC.Content>{item.detail}</SC.Content>
                </SC.InfoRow>
            ))}
        </SC.Container>
    );
}

export default ProductDetailScene;