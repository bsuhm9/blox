describe('Player Class Test', () => {
    it('Should return correct player turn value', () =>{
        const player1 = new Player('Fred');
        player1.beginTurn();
        expect(player1.getTurn()).toEqual(true);
    });
});