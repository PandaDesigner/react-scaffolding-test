import axios from 'axios';
import { CharacterDetail, Info } from '../domain/character.model';
import { CharacterRepository } from '../domain/character.repository';


export class CharacterApiAdapters implements CharacterRepository {
    private apiUrl = 'https://rickandmortyapi.com/api/character';

    async getAllCharacters(): Promise<CharacterDetail[]> {
        try {
            const { data } = await axios.get<{ Info: Info, results: CharacterDetail[] }>(this.apiUrl);
            const { results } = data
            return this.mapToCharacters(results);

        } catch (error) {
            console.error('Error fetching characters:', error);
            return [];
        }
    }

    private mapToCharacters(results: CharacterDetail[]): CharacterDetail[] {
        return results.map(item => ({
            created: item.created,
            episode: item.episode,
            gender: item.gender,
            id: item.id,
            image: item.image,
            location: item.location,
            name: item.name,
            origin: item.origin,
            species: item.species,
            status: item.status,
            type: item.type,
            url: item.url,
        }))
    }
}
