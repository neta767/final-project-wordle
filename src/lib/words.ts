export interface User {
    email: string;
    name: string;
}

export const isWinningWord = (word: string) => {
    return solution === word
}

const url = 'http://localhost:3003/solution';
export const solution = 'which'.toUpperCase()

export function isWinningWord1(word: string) {
    // POST request
    const body = word;
    const method = 'POST';
    const headers = {
        'content-type': 'application/text',
    }
    return fetch(url, {method, headers, body}).then(res => res.text());
}

// function tr() {
//     isWinningWord1('hi').then(u => console.log(u));
// }