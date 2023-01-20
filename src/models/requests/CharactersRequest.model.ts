import GenderEnum from "@models/enums/GenderEnum";
import StatusEnum from "@models/enums/StatusEnum";
import { IPaginationParams } from "@models/IPagination";

export interface CharactersFilter extends IPaginationParams {
    name?: string;
    status?: StatusEnum | unknown;
    gender?: GenderEnum | unknown;
}
