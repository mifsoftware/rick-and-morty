import { WithPaginationResponse } from './../models/responses/WithPaginationResponse';
import { ErrorResponse } from './../models/responses/IErrorResponse';
import { ICharacter } from './../models/responses/Character.model';
import { CharactersFilter } from '@models/requests/CharactersRequest.model';
import { AxiosResponse } from 'axios';
import axiosConfig from './axiosConfig';

class CharactersAPI {
	public static getCharacters(
		params: CharactersFilter
	): Promise<AxiosResponse<WithPaginationResponse<ICharacter> | ErrorResponse>> {
		return axiosConfig.get('/character', { params });
	}
}

export default CharactersAPI;
