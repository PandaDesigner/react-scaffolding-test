import { CharacterDetail } from './character.model';

export interface CharacterRepository {
    getAllCharacters(): Promise<CharacterDetail[]>;
}