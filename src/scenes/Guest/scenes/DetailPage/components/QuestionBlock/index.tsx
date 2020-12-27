import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import React from 'react';
import QuestionItem from '../../../../../../components/QuestionItem';
import questionApi from '../../../../../../services/api/questionApi';
import QuestionModel from '../../../../../../values/models/QuestionModel';
import { SC } from './styles';


type QuestionListState = {
    loading: boolean;
    questions: QuestionModel[];
    count: number;
};

const QuestionBlock = (props: any) => {

    const productId = props.productId;

    const initialState = React.useMemo<QuestionListState>(
        () => ({
            loading: true,
            questions: [],
            count: 0,
        }),
        []
    );
    const [state, setState] = React.useState<QuestionListState>(initialState);
    const { questions, count, loading } = state;

    const navigation = useNavigation();

    React.useEffect(() => {
        const loadData = async () => {
            const response = await questionApi.getByProductId(productId, 1);
            const count = parseInt(response.headers["x-total-count"]);

            if (count !== 0) {
                setState((prev) => ({
                    ...prev,
                    questions: response.data,
                    loading: false,
                    count: count,
                }));
            }
        }
        loadData();
    }, [])

    return (
        <SC.Container>
            <SC.AllQuestionButton onPress={() => {
                navigation.navigate("AllQuestion", { productId: productId, isFocus: false });
            }}>
                <SC.AllQuestionButtonTitle>Xem tất cả</SC.AllQuestionButtonTitle>
            </SC.AllQuestionButton>
            {(count !== 0 && !loading) ?
                (
                    questions.length > 2 ? questions.slice(0, 2).map((question) => (
                        <QuestionItem question={question} key={question.id} />
                    )) : questions.map((question) => (
                        <QuestionItem question={question} key={question.id} />
                    ))
                )
                : null
            }
            <SC.QuestionButton onPress={() => {
                navigation.navigate("AllQuestion", { productId: productId, isFocus: true });
            }}>
                <SC.QuestionButtonTitle>Đặt Câu Hỏi Cho Sản Phẩm</SC.QuestionButtonTitle>
            </SC.QuestionButton>
        </SC.Container>
    );
}

export default QuestionBlock;