import TestComponent from 'console/workflows/extensions/components/ExtensionForm';
import { Map } from 'immutable';

const { WrappedComponent: ExtensionForm } = TestComponent;

describe('<ExtensionForm>', () => {
  const props = {
    extension: new Map(),
    form: {},
    onSubmit: () => {},
  };

  it('should work', () => {
    const wrapper = () => shallow(<ExtensionForm {...props} />);

    expect(wrapper).not.toThrow();
  });
});
