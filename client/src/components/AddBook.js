import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  displayAuthors(){
    const data = this.props.getAuthorsQuery;
    if(data.loading){
      return(<option disabled>Loading authors...</option>);
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{ author.name} </option>);
      });
    }
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitForm(event){
    event.preventDefault();
    this.props.addBookMutation();
  }

  render() {
    return (
      <form onSubmit={this.submitForm} id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" name="name" onChange={this.onChange} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" onChange={this.onChange} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" onChange={this.onChange}>
            <option>Select Author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);