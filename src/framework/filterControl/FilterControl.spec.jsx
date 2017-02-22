
import { TestCaseFactory } from 'react-test-kit';
import FilterControl from './FilterControl.jsx';
import {
  ConditionChecker,
} from '../services';

describe('FilterControl', () => {
  describe('Props', () => {
    describe('conditionCheckers', () => {
      it('are passed to ConditionCheckerList and iterated over', () => {
        const props = {
          conditionCheckers: [
            new ConditionChecker({}),
          ],
          filterOptions: [],
          onAddConditionChecker: () => undefined,
          onRemoveConditionChecker: () => undefined,
        };

        const iterationSpy = spyOn(props.conditionCheckers, 'map');

        expect(iterationSpy).not.toHaveBeenCalled();
        TestCaseFactory.create(FilterControl, props);
        expect(iterationSpy).toHaveBeenCalled();
      });
    });

    describe('onRemoveConditionChecker', () => {
      it(
        'is passed to ConditionCheckerList and called with a ' +
        'conditionChecker when a remove button is clicked',
        () => {
          const props = {
            conditionCheckers: [
              new ConditionChecker({}),
            ],
            filterOptions: [],
            onAddConditionChecker: () => undefined,
            onRemoveConditionChecker: jasmine.createSpy(
              'onRemoveConditionChecker'
            ),
          };

          const testCase = TestCaseFactory.create(FilterControl, props);

          const removeButton =
            testCase.first(
              '.conditionCheckerListItem__removeButtonContainer .icon');

          expect(props.onRemoveConditionChecker).not.toHaveBeenCalled();
          testCase.trigger('click', removeButton);
          expect(props.onRemoveConditionChecker).toHaveBeenCalled();
        }
      );
    });
  });
});
