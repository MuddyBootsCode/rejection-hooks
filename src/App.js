import React, { useReducer, useState, useContext } from 'react';
import './App.css';
import questionReducer from "./reducer";
import { getScore, addQuestion, deleteQuestion } from "./reducer";


const Context = React.createContext();

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
    reset: () => setValue('')

  };

};

const Form = () => {
  const dispatch = useContext(Context);
  const question = useFormInput('');
  const askee = useFormInput('');
  const status = useFormInput('');

  const isEnabled = question.value !== '' && askee.value !== '' && status.value !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuestion(
      {
        question: question.value,
        askee: askee.value,
        status: status.value,
        id: Date.now()
      }));

    question.reset();
    askee.reset();
    status.reset();
  };



  return (
    <form

    style={{'border' : 'solid'}}
    className="w3-container">
      <label htmlFor="">Question:</label>
      <br />
      <input {...question} placeholder="Question"/>
      <br />
      <label htmlFor="">Askee:</label>
      <br />
      <input {...askee} placeholder="Who did you ask?"/>
      <br />
      <label htmlFor="">Response:</label>
      <br />
      <select {...status} >
        <option value="" defaultValue> Choose Response</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="NONE">No Response</option>
      </select>
      <br />
      <br />
      <button onClick={(e) => handleSubmit(e)}
              disabled={!isEnabled}
              className="w3-button w3-blue w3-border submitButton">Submit</button>
    </form>
  );
};

const AskList = ({ asks }) => {
    return asks.map(ask => <Ask key ={ask.id} {...ask}/>);
};

const Ask = ({question, askee, status, id}) => {
  const dispatch = useContext(Context);

  const questionDelete = (id) => {
    dispatch(deleteQuestion({
      id
    }))
  };

  let statusColor = '';

  if (status === "accepted"){
    statusColor = "w3-container w3-green"
  } else if(status === "rejected"){
    statusColor = "w3-container w3-red"
  } else{
    statusColor = 'w3-container w3-yellow'
  }

  return (
    <div className="w3-card w3-white card">
      <header className="w3-container w3-blue cardHeader">
        <h3>Question:</h3>
        <h4>{question}</h4>
      </header>

      <div className="w3-container">
        <h4>Askee:</h4>
        <h4>{askee}</h4>
      </div>
      <footer className={statusColor}>
        <strong>Response: <i>{status}</i></strong>
      </footer>
      <div className="w3-bar">
        <button className="w3-button w3-red w3-ripple" onClick={() => questionDelete(id)}>Delete</button>
        <button className="w3-button w3-green w3-ripple">Update</button>
      </div>
    </div>
  )
};

const App = () => {
  const [state, dispatch] = useReducer(questionReducer, [{question: 'Raise?', askee: 'Boss', status: 'accepted', id: 2}]);
  const score = getScore(state);

  return (
      <Context.Provider value={dispatch}>
        <div className="App w3-container w3-white" >
          <h1 className="w3-blue">Rejection: The Game of Life!</h1>
          <h2>Score - {score} </h2>
          <Form />
          <div className="askList">
            <AskList asks={state} />
          </div>
        </div>
      </Context.Provider>
  );
};


export default App;
