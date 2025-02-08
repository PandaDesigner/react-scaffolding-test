import { useEffect, useState } from 'react'
import { CharacterDetail } from '../domain/character.model';
import { CharacterApiAdapters } from '../infrastructure/character.api.adapter';
import { FetchCharactersUseCase } from '../application/character.usecase';

export const useCharacter = () => {

    const [characters, setCharacters] = useState<CharacterDetail[]>([]);
    const characterRepository = new CharacterApiAdapters();
    const fetchCharactersUseCase = new FetchCharactersUseCase(characterRepository);

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                const fetchedCharacters = await fetchCharactersUseCase.execute();
                setCharacters(fetchedCharacters)
            } catch (error) {
                console.error("Error fetching characters", error)
            }
        }
        loadCharacters()
    }, [])

    return {
        characters
    }
}
