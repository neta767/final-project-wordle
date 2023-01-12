export type CharStatus = 'absent' | 'present' | 'correct'
const endpoint = 'http://localhost:3003';

export type gameReq = {
    guesses: string[],
    hashSolution: string;
}

export type gameRes = {
    charStatuses: { [key: string]: CharStatus },
    guessesStatuses: CharStatus[][],
    isGameWon: boolean;
    solution: string;
}

export async function updateGameStatus(gameReq: gameReq): Promise<gameRes> {
    const body = JSON.stringify(gameReq);
    const method = 'POST';
    const headers = {
        'content-type': 'application/json',
    }
    const res = await fetch(`${endpoint}/game`, {method, headers, body})
    return (await res.json())
}

export async function getHashSolution(): Promise<string> {
    const res = await fetch(`${endpoint}/game`);
    return (await res.text());
}
