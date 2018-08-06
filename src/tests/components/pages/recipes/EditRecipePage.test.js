import { Map } from 'immutable';
import TestComponent from 'console/workflows/recipes/pages/EditRecipePage';

const { WrappedComponent: EditRecipePage } = TestComponent;

describe('<EditRecipePage>', () => {
  const props = {
    updateRecipe: () => {},
    recipeId: 123,
    recipe: new Map(),
  };

  it('should work', () => {
    const wrapper = () => shallow(<EditRecipePage {...props} />);

    expect(wrapper).not.toThrow();
  });
});
