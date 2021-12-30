# zustand-slice

A [zustand](https://github.com/pmndrs/zustand) middleware that provides an API like [createSlice](https://redux-toolkit.js.org/api/createslice) from Redux toolkit.

## Install

```sh
npm install zustand-slice
```

or

```sh
yarn add zustand-slice
```

## Usage

Create a store using slice middleware.

```js
import create from 'zustand';
import slice from 'zustand-slice';

const useStore = create(
	slice({
		initialState: {
			bears: 0
		},
		reducers: {
			increasePopulation(state) {
				return {
					bears: state.bears + 1
				};
			},
			removeAllBears() {
				return {
					bears: 0
				};
			}
		}
	})
);
```

And use it as usual.

```jsx
function BearCounter() {
	const bears = useStore(state => state.bears);
	return <h1>{bears} around here ...</h1>;
}

function Controls() {
	const increasePopulation = useStore(state => state.increasePopulation);
	return <button onClick={increasePopulation}>one up</button>;
}
```

## Usage with typescript

By default, types will be inferred from initialState object and reducers payload, so there is no need to type the whole store explicitly.

## License

[MIT](https://github.com/sasa-djuric/zustand-slice/blob/master/LICENSE)
