import styled from 'styled-components/native'

const ScrollView = styled.ScrollView`
    max-height: 320px;
    background-color: white;
`;
const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: white;
`;
const Pagination = styled.ScrollView`
    color: white;
    position: absolute;
    bottom: 6%;
    max-height: 80px;
`;

const Thumbnail = styled.Image`
    width: 60px;
    height: 60px;
    resize-mode: contain;

    ${({active}) => !active && ` 
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      opacity: 0.4;
      z-index: 2; 
    `}
`;

const ThumbnailPicker = styled.TouchableOpacity`
    padding: 5px;
    border: 1px solid grey;
    background-color: white;
    margin-horizontal: 10px;

    ${({ active }) => active && `
        border: 1px solid blue;
    `}

    ${({active}) => !active && ` 
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2; 
      opacity: 0.4;
      background-color: rgba(0,0,0,0.5);  
    `}
`;

const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 5%;
    left: 5%;
`;

export const SC = {
    Container,
    Pagination,
    ScrollView,
    Thumbnail,
    ThumbnailPicker,
    BackButton,
};