
import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ConditionChecker,
  ComparisonTypes,
  FilterOption,
} from '../../services.js';

export default class MultipleSelectFilterForm extends Component {

  constructor(props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.options = this.props.filterOption.comparisonParameters.oneOfOptions;

    this.state = {
      selectedOptions: (new Array(this.options.length)).fill(false),
    };
  }

  onClickAddButton() {
    const selectedOptionNames = this.options.filter(
      (value, index) => this.state.selectedOptions[index]
    );
    const conditionChecker = new ConditionChecker(
      this.props.filterOption,
      ComparisonTypes.ONE_OF,
      selectedOptionNames
    );
    this.props.onAddConditionChecker(conditionChecker);
  }

  onKeyUp(event) {
    if (event.key !== 'Enter') return;
    this.onClickAddButton();
  }

  onCheckboxChange(index) {
    const selectedOptions = this.state.selectedOptions.slice();
    selectedOptions[index] = !selectedOptions[index];
    this.setState({
      selectedOptions,
    });
  }

  render() {
    const options = this.options.map((option, index) => (
      <div className="filterForm--multiSelect__checkbox" key={index}>
        <input
          type="checkbox"
          name="option_checkbox"
          key={index}
          onChange={() => this.onCheckboxChange(index)}
        />
        {option}
      </div>
    ));

    return (
      <div className="filterForm filterForm--multiSelect">
        {options}
        <div className="filterForm__buttons">
          <button
            onClick={this.onClickAddButton}
            className="button button--primary"
          >
            Update Results
          </button>
        </div>
      </div>
    );
  }
}

MultipleSelectFilterForm.propTypes = {
  filterOption: PropTypes.instanceOf(FilterOption),
  onAddConditionChecker: PropTypes.func.isRequired,
};
