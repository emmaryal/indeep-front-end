import React from "react";
import {Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import record from "./../../images/record.jpeg";
import { Link } from "react-router-dom";

const LoadingCard = ({count}) => {

    const cards = () => {
        let totalCards = [];

        for (let i=0; i<count; i++) {
            totalCards.push(
            <Card className= 'col-md-3' key={i}>
                <Skeleton active></Skeleton>
            </Card>
            );
        }
        return totalCards;
    };
    return <div className= 'row pb-5'>{cards()}</div>;
};
export default LoadingCard;
