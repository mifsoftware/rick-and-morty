import { ICharacter } from '@models/responses/Character.model';
import { Tooltip } from 'antd';
import React from 'react';

interface PreviewProps {
	dataTestId?: string;
	character: ICharacter;
	isSelected: boolean;
	onClick: () => void;
}

const Preview: React.FC<PreviewProps> = (props: PreviewProps) => {
	const { dataTestId, character, isSelected, onClick } = props;
	return (
		<>
			<Tooltip
				key={character.id}
				placement='bottom'
				title={`${character.name}, ${character.species}, ${character.status}`}
			>
				<img
					src={character.image}
					alt={character.name}
					data-testid={dataTestId}
					style={{
						borderColor: isSelected ? '#de5656' : '#7dacf3',
					}}
					onClick={onClick}
				/>
			</Tooltip>
		</>
	);
};

export default Preview;
