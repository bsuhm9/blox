describe('Player Class Turn Test', () => {
    it('Should return correct player turn value', () =>{
        const player1 = new Player('Fred');
        player1.beginTurn();
        expect(player1.getTurn()).toEqual(true);
    });
});

describe('Player Class Score Test', () => {
    it('Should return correct player score value', () =>{
        const player1 = new Player('Fred');
        player1.addToScore(5);
        player1.addToScore(9);
        player1.addToScore(-2)
        expect(player1.getScore()).toEqual(12);
    });
});