import { SetState } from 'zustand';

export type CaseReducer<State, Action = any> = (state: State, action: Action) => State;

type SliceCaseReducers<State> = Record<string, CaseReducer<State, any>>;
type PayloadTuple<T> = T extends undefined ? [] : [T];
type Action<Payload = undefined> = (...payload: PayloadTuple<Payload>) => void;

export type Actions<CaseReducers extends SliceCaseReducers<any>> = {
	[ActionType in keyof CaseReducers]: Action<Parameters<CaseReducers[ActionType]>[1]>;
};

export interface Slice<
	State extends Record<any, any> = Record<any, any>,
	CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>
> {
	/**
	 * The slice's initial state.
	 */
	initialState: State;
	/**
	 * The slice's reducer.
	 */
	reducers: CaseReducers;
}

function slice<
	InitialState extends Record<any, any>,
	CaseReducers extends SliceCaseReducers<InitialState>,
	State extends InitialState & Actions<CaseReducers>,
	CustomSetState extends SetState<State>
>(slice: Slice<InitialState, CaseReducers>) {
	return (set: CustomSetState): State => {
		const actions: Actions<CaseReducers> = {} as Actions<CaseReducers>;

		Object.entries(slice.reducers).forEach(([actionType, reducer]) => {
			actions[actionType as keyof Actions<CaseReducers>] = (...payload: any) => {
				set(state => reducer(state, payload[0]));
			};
		});

		return { ...slice.initialState, ...actions };
	};
}

export default slice;
