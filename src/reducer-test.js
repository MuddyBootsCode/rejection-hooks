import {describe} from "riteway";
import questionReducer, {addQuestion, deleteQuestion, getScore} from "./reducer";

const createState = (state = []) => [...state];

describe("rejection-questionReducer", async assert => {
  assert({
    given: "no arguments",
    should: "return the default state",
    actual: questionReducer(),
    expected: createState()
  });

  {
    const askee = 'boss';
    const question = 'May I have a raise?';
    const status = 'rejected';
    const id = Date.now();

    assert({
      given: "add question action",
      should: "add the question to the state",
      actual: questionReducer(questionReducer(), addQuestion({askee, question, status, id})),
      expected: createState([
        {askee, question, status, id }
      ])
    });
  }

  {
    const question = {
      question: "Date",
      askee: "Crush",
      status: "rejected",
      id: 1
    };

    const state = questionReducer([addQuestion(question).payload]);

    assert({
      given: "delete question action",
      should: "remove the question from the state",
      actual: questionReducer(questionReducer(state), deleteQuestion({id: 1})),
      expected: createState([])
    });
  }

});

describe("rejection/getScore", async assert => {
  assert({
    given: "empty state",
    should: "return 0",
    actual: getScore(questionReducer()),
    expected: 0
  });

  {
    const state = questionReducer([addQuestion({status: 'accepted'}).payload, addQuestion({status: 'accepted'}).payload]);
    assert({
      given: "Given accepted questions",
      should: "return correct scores",
      actual: getScore(state),
      expected: 2
    });
  }

  {
    const state = questionReducer([addQuestion({status: 'rejected'}).payload, addQuestion({status: 'rejected'}).payload]);
    assert({
      given: "Given Rejected Questions",
      should: "return correct scores",
      actual: getScore(state),
      expected: 20
    })
  }



});
