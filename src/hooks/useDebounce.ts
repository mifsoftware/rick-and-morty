import { useEffect, useState } from 'react';

const useDebounce = (inputValue: any, delay: number) => {
	const [value, setValue] = useState<any>();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setValue(inputValue);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [inputValue]);

	return value;
};

export default useDebounce;
