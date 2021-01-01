import styled from 'styled-components/native'

const Container = styled.View`
    padding: 10px 15px;
    background-color: white;
`;

const QuestionContainer = styled.View`
`;
const Question = styled.Text`
    font-weight: bold;
`;

const QuestionAuthor = styled.Text`
    color: #bbb;
    font-size: 12px;
    padding-bottom: 5px;
    font-style: italic;
`;

const Answer = styled.Text`
    padding-top: 5px;
`;

const AnswerContainer = styled.View`
    padding-left: 15px;
    border-left-color: #bbb;
    border-left-width: 1px;
`;

const AnswerAuthor = styled.Text`
    color: #bbb;
    font-size: 12px;
    font-style: italic;
    margin-top: -15px;
    padding-bottom: 10px;
`;


const ActionBar = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

const AnswerButton = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

const MoreReply = styled.TouchableOpacity`

`;

const MoreReplyText = styled.Text`

`;

const AnswerButtonTitle = styled.Text`
    padding-right: 30px;
    color: #aaa;
`;

export const SC = {
    Container,
    QuestionContainer,
    Question,
    QuestionAuthor,
    AnswerContainer,
    Answer,
    AnswerAuthor,
    ActionBar,
    MoreReply,
    MoreReplyText,
    AnswerButton,
    AnswerButtonTitle,
}