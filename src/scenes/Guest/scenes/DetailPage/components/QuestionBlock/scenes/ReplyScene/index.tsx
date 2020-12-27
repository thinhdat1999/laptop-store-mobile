import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import QuestionItem from '../../../../../../../../components/QuestionItem';
import questionApi from '../../../../../../../../services/api/questionApi';
import QuestionModel from '../../../../../../../../values/models/QuestionModel';
import { SC } from './styles';

const ReplyScene = ({ navigation, route }: any) => {

    const { question } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Trả lời hỏi đáp",
        })
    }, [])

    return (
        <SC.Container>
            {/* <SC.ScrollView>
                {questions.map((question : QuestionModel) => (
                    <QuestionItem question={question} key={question.id} />
                ))}
            </SC.ScrollView> */}
            <SC.QuestionContainer>
                <QuestionItem key={question.id} question={question} />
            </SC.QuestionContainer>

            <SC.ReplyForm>
                <SC.Reply placeholder="Gửi câu trả lời cho câu hỏi" multiline={true} autoFocus={true}></SC.Reply>
                <SC.SendButton><SC.SendButtonTitle>Gửi</SC.SendButtonTitle></SC.SendButton>
            </SC.ReplyForm>
        </SC.Container>
    );
}

export default ReplyScene;