import styled from 'styled-components/native'

const ScrollView = styled.ScrollView`
    max-height: 320px;
    background-color: white;
`;
const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
const Pagination = styled.ScrollView`
    flex-direction: row;
    color: white;
    position: absolute;
    bottom: 10px;
    border-radius: 5px;
    max-height: 80px;
    align-content: center;
`;

const Thumbnail = styled.Image`
    width: 60px;
    height: 60px;
    resize-mode: contain;
`;

const ThumbnailPicker = styled.TouchableOpacity`
    padding: 5px;
    margin-left: 10px;
    border: 1px solid grey;
    background-color: white;
`;

export const SC = {
    Container,
    Pagination,
    ScrollView,
    Thumbnail,
    ThumbnailPicker,
};