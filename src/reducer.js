/*
Rejection reducer
[
  {
    question
    askee
    status: 'accepted' | 'rejected' // later, add  | 'unanswered'  1 | 10 | 0
  }
]

ADD_QUESTION
getScore

UPDATE_QUESTION_STATUS
*/

const addQuestion = ({question, askee, status, id} = {}) => ({
  type: 'rejection/addQuestion',
  payload: {question, askee, status, id}
});

const deleteQuestion = ({ id } = {}) => ({
  type: 'rejection/deleteQuestion',
  payload: { id }
});

const getScore = state => state.reduce((accum, question) => {
  if (question.status === 'accepted') {
    return accum + 1
  } else if (question.status === 'rejected') {
    return accum + 10
  } else {
    return accum + 0
  }
}, 0);

const questionReducer = (state = [], action = {}) => {
  const {type, payload} = action;

  switch (type) {
    case addQuestion().type:
      return [...state, { ...payload } ];

    case deleteQuestion().type:
      return state.filter(state => state.id !== payload.id);

    default:
      return state;
  }
};

export default questionReducer;
export { addQuestion, getScore, deleteQuestion };
