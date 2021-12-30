import slice from './slice';

const createSlice = () =>
	slice({
		initialState: {
			count: 0
		},
		reducers: {
			increment(state) {
				return {
					...state,
					count: state.count + 1
				};
			}
		}
	});

describe('slice', () => {
	it('should generate state and actions', () => {
		const set = jest.fn();
		const sliceInstance = createSlice()(set);

		expect(sliceInstance.increment).toBeDefined();
		expect(sliceInstance.count).toBeDefined();
	});

	it('should set state', () => {
		const set = jest.fn().mockImplementation(reducer => reducer({ count: 0 }));
		const sliceInstance = createSlice()(set);

		sliceInstance.increment();

		expect(set).toBeCalled();
	});
});
