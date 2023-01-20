import React, { useEffect } from 'react';
import styles from './style.module.scss';
import useFormState from '@hooks/useFormState';
import useDebounce from '@hooks/useDebounce';

interface SearchInputPropsType {
	dataTestId?: string;
	onChange: (e: any) => void;
}

const SearchInput = (props: SearchInputPropsType) => {
	const { dataTestId, onChange } = props;

	const searchState = useFormState('');

	const debouncedValue = useDebounce(searchState.value, 500);

	useEffect(() => {
		onChange(debouncedValue);
	}, [debouncedValue]);

	return (
		<>
			<label className={styles.searchLine} data-testid={dataTestId}>
				<input type='search' className={styles['search-input']} {...searchState} />
			</label>
		</>
	);
};

export default SearchInput;
