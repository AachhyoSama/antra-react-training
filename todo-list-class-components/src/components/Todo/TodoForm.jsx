import React, { Component } from "react";

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editTodo !== this.props.editTodo && this.props.editTodo) {
            this.setState({ inputValue: this.props.editTodo.title });
        }
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleSubmit = () => {
        const { editTodo, handleAddNewTodo, handleUpdateTodo } = this.props;
        const { inputValue } = this.state;

        if (editTodo) {
            handleUpdateTodo(editTodo.id, inputValue);
        } else {
            handleAddNewTodo(inputValue);
        }
        this.setState({ inputValue: "" });
    };

    render() {
        const { inputValue } = this.state;
        const { editTodo } = this.props;

        return (
            <div className="input__container">
                <input
                    id="input"
                    value={inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSubmit}>
                    {editTodo ? "Update Todo" : "Add Todo"}
                </button>
            </div>
        );
    }
}

export default TodoForm;
