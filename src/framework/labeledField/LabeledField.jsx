
import React, {
  PropTypes,
} from 'react';

import Label from '../label/Label.jsx';

const LabeledField = props => (
  <div>
    <div className="labeledField__label">
      <Label>
        {props.label}
      </Label>
    </div>
    {props.children}
  </div>
);

LabeledField.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
};

export default LabeledField;
