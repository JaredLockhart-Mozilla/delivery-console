import { Card, Col, Row } from 'antd';
import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import LoadingOverlay from 'console/components/common/LoadingOverlay';
import QueryRecipe from 'console/components/data/QueryRecipe';
import DetailsActionBar from 'console/workflows/recipes/components/DetailsActionBar';
import RecipeDetails from 'console/workflows/recipes/components/RecipeDetails';
import HistoryTimeline from 'console/workflows/recipes/components/HistoryTimeline';
import RevisionNotice from 'console/workflows/recipes/components/RevisionNotice';
import ShieldIdenticon from 'console/components/common/ShieldIdenticon';

import { getLatestRevisionIdForRecipe, getRecipeHistory } from 'console/state/recipes/selectors';
import { getRevision } from 'console/state/revisions/selectors';
import { getUrlParamAsInt } from 'console/state/router/selectors';

@connect((state, props) => {
  const recipeId = getUrlParamAsInt(state, 'recipeId');
  const latestRevisionId = getLatestRevisionIdForRecipe(state, recipeId, null);
  const revisionId = getUrlParamAsInt(state, 'revisionId', latestRevisionId);
  const revision = getRevision(state, revisionId, new Map());

  return {
    history: getRecipeHistory(state, recipeId, new List()),
    recipeId,
    revision,
    revisionId,
  };
})
class RecipeDetailPage extends React.PureComponent {
  static propTypes = {
    history: PropTypes.instanceOf(List).isRequired,
    recipeId: PropTypes.number.isRequired,
    revision: PropTypes.instanceOf(Map).isRequired,
    revisionId: PropTypes.number,
  };

  render() {
    const { history, recipeId, revision, revisionId } = this.props;
    return (
      <div className="content-wrapper page-recipe-details">
        <QueryRecipe pk={recipeId} />
        <Row gutter={24}>
          <Col span={16}>
            <RevisionNotice revision={revision} />
            <Row type="flex" align="middle">
              <Col span={4}>
                <ShieldIdenticon className="detail-icon" seed={revision.get('identicon_seed')} />
              </Col>
              <Col span={20}>{revisionId && <DetailsActionBar />}</Col>
            </Row>
            <LoadingOverlay
              requestIds={[`fetch-recipe-${recipeId}`, `fetch-revision-${revisionId}`]}
            >
              <RecipeDetails revision={revision} />
            </LoadingOverlay>
          </Col>
          <Col span={8} className="recipe-history">
            <Card className="noHovering" title="History">
              {revisionId && (
                <HistoryTimeline
                  history={history}
                  recipeId={recipeId}
                  selectedRevisionId={revisionId}
                />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecipeDetailPage;
