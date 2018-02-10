import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

const source = _.times(100, () => ({
  title: faker.company.companyName(),
  image: faker.internet.avatar(),
}))

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { previousSearches: [{}] };

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' });
  }

  addPreviousSearches(value) {
    this.setState({ previousSearches: [...previousSearches, value] });
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.title, results: [result] })
  }

  addPreviousSearches(input, results) {
    if (input.length > 0) {
      this.setState({
        previousSearches: [
          ...this.state.previousSearches,
          {
            input,
            results,
          },
        ],
      });
    }
  }

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: value.length > 0, value });

    const { previousSearches } = this.state;
    const previousSearch = previousSearches && previousSearches.filter(({ input }) => input === value)[0];

    if (previousSearch) {
      this.setState({
        isLoading: false,
        results: previousSearch.results
      });
    } else {

      setTimeout(() => {
        const { value } = this.state;
        if (value.length < 1) return this.resetComponent();

        const re = new RegExp(_.escapeRegExp(value), 'i');
        const isMatch = result => re.test(result.title);
        const results = _.filter(source, isMatch).slice(0, 5);

        this.addPreviousSearches(value, results);
        this.setState({
          isLoading: false,
          results,
          value,
        })
      }, 100)
    }
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        fluid
        results={results}
        value={value}
        placeholder="Search..."
        {...this.props}
      />
    )
  }
}
