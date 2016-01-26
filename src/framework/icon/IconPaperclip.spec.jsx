
import { TestCaseFactory } from 'react-test-kit';
import IconPaperclip from './IconPaperclip.jsx';

describe('IconPaperclip', () => {
  it('is an Icon', () => {
    const testCase =
      TestCaseFactory.createFromFunction(IconPaperclip);
    expect(testCase.dom.className).toContain('icon');
  });

  describe('Props', () => {
    describe('classes', () => {
      it('is applied to the element', () => {
        const props = {
          classes: 'test',
        };
        const testCase =
          TestCaseFactory.createFromFunction(IconPaperclip, props);
        expect(testCase.dom.className).toContain(props.classes);
      });
    });

    describe('onClick', () => {
      let testCase;
      let onClick;

      beforeEach(() => {
        onClick = jasmine.createSpy('onClick');

        testCase =
          TestCaseFactory.createFromFunction(IconPaperclip, {onClick});

        testCase.trigger('click');
      });

      it('is called once', () => {
        expect(onClick.calls.count()).toEqual(1);
      });

      it('is called with event object as an argument', () => {
        expect(onClick).toHaveBeenCalledWith(
          jasmine.any(Object), // SyntheticEvent
          jasmine.any(String) // React ID
        );
      });

      it('adds a clickable modifier class', () => {
        expect(testCase.dom.className).toContain('icon--clickable');
      });
    });
  });
});