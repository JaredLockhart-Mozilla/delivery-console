import { Button, Col, Input, Row } from 'antd';
import autobind from 'autobind-decorator';
import { push } from 'connected-react-router';
import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserProfile } from 'console/state/auth/selectors';
import CheckboxMenu from 'console/components/common/CheckboxMenu';
import { saveRecipeListingColumns } from 'console/state/recipes/actions';
import { getRecipeListingColumns } from 'console/state/recipes/selectors';
import {
  getCurrentUrlAsObject as getCurrentUrlAsObjectSelector,
  getQueryParam,
} from 'console/state/router/selectors';
import { reverse } from 'console/urls';

@connect(
  (state, props) => ({
    columns: getRecipeListingColumns(state),
    getCurrentUrlAsObject: queryParams => getCurrentUrlAsObjectSelector(state, queryParams),
    searchText: getQueryParam(state, 'searchText'),
    userProfile: getUserProfile(state),
  }),
  {
    push,
    saveRecipeListingColumns,
  },
)
@autobind
class ListingActionBar extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.instanceOf(List).isRequired,
    getCurrentUrlAsObject: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    saveRecipeListingColumns: PropTypes.func.isRequired,
    searchText: PropTypes.string,
    userProfile: PropTypes.instanceOf(Map),
  };

  static defaultProps = {
    searchText: null,
    userProfile: null,
  };

  handleChangeSearch(value) {
    const { getCurrentUrlAsObject } = this.props;
    this.props.push(getCurrentUrlAsObject({ searchText: value || undefined }));
  }

  render() {
    const { columns, searchText, userProfile } = this.props;
    return (
      <Row gutter={16} className="list-action-bar">
        <Col span={14}>
          <Input.Search
            className="search"
            placeholder="Search..."
            defaultValue={searchText}
            onSearch={this.handleChangeSearch}
          />
        </Col>
        <Col span={2}>
          <CheckboxMenu
            checkboxes={columns.toJS()}
            label="Columns"
            onChange={this.props.saveRecipeListingColumns}
            options={[
              { label: 'Name', value: 'name' },
              { label: 'Action', value: 'action' },
              { label: 'Enabled', value: 'enabled' },
              { label: 'Last Updated', value: 'lastUpdated' },
              { label: 'Enrollment Active', value: 'paused' },
            ]}
          />
        </Col>
        <Col span={8} className="righted">
          {userProfile && (
            <Link to={reverse('recipes.new')} id="lab-recipe-link">
              <Button type="primary" icon="plus" id="lab-recipe-button">
                New Recipe
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    );
  }
}

export default ListingActionBar;
