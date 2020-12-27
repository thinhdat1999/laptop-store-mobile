import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import QuestionItem from '../../../../../../../../components/QuestionItem';
import questionApi from '../../../../../../../../services/api/questionApi';
import QuestionModel from '../../../../../../../../values/models/QuestionModel';
import { SC } from './styles';


type ItemListStates = {
    page: number;
    questions: QuestionModel[];
    loading: boolean;
    isDone: boolean;
    length: number;
}

const AllQuestionScene = ({ navigation, route }: any) => {

    const { productId, isFocus } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Hỏi đáp về sản phẩm",
            // headerTitleStyle: { alignSelf: 'center'  },
        })
    }, [])

    const initialState = useMemo<ItemListStates>(() =>
    ({
        page: 1,
        questions: [],
        loading: true,
        isDone: false,
        length: 0,
    })
        , [])
    const [state, setState] = React.useState<ItemListStates>(initialState);

    const { page, questions, loading, isDone, length } = state;

    React.useEffect(() => {
        if (!loading) return;
        const loadData = async () => {
            try {
                const response = await questionApi.getByProductId(productId, page);
                const newQuestions = [...questions, ...response.data];
                const length = parseInt(response.headers["x-total-count"]);
                setState((prev) => ({
                    ...prev,
                    questions: newQuestions,
                    loading: false,
                    isDone: newQuestions.length === length,
                    length: length,
                }));
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                }));
            }
        }
        loadData();
    }, [loading])


    return (
        <SC.Container>
            {/* <SC.ScrollView>
                {questions.map((question : QuestionModel) => (
                    <QuestionItem question={question} key={question.id} />
                ))}
            </SC.ScrollView> */}
            <FlatList
                data={Object.values(questions)}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!isDone && !loading) {
                        setState((prev) => ({
                            ...prev,
                            page: page + 1,
                            loading: true,
                        }))
                    }
                }}
                ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="black" /> : null}
                renderItem={({ item }) => (
                    <QuestionItem question={item} key={item.id} />
                )}
            />
            <SC.ReplyForm>
                <SC.Reply placeholder="Gửi câu hỏi về sản phẩm" multiline={true} autoFocus={isFocus}></SC.Reply>
                <SC.SendButton><SC.SendButtonTitle>Gửi</SC.SendButtonTitle></SC.SendButton>
            </SC.ReplyForm>
        </SC.Container>
    );
}

export default AllQuestionScene;