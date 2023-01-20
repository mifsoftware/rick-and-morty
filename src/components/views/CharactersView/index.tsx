import React, { useEffect, useState, useCallback, useMemo } from 'react';
import CharactersAPI from '../../../api/CharactersAPI';
import { WithPaginationResponse } from '@models/responses/WithPaginationResponse';
import { ICharacter } from '@models/responses/Character.model';
import { ErrorResponse } from '@models/responses/IErrorResponse';
import { AxiosResponse } from 'axios';
import SearchInput from '@ui/SearchInput';
import Preview from '@ui/Preview';
import { message, Pagination } from 'antd';
import styles from './style.module.scss';

const CharactersView: React.FC = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const [pageState, setPageState] = useState<number>(1);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [searchState, setSearchState] = useState<string>('');

	const [charactersState, setCharactersState] = useState<ICharacter[]>([]);
	const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);

	const showErrorMessage = (content: string) => {
		messageApi.open({ type: 'error', content });
	};

	const getCharacters = (name = '', page = 1) => {
		CharactersAPI.getCharacters({ name, page })
			.then((response: AxiosResponse<WithPaginationResponse<ICharacter> | ErrorResponse>) => {
				const data = response.data as WithPaginationResponse<ICharacter>;
				setCharactersState(data.results);
				setTotalCount(data.info.count);
			})
			.catch((error) => {
				showErrorMessage(String(error.response.data.error));
				setCharactersState([]);
			});
	};

	// Character image render condition
	const isSelectedVisible: boolean = useMemo<boolean>(
		() =>
			selectedCharacter !== null &&
			(selectedCharacter.name.toLowerCase().includes('rick') ||
				selectedCharacter?.name.toLowerCase().includes('morty')),
		[selectedCharacter]
	);

	// To check name of the selected character
	const checkNameSubstr = useCallback(
		(substr: string) => {
			if (!selectedCharacter) return '';
			return selectedCharacter.name.toLowerCase().includes(substr.toLowerCase());
		},
		[selectedCharacter]
	);

	const handleCharacterClick = (character: ICharacter) => {
		if (selectedCharacter && selectedCharacter.id === character.id) {
			setSelectedCharacter(null);
			return;
		}
		setSelectedCharacter(character);
	};

	const handleSearchChange = (substr: string) => {
		if (substr && substr.length < 2) return;
		setSearchState(substr);
		getCharacters(substr, pageState);
	};

	const handlePaginationChange = (page: number) => {
		setPageState(page);
		getCharacters(searchState, page);
	};

	useEffect(() => {
		getCharacters();
	}, []);

	return (
		<>
			{contextHolder}
			<h1>Characters</h1>
			<div className={styles['search-container']} data-testid='search-container'>
				<SearchInput dataTestId='search-input' onChange={handleSearchChange} />
			</div>
			<div className={styles['content']}>
				<div className={styles['characters-container']}>
					<div className={styles['characters-list']} data-testid='characters-container'>
						{charactersState?.map((character: ICharacter) => (
							<Preview
								key={character.id}
								dataTestId={`character-${character.id}`}
								character={character}
								isSelected={selectedCharacter !== null && selectedCharacter.id === character.id}
								onClick={() => handleCharacterClick(character)}
							/>
						))}
					</div>
					<Pagination
						defaultCurrent={1}
						pageSize={20}
						total={totalCount}
						current={pageState}
						size='default'
						showSizeChanger={false}
						onChange={handlePaginationChange}
					/>
				</div>
				{isSelectedVisible && (
					<div className={styles['selected-character']}>
						<div className={styles['rick']}>
							{checkNameSubstr('rick') ? (
								<img src={selectedCharacter?.image} alt='' data-testid='selected-image-Rick' />
							) : (
								<></>
							)}
						</div>
						<div className={styles['morty']}>
							{checkNameSubstr('morty') ? (
								<img src={selectedCharacter?.image} alt='' data-testid='selected-image-Morty' />
							) : (
								<></>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CharactersView;
