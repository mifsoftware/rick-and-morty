import { cy, describe, it } from "local-cypress";

const generateResponse = ({ name, page, total }: { name: string, page: number, total: number }) => ({
	info: {
		count: total,
		pages: Math.ceil(total / 20),
		next: '',
		prev: ''
	},
	results: Array.from(Array(20).keys())
		.map((x) => +`${page}${x}`)
		.map((id) => ({
			id,
			name: `${id % 2 ? 'Rick' : 'Morty'} ${id}`,
			status: 'Alive',
			species: 'Human',
			type: '',
			gender: 'Male',
			origin: '',
			location: '',
			image: `https://rickandmortyapi.com/api/character/avatar/${id % 2 ? 1 : 2}.jpeg`,
			episode: [''],
			url: '',
			created: '2017-11-04T18:50:21.651Z',
		}))
		.filter((character) => {
			return !name || character.name.toLowerCase().includes(name.toLowerCase());
		})
});

const regRequest = (alias: string, name: string = "", page: number = 1) => {
	cy.intercept("GET", `/api/character?name=${name}&page=${page}`, generateResponse({ name, page, total: 82 }))
		.as(alias);
}

describe("Characters", () => {
	it("check selection & search", () => {
	// Initial Getting
	regRequest("getCharacters");
	regRequest("filterCharacters", "Ri");
	regRequest("nextPageCharacters", "Ri", 2);
	cy.visit("characters");
	cy.wait("@getCharacters");
	[10, 11].forEach((id) => {
		cy.getByTestId(`character-${id}`).should("have.attr", 'src')
			.and('equal',
			`https://rickandmortyapi.com/api/character/avatar/${id % 2 ? 1 : 2}.jpeg`
			);
	});

	// Selection
	cy.getByTestId(`character-10`).click();
	cy.getByTestId("selected-image-Morty")
		.should("be.visible")
		.should("have.attr", "src")
		.and("equal", 'https://rickandmortyapi.com/api/character/avatar/2.jpeg');

	cy.getByTestId(`character-11`).click();
	cy.getByTestId("selected-image-Rick")
		.should("be.visible")
		.should("have.attr", "src")
		.and("equal", 'https://rickandmortyapi.com/api/character/avatar/1.jpeg');

	// Search by name
	cy.getByTestId("search-container").should("be.visible")
		.within(() => {
		cy.getByTestId("search-input").should("be.visible");
		cy.getByTestId("search-input").type('Ri');
		cy.validateInputValue("search-input", "Ri");
		})
	cy.wait("@filterCharacters");
	cy.getByTestId('characters-container').within(() => {
		cy.getByTestId(`character-${10}`).should("not.exist")
	})

	// Pagination
	cy.clickNextPage();
	cy.wait("@nextPageCharacters");
	cy.clickPreviousPage();
	cy.wait("@getCharacters");
	});
});
