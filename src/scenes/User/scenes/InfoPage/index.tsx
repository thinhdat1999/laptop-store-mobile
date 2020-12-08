import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../services/redux/rootReducer';
import UserInfoFormValues from '../../../../values/forms/UserInfoFormValues';
import UserModel from '../../../../values/models/UserModel';
import { SC } from './styles';


type InfoPageState = {
    user: UserModel;
    initialValues: UserInfoFormValues;
};

const InfoPage = ({ navigation }: any) => {
    // @ts-ignore
    const { user, initialValues }: InfoPageState = useSelector((state: RootState) => {
        const user = state.user;
        return {
            user: user,
            initialValues: {
                name: user?.name,
                phone: user?.phone,
                email: user?.email,
                gender: user?.gender,
            },
        };
    });

    const { name, phone, email, gender } = initialValues;

    return (
        <SC.Container>
            <SC.Text>InfoPage</SC.Text>
            <SC.Text>Họ tên: {initialValues.name}</SC.Text>
            <SC.Text>Sdt: {initialValues.phone}</SC.Text>
            <SC.Text>email: {initialValues.email}</SC.Text>
            <SC.Text>Gender: {initialValues.gender}</SC.Text>
        </SC.Container>
    );
}

export default InfoPage;