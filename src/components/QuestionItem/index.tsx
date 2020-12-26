import React, { useCallback, useState } from 'react';
import questionApi from '../../services/api/questionApi';
import { SC } from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import { View } from 'react-native';
import ReplyModel from '../../values/models/ReplyModel';
import { useNavigation } from '@react-navigation/native';


type QuestionItemState = {
    replies: ReplyModel[],
    isLoadMore: boolean,
}

const QuestionItem = (props: any) => {

    const question = props.question;
    const answer = question["answer"];
    const navigation = useNavigation();
    const initialState: QuestionItemState = {
        replies: [],
        isLoadMore: false,
    }

    const [state, setState] = useState<QuestionItemState>(initialState);

    const { replies, isLoadMore } = state;
    const loadMoreReplies = useCallback(async () => {
        const response = await questionApi.getReplies(question.id);
        setState({
            isLoadMore: true,
            replies: response.data
        });
    }, []);

    return (
        <SC.Container>
            <SC.QuestionContainer>
                <SC.Question>{question.question}</SC.Question>
                <SC.QuestionAuthor>{question.author_name} - {question.created_at}</SC.QuestionAuthor>
            </SC.QuestionContainer>

            {answer ? (
                <SC.AnswerContainer>
                    <SC.Answer>{answer.detail}</SC.Answer>
                    <SC.AnswerAuthor>{answer.author_name} - {answer.created_at} </SC.AnswerAuthor>
                    {replies.map((reply) => (
                        <View key={reply.author_name}>
                            <SC.Answer>{reply.detail}</SC.Answer>
                            <SC.AnswerAuthor>{reply.author_name} - {reply.created_at} </SC.AnswerAuthor>
                        </View>
                    ))}
                </SC.AnswerContainer>
            ) : null}


            <SC.ActionBar>
                {question.reply_count === 1 || isLoadMore ? <View></View> : (
                    <SC.MoreReply onPress={loadMoreReplies}>
                        <SC.MoreReplyText>Xem thêm {question.reply_count - 1} bình luận</SC.MoreReplyText>
                    </SC.MoreReply>
                )}

                <SC.AnswerButton onPress={()=> {
                    navigation.navigate("ReplyScene", {question: question});
                }}>
                    <Icon name="reply" size={25} color="#aaa" />
                    <SC.AnswerButtonTitle> Trả lời</SC.AnswerButtonTitle>
                </SC.AnswerButton>
            </SC.ActionBar>



        </SC.Container>
    );
}

export default QuestionItem