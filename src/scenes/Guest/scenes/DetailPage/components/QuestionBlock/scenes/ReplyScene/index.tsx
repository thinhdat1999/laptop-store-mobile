import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import QuestionItem from '../../../../../../../../components/QuestionItem';
import { setMessage } from '../../../../../../../../services/redux/slices/messageSlice';
import { SC } from './styles';

const ReplyScene = ({ navigation, route }: any) => {

    const { question } = route.params;
    const [reply, setReply] = useState("");

    const dispatch = useDispatch();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Trả lời hỏi đáp",
        })
    }, [])

    return (
        <SC.Container>
            <SC.QuestionContainer>
                <QuestionItem key={question.id} question={question} />
            </SC.QuestionContainer>

            <SC.ReplyForm>
                <SC.Reply placeholder="Gửi câu trả lời cho câu hỏi" multiline={true} autoFocus={true} onChangeText={(value : string) => setReply(value)} value={reply}></SC.Reply>
                <SC.SendButton onPress={() => { 
                    // Call api post reply
                    dispatch(setMessage("Câu trả lời đã được gửi thành công và đang chờ duyệt"));
                    setReply("");
                }}>
                    <SC.SendButtonTitle>Gửi</SC.SendButtonTitle>
                </SC.SendButton>
            </SC.ReplyForm>
        </SC.Container>
    );
}

export default ReplyScene;