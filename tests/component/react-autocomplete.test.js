import Tester from '../Tester';
import ReactAutocomplete from '../../src/react-autocomplete';
import { AUTOCOMPLETE_OPTIONS } from '../../demo/constants';

const tester = new Tester();

const autocompleteOptions = AUTOCOMPLETE_OPTIONS.map(o => ({ text: o, value: o }));

describe('Autocomplete', () => {
  test('it should render', () => {
    const snapshot = tester.getSnapshot(
      ReactAutocomplete,
      { options: [] },
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('it should render with loading state', () => {
    const snapshot = tester.getSnapshot(
      ReactAutocomplete,
      { options: autocompleteOptions, loading: true },
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('it should populate suggestions when value in the input changes', () => {
    const mockCallback = jest.fn();
    const testValue = 'Bas';
    const { component } = tester.getMountedInstance(
      ReactAutocomplete,
      { options: autocompleteOptions, onChange: mockCallback },
    );

    component.find('input').at(0).simulate('change', { target: { value: testValue } });

    const possibleMatches = autocompleteOptions.filter(o => o.text.toLowerCase().includes(testValue.toLowerCase()));
    expect(component.find('li').length).toEqual(possibleMatches.length);
    expect(mockCallback).toHaveBeenCalled();
  });

  test('it should invoke onSelectOption callback when user selects an option', () => {
    const testValue = 'Bas';
    const mockCallback = jest.fn();

    const { component } = tester.getMountedInstance(
      ReactAutocomplete,
      { options: autocompleteOptions, onSelectOption: mockCallback },
    );

    const input = component.find('input').at(0);
    input.simulate('change', { target: { value: testValue } });
    input.simulate('keydown', { key: 'ArrowDown' });
    input.simulate('keydown', { key: 'Enter' });

    expect(mockCallback).toHaveBeenCalled();
  });

  test('it should invoke onClearOptions callback when user selects an option', () => {
    const testValue = 'Bas';
    const mockCallback = jest.fn();

    const { component } = tester.getMountedInstance(
      ReactAutocomplete,
      { options: autocompleteOptions, onClearOptions: mockCallback },
    );

    const input = component.find('input').at(0);
    input.simulate('change', { target: { value: testValue } });
    input.simulate('keydown', { key: 'ArrowDown' });
    input.simulate('keydown', { key: 'Esc' });

    expect(mockCallback).toHaveBeenCalled();
  });
});
