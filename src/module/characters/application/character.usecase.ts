import { CharacterDetail } from '../domain/character.model';
import { CharacterRepository } from '../domain/character.repository';


export class FetchCharactersUseCase {
    private characterRepository: CharacterRepository;

    constructor(characterRepository: CharacterRepository) {
        this.characterRepository = characterRepository
    }

    async execute(): Promise<CharacterDetail[]> {
        return this.characterRepository.getAllCharacters();
    }
}